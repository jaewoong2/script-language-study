import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useTranscriptActionContext,
  useTranscriptContext,
} from "./context/TranscriptProvider";
import { getLanguageFullName } from "@/utils";

const Header = () => {
  const { transcript, current } = useTranscriptContext();
  const { handleCurrentLangauge } = useTranscriptActionContext();

  return (
    // <div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-py-2 tw-text-3xl tw-text-black tw-font-Freesentation tw-z-[1005]">
    <div className="tw-flex tw-w-full tw-justify-end tw-gap-1 tw-px-4">
      <Select onValueChange={handleCurrentLangauge} value={current.language}>
        <SelectTrigger className="tw-w-[180px] tw-bg-white tw-z-[20000000000000] tw-py-6 tw-rounded-xl">
          <SelectValue placeholder="Select a Language" />
        </SelectTrigger>
        <SelectContent className="tw-bg-white tw-z-[20000000000000] tw-text-2xl">
          <SelectGroup className="tw-gap-4 tw-flex tw-flex-col">
            <SelectLabel>Language</SelectLabel>
            {transcript
              ?.map(({ languageCode }) => getLanguageFullName(languageCode))
              ?.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    // </div>
  );
};

export default Header;
