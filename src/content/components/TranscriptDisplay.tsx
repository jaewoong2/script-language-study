import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranscriptContent from "./TranscriptContent";
import { useTranscriptContext } from "./context/TranscriptProvider";
import { cn } from "@/lib/utils";
import Header from "./Header";

interface TranscriptDisplayProps {}

// Define a type for Tab Configuration
type TabConfig = {
  label: string;
  value: "Words" | "Sentences";
  type: "words" | "sentences";
};

const TAB_CONFIGS: TabConfig[] = [
  { label: "단어", value: "Words", type: "words" },
  { label: "문장", value: "Sentences", type: "sentences" },
];

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = () => {
  return (
    <div className="">
      <Tabs defaultValue="Words" className="tw-w-full">
        <TabsList className="text-2xl tw-flex tw-mb-2 tw-w-full">
          {TAB_CONFIGS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn("tw-w-full tw-bg-zinc-100 tw-py-1 tw-px-4")}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_CONFIGS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="text-2xl">
            <TranscriptTabContent type={tab.type} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface TranscriptTabContentProps {
  type: "words" | "sentences";
}

const TranscriptTabContent: React.FC<TranscriptTabContentProps> = ({
  type,
}) => {
  const { current } = useTranscriptContext();
  const totalPages = Math.max(current.page, 1);
  const pages = Array.from({ length: totalPages }, (_, index) => index);

  // Handle case when there are no pages
  if (pages.length === 0) {
    return (
      <section className="tw-h-full tw-py-6 tw-bg-white tw-rounded-xl tw-shadow-md tw-border tw-min-h-[450px] flex items-center justify-center">
        <p className="tw-text-gray-500">No transcript available.</p>
      </section>
    );
  }

  return (
    <section className="tw-h-full tw-py-6 tw-bg-white tw-rounded-xl tw-shadow-md tw-border tw-min-h-[450px]">
      <ul className="tw-space-y-2">
        {pages.map((page) => (
          <TranscriptContent
            key={`${type}-page-${page}`}
            page={page}
            type={type}
          />
        ))}
      </ul>
    </section>
  );
};

export default TranscriptDisplay;
