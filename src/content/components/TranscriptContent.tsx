import React, { useEffect, useCallback, useState } from "react";
import {
  useTranscriptActionContext,
  useTranscriptContext,
} from "./context/TranscriptProvider";
import {
  useGetTransalteRecommend,
  useTranslateRecommend,
} from "@/api/translate/useTranslateService";
import useTranscriptData from "../hooks/useTranscriptData";
import { motion } from "framer-motion";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import SpinnerIcon from "./icons/SpinnerIcon";

type Props = {
  type: "words" | "sentences";
  page: number;
};

const TranscriptContent: React.FC<Props> = ({ type, page }) => {
  const { current, metadata } = useTranscriptContext();
  const { mutate, isPending } = useTranslateRecommend();
  const { handleNextPage, extractScript } = useTranscriptActionContext();
  const [isMount, setIsMount] = useState(false);
  const extractedScript = extractScript(page);

  const { data, isError, isLoading } = useGetTransalteRecommend(
    {
      key: `${metadata?.key}`,
      page,
      language: current.language,
    },
    {
      enabled: !isPending && isMount && extractedScript.trim() !== "",
      gcTime: Infinity,
      staleTime: Infinity,
      retry: 1,
    }
  );

  const contents = useTranscriptData({
    dataString: data?.data.data.contents ?? "",
  });

  useEffect(() => {
    if (metadata && isError) {
      if (!extractedScript) return;

      mutate({
        language: current.language,
        category: "video",
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
      <div className="tw-py-2 tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-gap-2 tw-flex-col">
        <SpinnerIcon />
        <span className="tw-text-sm">로딩중...</span>
      </div>
    );
  }

  if (!contents[type] || contents[type].length === 0) {
    return <p className="tw-text-gray-500 tw-px-2">No content available.</p>;
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

const TranscriptItem: React.FC<TranscriptItemProps> = ({ text, meaning }) => (
  <>
    <li className="tw-flex tw-items-start tw-flex-col tw-relative tw-px-2">
      <div className="tw-text-base tw-text-blue-500 dark:tw-text-secondary-light">
        -{text}
      </div>
      <p className="tw-text-sm tw-flex tw-items-center tw-text-center">
        {meaning}
      </p>
    </li>
    <div className="tw-w-full tw-bg-zinc-200 tw-h-px tw-my-1" />
  </>
);

export default TranscriptContent;
