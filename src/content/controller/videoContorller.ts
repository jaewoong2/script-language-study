export interface PlayerResponse {
  videoDetails: {
    title: string;
    lengthSeconds: number;
    author: string;
    viewCount: string;
    thumbnail: {
      thumbnails: {
        url: string;
        height: number;
        width: number;
      }[];
    };
  };
  captions?: {
    playerCaptionsTracklistRenderer?: {
      captionTracks: CaptionTrack[];
    };
  };
}

interface CaptionTrack {
  baseUrl: string;
  languageCode: string;
  kind: string;
}

interface TranscriptEvent {
  segs: { utf8: string }[];
}

interface Transcript {
  events: TranscriptEvent[];
}

const YT_INITIAL_PLAYER_RESPONSE_RE =
  /ytInitialPlayerResponse\s*=\s*({.+?})\s*;\s*(?:var\s+(?:meta|head)|<\/script|\n)/;

class YouTubeTranscript {
  captionTracks: CaptionTrack[];

  constructor(captionTracks: CaptionTrack[]) {
    this.captionTracks = captionTracks;
    this.captionTracks.sort(YouTubeTranscript.compareTracks);
  }

  static compareTracks(track1: CaptionTrack, track2: CaptionTrack): number {
    if (track1.languageCode === "en" && track2.languageCode !== "en") {
      return -1;
    } else if (track1.languageCode !== "en" && track2.languageCode === "en") {
      return 1;
    } else if (track1.kind !== "asr" && track2.kind === "asr") {
      return -1;
    } else if (track1.kind === "asr" && track2.kind !== "asr") {
      return 1;
    }
    return 0;
  }

  async fetchTranscript(): Promise<
    { languageCode: string; script: string[] }[]
  > {
    if (this.captionTracks.length === 0) {
      throw new Error("No caption tracks found");
    }

    return await Promise.all(
      this.captionTracks.map(async (track) => {
        const trackUrl = `${track.baseUrl}&fmt=json3`;
        const response = await fetch(trackUrl);
        const transcript: Transcript = await response.json();

        const parsedTranscript = transcript.events
          .filter((event) => event.segs)
          .map((event) => event.segs.map((seg) => seg.utf8).join(" "))
          .filter((v) => v !== "\n");
        // .join(" ")
        // .replace(/[\u200B-\u200D\uFEFF]/g, "")
        // .replace(/\s+/g, " ");

        return { languageCode: track.languageCode, script: parsedTranscript };
      })
    );
  }
}

export class YouTubeVideo {
  constructor() {}

  retrievePlayerResponse(): void {
    // if (!this.player) {
    //   throw new Error("Player response not found or mismatched video ID.");
    // }
  }

  retrieveMetadata(): void {
    this.retrievePlayerResponse();
  }

  async retrieveTranscript(videoId: string) {
    this.retrievePlayerResponse();

    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await response.text();

    const playerResponse = html.match(YT_INITIAL_PLAYER_RESPONSE_RE);

    if (!playerResponse) {
      console.warn("Unable to parse playerResponse");
      return;
    }

    const player: PlayerResponse = JSON.parse(playerResponse[1]);

    const metadata = {
      thumbnail: player.videoDetails.thumbnail.thumbnails[1].url,
      title: player.videoDetails.title,
      duration: player.videoDetails.lengthSeconds,
      author: player.videoDetails.author,
      views: player.videoDetails.viewCount,
    };

    const tracks =
      player.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (!tracks) {
      console.warn("Unable to parse tracks");
      return;
    }

    const transcript = new YouTubeTranscript(tracks);

    const result = {
      transcript: await transcript.fetchTranscript(),
      metadata: metadata,
    };

    return result;
  }
}
