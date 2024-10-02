import { TranscriptContextType } from './context/TranscriptProvider';

type Props = {
  metadata: TranscriptContextType['metadata'];
};

const CurrentVideoSection = ({ metadata }: Props) => {
  return (
    <section className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-overflow-hidden tw-rounded-xl">
      <h3 className="tw-sr-only tw-text-2xl tw-font-bold">
        현재 비디오
      </h3>
      <div className="tw-mx-auto tw-flex tw-aspect-video tw-w-full tw-bg-transparent">
        <img
          src={metadata?.thumbnail}
          alt="썸네일"
          className="tw-h-full tw-w-full tw-object-cover"
        />
      </div>
    </section>
  );
};

export default CurrentVideoSection;
