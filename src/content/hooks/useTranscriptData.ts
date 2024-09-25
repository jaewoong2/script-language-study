import React, { useEffect, useState } from "react";

type Props = {
  dataString: string;
};

interface Content {
  text: string;
  meaning: string;
}

const useTranscriptData = ({ dataString }: Props) => {
  const [words, setWords] = useState<Content[]>([]);
  const [sentences, setSentences] = useState<Content[]>([]);

  useEffect(() => {
    const parseData = () => {
      const wordList: Content[] = [];
      const sentenceList: Content[] = [];

      const lines = dataString.trim().split("\n");
      let currentSection = "";

      lines.forEach((line) => {
        line = line.trim();
        if (line.startsWith("- [단어]")) {
          currentSection = "words";
        } else if (line.startsWith("- [문장]")) {
          currentSection = "sentences";
        } else if (line.startsWith("-")) {
          if (currentSection === "words") {
            const match = line.split(":");
            if (match) {
              const [word, meaning] = match;
              wordList.push({ text: word.substring(1), meaning });
            }
          } else if (currentSection === "sentences") {
            const match = line.match(/- "(.+?)": (.+)/);
            if (match) {
              const [, sentence, translation] = match;
              sentenceList.push({ text: sentence, meaning: translation });
            }
          }
        }
      });

      setWords(wordList);
      setSentences(sentenceList);
    };

    parseData();
  }, [dataString]);

  return { words, sentences };
};

export default useTranscriptData;
