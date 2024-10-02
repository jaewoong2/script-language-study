import { PropsWithChildren, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import {
  useTranscriptActionContext,
  useTranscriptContext,
} from "./context/TranscriptProvider";
import { getLanguageFullName } from "@/utils";
import LogoIcon from "./icons/LogoIcon";
import { useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";
import DialogButton from "./DialogButton";

const TranscriptDialog = ({ children }: PropsWithChildren) => {
  const { transcript, current, metadata } = useTranscriptContext();
  const { handleCurrentLangauge } = useTranscriptActionContext();
  const [isOpen, setIsOpen] = useLocalStorage("isOpen", false);

  if (!metadata?.key) {
    return null;
  }

  return (
    <section className="tw-flex tw-flex-col tw-items-end tw-gap-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="tw-flex tw-items-center tw-justify-center tw-h-fit tw-flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="tw-flex tw-items-center tw-justify-end tw-flex-col"
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
          "!tw-p-1  tw-overflow-hidden ",
          "tw-aspect-square tw-flex tw-justify-center tw-items-center tw-h-[54px] tw-w-[54px] !tw-rounded-[24px] tw-text-2xl tw-shadow-md"
        )}
      >
        {isOpen ? (
          <motion.p
            className="tw-text-4xl tw-text-white tw-font-Freesentation tw-font-light"
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
