import React, { useEffect, useState } from 'react';
import {
  useTranscriptActionContext,
  useTranscriptContext,
} from './context/TranscriptProvider';
import {
  useGetTransalteRecommend,
  useTranslateRecommend,
} from '@/api/translate/useTranslateService';
import useTranscriptData from '../hooks/useTranscriptData';
import { motion } from 'framer-motion';
import TextSpinnerLoader from './TextSpinnerLoader';

type Props = {
  type: 'words' | 'sentences';
  page: number;
};

const TranscriptContent: React.FC<Props> = ({
  type,
  page,
}) => {
  const { current, metadata } = useTranscriptContext();
  const { mutate, isPending } = useTranslateRecommend();
  const { handleNextPage, extractScript } =
    useTranscriptActionContext();
  const [isMount, setIsMount] = useState(false);
  const extractedScript = extractScript(page);

  const { data, isError, isLoading } =
    useGetTransalteRecommend(
      {
        key: `${metadata?.key}`,
        page,
        language: current.language,
      },
      {
        enabled:
          !isPending &&
          isMount &&
          extractedScript.trim() !== '',
        gcTime: Infinity,
        staleTime: Infinity,
        retry: 1,
      },
    );

  const contents = useTranscriptData({
    dataString: data?.data.data.contents ?? '',
  });

  useEffect(() => {
    if (metadata && isError) {
      if (!extractedScript) return;

      mutate({
        language: current.language,
        category: 'video',
        page,
        script: extractedScript,
        key: `${metadata.key}`,
      });
    }
  }, [current, page, metadata, isError, extractedScript]);

  useEffect(() => {
    if (isLoading) {
      setIsMount(false);
      return;
    }

    if (!isLoading) {
      setIsMount(true);
      return;
    }
  }, [isLoading]);

  if (isLoading || isPending) {
    return (
      <div className="tw-flex tw-h-full tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-py-2">
        <TextSpinnerLoader />
      </div>
    );
  }

  if (!contents[type] || contents[type].length === 0) {
    return (
      <p className="tw-flex tw-w-full tw-justify-center tw-px-2 tw-text-gray-500">
        마지막 페이지 입니다.
      </p>
    );
  }

  return contents[type].map(({ meaning, text }, index) => (
    <motion.div
      key={`${text}-${index}-content`}
      onViewportEnter={() => {
        if (
          !isLoading &&
          current.page === page + 1 &&
          index === contents[type].length - 1
        ) {
          handleNextPage();
        }
      }}
    >
      <TranscriptItem text={text} meaning={meaning} />
    </motion.div>
  ));
};

type TranscriptItemProps = {
  text: string;
  meaning: string;
};

const TranscriptItem: React.FC<TranscriptItemProps> = ({
  text,
  meaning,
}) => (
  <>
    <li className="tw-relative tw-flex tw-flex-col tw-items-start tw-text-wrap tw-px-2 tw-text-start">
      <div className="dark:tw-text-secondary-light tw-font-Roboto tw-text-base tw-text-blue-700">
        -{text}
      </div>
      <p className="tw-text-start tw-text-sm">{meaning}</p>
    </li>
    <div className="tw-my-1 tw-h-px tw-w-full tw-bg-zinc-200" />
  </>
);

export default TranscriptContent;
