import { useTranslateRecommend } from '@/api/translate/useTranslateService';
import { PropsWithChildren, useEffect } from 'react';
import {
  useTranscriptActionContext,
  useTranscriptContext,
} from './context/TranscriptProvider';
import TextSpinnerLoader from './TextSpinnerLoader';

type Props = {
  status: 'error' | 'pending' | 'success';
  page: number;
  failureCount: number;
};

const ContentError = ({
  status,
  page,
  children,
  failureCount,
}: PropsWithChildren<Props>) => {
  const { current, metadata } = useTranscriptContext();
  const { isSuccess, mutate, isPending } =
    useTranslateRecommend();
  const { extractScript } = useTranscriptActionContext();
  const extractedScript = extractScript(page);

  useEffect(() => {
    if (isSuccess) return;
    if (failureCount > 1) return;
    if (!metadata) return;
    if (!extractedScript) return;

    mutate({
      status: 'QUEUE',
      language: current.language,
      category: 'video',
      page,
      script: extractedScript,
      key: `${metadata.key}`,
    });
  }, [current, page, metadata, extractedScript, status]);

  if (status === 'pending' || isPending) {
    return (
      <div className="tw-flex tw-h-full tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-py-2">
        <TextSpinnerLoader />
      </div>
    );
  }

  if (status === 'error') return null;

  return <div>{children}</div>;
};

export default ContentError;
