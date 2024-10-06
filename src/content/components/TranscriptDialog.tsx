import { PropsWithChildren } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranscriptContext } from './context/TranscriptProvider';
import LogoIcon from './icons/LogoIcon';
import { useLocalStorage } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import DialogButton from './DialogButton';

const TranscriptDialog = ({
  children,
}: PropsWithChildren) => {
  const { metadata } = useTranscriptContext();
  const [isOpen, setIsOpen] = useLocalStorage(
    'isOpen',
    false,
  );

  if (!metadata?.key) {
    return null;
  }

  return (
    <section className="tw-flex tw-flex-col tw-items-end tw-gap-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="tw-flex tw-h-fit tw-flex-col tw-items-center tw-justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="tw-flex tw-flex-col tw-items-center tw-justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <DialogButton
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'tw-overflow-hidden !tw-p-1',
          'tw-flex tw-aspect-square tw-h-[54px] tw-w-[54px] tw-items-center tw-justify-center !tw-rounded-[24px] tw-text-2xl tw-shadow-md',
        )}
      >
        {isOpen ? (
          <motion.p
            className="tw-font-Freesentation tw-text-4xl tw-font-light tw-text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            &times;
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LogoIcon />
          </motion.div>
        )}
      </DialogButton>
    </section>
  );
};

export default TranscriptDialog;
