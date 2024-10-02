import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useTranscriptActionContext,
  useTranscriptContext,
} from './context/TranscriptProvider';
import { getLanguageFullName } from '@/utils';
import LogoIcon from './icons/LogoIcon';

const Header = () => {
  const { transcript, current } = useTranscriptContext();
  const { handleCurrentLangauge } =
    useTranscriptActionContext();

  return (
    <div className="tw-z-[1005] tw-flex tw-w-full tw-flex-col tw-items-start tw-font-Freesentation tw-text-3xl tw-text-black">
      <div className="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-1 tw-pb-2">
        <LogoIcon className="!tw-w-[46px] tw-p-0" />
      </div>
      <div className="tw-flex tw-w-full tw-justify-end tw-gap-1">
        <Select
          onValueChange={handleCurrentLangauge}
          value={current.language}
        >
          <SelectTrigger className="tw-z-[20000000000000] tw-w-[180px] tw-rounded-xl tw-bg-white tw-py-6 !tw-shadow-none">
            <SelectValue placeholder="Select a Language" />
          </SelectTrigger>
          <SelectContent className="tw-z-[20000000000000] tw-bg-white tw-text-2xl">
            <SelectGroup className="tw-flex tw-flex-col tw-gap-4">
              <SelectLabel>Language</SelectLabel>
              {transcript
                ?.map(({ languageCode }) =>
                  getLanguageFullName(languageCode),
                )
                ?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;
