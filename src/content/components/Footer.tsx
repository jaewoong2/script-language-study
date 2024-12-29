import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import {
  useTranscriptActionContext,
  useTranscriptContext,
} from './context/TranscriptProvider';
import BookOpen from './icons/BookOpen';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ColorWheelIcon } from '@radix-ui/react-icons';
import BookClose from './icons/BookClose';

const Footer = ({ children }: PropsWithChildren) => {
  const { show } = useTranscriptContext();
  const { setShow } = useTranscriptActionContext();

  return (
    <footer
      className={cn(
        'tw-sticky tw-bottom-0 tw-z-[22] tw-w-full tw-rounded-b-3xl tw-bg-white tw-bg-opacity-50 tw-py-4 tw-backdrop-blur-sm',
        'tw-flex tw-items-center tw-justify-between tw-gap-4 tw-px-20',
        'tw-border-t',
      )}
    >
      <div className="tw-flex tw-h-full tw-w-fit tw-items-center tw-gap-2">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Toggle
                pressed={show}
                onPressedChange={setShow}
                size={'lg'}
                className="tw-aspect-square !tw-h-12 !tw-w-14 !tw-border tw-border-solid !tw-p-0"
              >
                {show ? (
                  <BookOpen className="tw-h-8 tw-w-8 tw-text-4xl tw-text-primary" />
                ) : (
                  <BookClose className="tw-h-8 tw-w-8 tw-text-4xl tw-text-primary" />
                )}
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              {show ? <p>가리기</p> : <p>보기</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <a
        className="tw-w-fit tw-text-primary"
        href="https://naver.me/5wWu4h6f"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        {children}
      </a>
    </footer>
  );
};

export default Footer;
