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
    <div className="tw-relative tw-flex tw-flex-col tw-items-start tw-text-wrap tw-px-2 tw-text-start">
      <div className="dark:tw-text-secondary-light tw-font-Roboto tw-text-base tw-text-blue-700">
        -{text}
      </div>
      <p className="tw-text-start tw-text-sm">{meaning}</p>
    </div>
    <div className="tw-my-1 tw-h-px tw-w-full tw-bg-zinc-200" />
  </>
);

export default React.memo(TranscriptItem);
