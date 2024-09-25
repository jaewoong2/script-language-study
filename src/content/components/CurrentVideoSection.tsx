import React from "react";
import { TranscriptContextType } from "./context/TranscriptProvider";
import Header from "./Header";

type Props = {
  metadata: TranscriptContextType["metadata"];
};

const CurrentVideoSection = ({ metadata }: Props) => {
  return (
    <section className="tw-flex tw-w-full tw-rounded-xl tw-px-6 tw-p-4 tw-shadow-md tw-border tw-gap-3 tw-flex-col tw-bg-white">
      <h3 className="tw-text-2xl tw-font-bold">현재 비디오</h3>
      <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
        <div className="tw-w-auto tw-h-[100px] tw-bg-red-50 tw-border tw-aspect-video tw-justify-center tw-items-center tw-flex">
          <img
            src={metadata?.thumbnail}
            alt="썸네일"
            className="tw-object-cover tw-w-full tw-h-full"
          />
        </div>
        <div>
          <h2 className="tw-text-xl">{metadata?.title}</h2>
        </div>
      </div>
    </section>
  );
};

export default CurrentVideoSection;
