import React from "react";
import { TranscriptContextType } from "./context/TranscriptProvider";
import Header from "./Header";

type Props = {
  metadata: TranscriptContextType["metadata"];
};

const CurrentVideoSection = ({ metadata }: Props) => {
  return (
    <section className="tw-flex tw-w-full tw-rounded-xl tw-justify-center tw-items-center tw-gap-3 tw-flex-col tw-overflow-hidden">
      <h3 className="tw-text-2xl tw-font-bold tw-sr-only">현재 비디오</h3>
      <div className="tw-flex tw-mx-auto tw-w-full tw-bg-transparent tw-aspect-video">
        <img
          src={metadata?.thumbnail}
          alt="썸네일"
          className="tw-object-cover tw-w-full tw-h-full"
        />
      </div>
    </section>
  );
};

export default CurrentVideoSection;
