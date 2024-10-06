import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import {
  useTranscriptActionContext,
  useTranscriptContext,
} from './context/TranscriptProvider';
import {
  useGetTranslateRecommend,
  useTranslateRecommend,
} from '@/api/translate/useTranslateService';
import TextSpinnerLoader from './TextSpinnerLoader';
import TranscriptItem from './TranscriptItem';
import { parseSingleData } from '@/utils';

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
  const extractedScript = extractScript(page);

  const { data, isError, isLoading } =
    useGetTranslateRecommend(
      {
        key: `${metadata?.key}`,
        page,
        language: current.language,
      },
      {
        gcTime: Infinity,
        staleTime: Infinity,
        retry: 1,
      },
    );

  const contents = parseSingleData(
    data?.data.data.contents ?? '',
  );

  useEffect(() => {
    if (metadata && isError) {
      if (!extractedScript) return;

      mutate({
        status: 'QUEUE',
        language: current.language,
        category: 'video',
        page,
        script: extractedScript,
        key: `${metadata.key}`,
      });
    }
  }, [current, page, metadata, isError, extractedScript]);

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

  return (
    <ul>
      {contents[type].map(({ meaning, text }, index) => (
        <motion.li
          key={`${text}-${index}-content`}
          onViewportEnter={() => {
            if (
              current.page === page + 1 &&
              index === contents[type].length - 1
            ) {
              handleNextPage();
            }
          }}
        >
          <TranscriptItem text={text} meaning={meaning} />
        </motion.li>
      ))}
    </ul>
  );
};

export default TranscriptContent;
