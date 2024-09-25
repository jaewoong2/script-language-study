"use client";

import { YouTubeVideo } from "@/content/controller/videoContorller";
import useTitleChange from "@/content/hooks/useTitleChange";
import { getLanguageFullName, INITIAL_DATA } from "@/utils";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

export type TranscriptContextType = {
  transcript: { languageCode: string; script: string[] }[] | null;
  metadata: {
    key: string;
    thumbnail: string;
    title: string;
    duration: number;
    author: string;
    views: string;
    page: number;
  } | null;
  current: {
    language: string;
    page: number;
  };
};

const initaldata: TranscriptContextType = {
  transcript: import.meta.env.DEV
    ? [
        { languageCode: "ja", script: INITIAL_DATA },
        { languageCode: "ko", script: INITIAL_DATA },
      ]
    : [],
  metadata: {
    key: import.meta.env.DEV ? "4a0dll2RzpE" : "",
    page: 1,
    author: import.meta.env.DEV ? "InitData" : "",
    duration: 0,
    title: import.meta.env.DEV ? "InitData" : "",
    views: "0",
    thumbnail: import.meta.env.DEV
      ? "https://i.ytimg.com/vi/4a0dll2RzpE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC29C3Z4weN91X78_0QpmkHP9G7Iw"
      : "",
  },
  current: import.meta.env.DEV
    ? {
        language: getLanguageFullName("ja"),
        page: 1,
      }
    : { language: "", page: 1 },
};

type TranscriptActionContextType = {
  setCurrent: React.Dispatch<
    React.SetStateAction<{
      language: string;
      page: number;
    }>
  >;
  handleCurrentLangauge: (language: string) => void;
  handleNextPage: () => void;
  extractScript: (page: number) => string;
};

const TranscriptContext = createContext<TranscriptContextType | null>(
  initaldata
);

const TranscriptActionContext =
  createContext<TranscriptActionContextType | null>(null);

export const useTranscriptContext = () => {
  const context = useContext(TranscriptContext);

  if (!context) {
    throw new Error("Needs Transcript-Context Provider");
  }

  return context;
};

export const useTranscriptActionContext = () => {
  const context = useContext(TranscriptActionContext);

  if (!context) {
    throw new Error("Needs Transcript-Context Provider");
  }

  return context;
};

function TranscriptContextProvider({ children }: PropsWithChildren) {
  const [search, setSearch] = useState(window.location.search);
  const [transcript, setTranscript] = useState<
    TranscriptContextType["transcript"]
  >(initaldata.transcript);
  const [metadata, setMetadata] = useState<TranscriptContextType["metadata"]>(
    initaldata.metadata
  );
  const [current, setCurrent] = useState<TranscriptContextType["current"]>(
    initaldata.current
  );

  const handleCurrentLangauge = (language: string) => {
    setCurrent((prev) =>
      language === prev.language ? prev : { page: 1, language }
    );
  };

  const handleNextPage = () => {
    setCurrent((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const extractScript = useCallback(
    (page: number): string => {
      if (!transcript || !current.language) return "";

      const scriptSegments = transcript
        .filter(
          ({ languageCode }) =>
            getLanguageFullName(languageCode) === current.language
        )
        .flatMap(({ script }) => script.slice(page * 100, (page + 1) * 100));

      return scriptSegments.length > 0 ? scriptSegments.join(" ") : "";
    },
    [transcript, current]
  );

  const value = useMemo(
    (): TranscriptContextType => ({
      transcript,
      metadata,
      current,
    }),
    [transcript, metadata, current]
  );

  const action = useMemo(
    (): TranscriptActionContextType => ({
      extractScript,
      setCurrent,
      handleCurrentLangauge,
      handleNextPage,
    }),
    [setCurrent, handleCurrentLangauge, handleNextPage]
  );

  useTitleChange(() => {
    setSearch(window.location.search);
  });

  useEffect(() => {
    (async function () {
      const videoId = new URLSearchParams(search).get("v");

      if (videoId) {
        const video = new YouTubeVideo();
        try {
          const result = await video.retrieveTranscript(videoId);
          if (result) {
            setCurrent({
              language: getLanguageFullName(result.transcript[0].languageCode),
              page: 1,
            });
            setTranscript(result.transcript);
            setMetadata({
              key: videoId,
              page: 0,
              ...result?.metadata,
            });
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("No video ID found in URL.");
        setTranscript(initaldata.transcript);
        setMetadata(initaldata?.metadata);
      }
    })();
  }, [search]);

  return (
    <TranscriptActionContext.Provider value={action}>
      <TranscriptContext.Provider value={value}>
        {children}
      </TranscriptContext.Provider>
    </TranscriptActionContext.Provider>
  );
}

export default TranscriptContextProvider;
