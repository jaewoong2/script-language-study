import TranscriptDisplay from "./components/TranscriptDisplay";
import { useTranscriptContext } from "./components/context/TranscriptProvider";
import TranscriptDialog from "./components/TranscriptDialog";

import CurrentVideoSection from "./components/CurrentVideoSection";
import "../reset.css";
import "../style.css";
import Header from "./components/Header";
import { cn } from "@/lib/utils";

const App = () => {
  const { metadata } = useTranscriptContext();

  return (
    <div className="tw-fixed tw-bottom-7 tw-right-7 tw-flex tw-items-end tw-justify-end tw-flex-col tw-h-[750px] tw-z-[19999999999999]">
      <TranscriptDialog>
        <div className="tw-border-zinc-300 tw-w-[450px] tw-max-w-[500px] tw-h-[80%] tw-max-h-[750px] tw-rounded-[36px] tw-shadow-2xl tw-overflow-y-auto tw-border z-[1005]">
          <div className="tw-relative tw-font-Freesentation tw-flex tw-flex-col tw-justify-center tw-gap-4 tw-bg-neutral-50 tw-z-[1001]">
            <div className="tw-px-2 tw-flex tw-flex-col tw-justify-center tw-gap-4 tw-pt-10 tw-z-[21]">
              <Header />
              <CurrentVideoSection metadata={metadata} />
              <TranscriptDisplay />
            </div>
            <footer
              className={cn(
                "tw-z-[22] tw-w-full tw-bg-white tw-bg-opacity-50 tw-backdrop-blur-sm tw-border tw-py-4 tw-bottom-0 tw-sticky tw-rounded-b-3xl",
                "tw-flex tw-justify-end tw-items-center tw-px-20 tw-gap-4"
              )}
            >
              <a
                className="tw-w-fit"
                href="https://naver.me/5wWu4h6f"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                문의 및 건의
              </a>
            </footer>
          </div>
        </div>
      </TranscriptDialog>
    </div>
  );
};

export default App;
