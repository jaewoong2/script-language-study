import { YouTubeVideo } from '@/content/controller/videoContorller';
import useTitleChange from '@/content/hooks/useTitleChange';
import { getLanguageFullName } from '@/utils';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type TranscriptContextType = {
  transcript:
    | { languageCode: string; script: string[] }[]
    | null;
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
        { languageCode: 'ja', script: [''] },
        { languageCode: 'ko', script: [''] },
      ]
    : [],
  metadata: {
    key: import.meta.env.DEV ? '4a0dll2RzpE' : '',
    page: 1,
    author: import.meta.env.DEV ? 'InitData' : '',
    duration: 0,
    title: import.meta.env.DEV ? 'InitData' : '',
    views: '0',
    thumbnail: import.meta.env.DEV
      ? 'https://i.ytimg.com/vi/sG5rmHBiruI/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYVyBiKGUwDw==&rs=AOn4CLCTLLn4nByOU5MYsPi8lVLn68BRDg'
      : '',
  },
  current: import.meta.env.DEV
    ? {
        language: getLanguageFullName('ja'),
        page: 1,
      }
    : { language: '', page: 1 },
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

const TranscriptContext =
  createContext<TranscriptContextType | null>(initaldata);

const TranscriptActionContext =
  createContext<TranscriptActionContextType | null>(null);

export const useTranscriptContext = () => {
  const context = useContext(TranscriptContext);

  if (!context) {
    throw new Error('Needs Transcript-Context Provider');
  }

  return context;
};

export const useTranscriptActionContext = () => {
  const context = useContext(TranscriptActionContext);

  if (!context) {
    throw new Error('Needs Transcript-Context Provider');
  }

  return context;
};

function TranscriptContextProvider({
  children,
}: PropsWithChildren) {
  const [search, setSearch] = useState(
    window.location.search,
  );
  const [transcript, setTranscript] = useState<
    TranscriptContextType['transcript']
  >(initaldata.transcript);
  const [metadata, setMetadata] = useState<
    TranscriptContextType['metadata']
  >(initaldata.metadata);
  const [current, setCurrent] = useState<
    TranscriptContextType['current']
  >(initaldata.current);

  const handleCurrentLangauge = (language: string) => {
    setCurrent((prev) =>
      language === prev.language
        ? prev
        : { page: 1, language },
    );
  };

  const handleNextPage = () => {
    setCurrent((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const extractScript = useCallback(
    (page: number): string => {
      if (!transcript || !current.language) return '';

      const scriptSegments = transcript
        .filter(
          ({ languageCode }) =>
            getLanguageFullName(languageCode) ===
            current.language,
        )
        .flatMap(({ script }) =>
          script.slice(page * 50, (page + 1) * 50),
        );

      return scriptSegments.length > 0
        ? scriptSegments.join(' ')
        : '';
    },
    [transcript, current],
  );

  const value = useMemo(
    (): TranscriptContextType => ({
      transcript,
      metadata,
      current,
    }),
    [transcript, metadata, current],
  );

  const action = useMemo(
    (): TranscriptActionContextType => ({
      extractScript,
      setCurrent,
      handleCurrentLangauge,
      handleNextPage,
    }),
    [setCurrent, handleCurrentLangauge, handleNextPage],
  );

  useTitleChange(() => {
    setSearch(window.location.search);
  });

  useEffect(() => {
    (async function () {
      const videoId = new URLSearchParams(search).get('v');

      if (videoId) {
        const video = new YouTubeVideo();
        try {
          const result =
            await video.retrieveTranscript(videoId);
          if (result) {
            setCurrent({
              language: getLanguageFullName(
                result.transcript[0].languageCode,
              ),
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
        console.error('No video ID found in URL.');
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
