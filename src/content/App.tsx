import TranscriptDisplay from './components/TranscriptDisplay';
import { useTranscriptContext } from './components/context/TranscriptProvider';
import TranscriptDialog from './components/TranscriptDialog';

import CurrentVideoSection from './components/CurrentVideoSection';
import '../reset.css';
import '../style.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const { metadata } = useTranscriptContext();

  return (
    <div className="tw-fixed tw-bottom-7 tw-right-7 tw-z-[19999999999999] tw-flex tw-h-[750px] tw-flex-col tw-items-end tw-justify-end">
      <TranscriptDialog>
        <div className="z-[1005] tw-h-[80%] tw-max-h-[750px] tw-w-[450px] tw-max-w-[500px] tw-overflow-y-auto tw-rounded-[36px] tw-border tw-border-solid tw-border-neutral-300 tw-shadow-2xl">
          <div className="tw-relative tw-z-[1001] tw-flex tw-flex-col tw-justify-center tw-gap-4 tw-bg-background tw-font-Freesentation">
            <div className="tw-z-[21] tw-flex tw-flex-col tw-justify-center tw-gap-4 tw-px-2 tw-pt-10">
              <Header />
              <CurrentVideoSection metadata={metadata} />
              <TranscriptDisplay />
            </div>
            <Footer>문의 및 건의</Footer>
          </div>
        </div>
      </TranscriptDialog>
    </div>
  );
};

export default App;
