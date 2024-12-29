import React from 'react';

type TranscriptItemProps = {
  text: string;
  meaning: string;
};

const TranscriptItem: React.FC<TranscriptItemProps> = ({
  text,
  meaning,
}) => (
  <>
    <div className="tw-relative tw-flex tw-flex-col tw-items-start tw-gap-0 tw-text-wrap tw-px-2 tw-py-2 tw-text-start">
      <div className="dark:tw-text-secondary-light tw-font-Roboto tw-text-base tw-text-blue-700">
        -{text}
      </div>
      {meaning ? (
        <p className="tw-text-start tw-text-sm">
          {meaning}
        </p>
      ) : (
        <p className="tw-text-start tw-text-sm tw-text-transparent">
          돋보기를 눌러주세요
        </p>
      )}
    </div>
    <div className="tw-my-1 tw-h-px tw-w-full tw-bg-zinc-200" />
  </>
);

export default React.memo(TranscriptItem);
