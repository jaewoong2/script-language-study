import { motion } from 'framer-motion';
import TranscriptItem from '@/content/components/TranscriptItem';
import {
  useTranscriptActionContext,
  useTranscriptContext,
} from '@/content/components/context/TranscriptProvider';

type Props = {
  contents?: { meaning: string; text: string }[];
  page: number;
  isEndPage?: boolean;
};

const TranscriptContent = ({
  contents,
  isEndPage,
}: Props) => {
  const { show } = useTranscriptContext();
  const { handleNextPage } = useTranscriptActionContext();

  return (
    <>
      {contents?.map(({ meaning, text }, index) => (
        <li key={`${text}-${index}-content`}>
          <TranscriptItem
            text={text}
            meaning={show ? meaning : ''}
          />
        </li>
      ))}
      {contents && isEndPage && (
        <motion.div onViewportEnter={handleNextPage} />
      )}
    </>
  );
};

export default TranscriptContent;
