import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import TranscriptTabContent from './TranscriptTabContent';

type TabConfig = {
  label: string;
  value: 'Words' | 'Sentences';
  type: 'words' | 'sentences';
};

const TAB_CONFIGS: TabConfig[] = [
  {
    label: '단어',
    value: 'Words',
    type: 'words',
  },
  {
    label: '문장',
    value: 'Sentences',
    type: 'sentences',
  },
];

const TranscriptDisplay: React.FC = () => {
  return (
    <div className="">
      <Tabs defaultValue="Words" className="tw-w-full">
        <TabsList className="text-2xl tw-mb-2 tw-flex tw-w-full tw-rounded-xl tw-bg-transparent">
          {TAB_CONFIGS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                'tw-w-full tw-bg-zinc-100 tw-px-4 tw-py-1',
                'aria-selected:!tw-bg-primary aria-selected:!tw-text-white aria-selected:!tw-shadow-none',
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TAB_CONFIGS.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="text-2xl !tw-shadow-none"
          >
            <TranscriptTabContent type={tab.type} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
export default TranscriptDisplay;
