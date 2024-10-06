import TranscriptContent from '@/new-content/features/TranscriptContent';
import { useTranscriptContext } from './context/TranscriptProvider';
import { useGetTranslateRecommends } from '@/api/translate/useTranslateService';
import { parseSingleData } from '@/utils';
import ContentError from './ContentError';

interface TranscriptTabContentProps {
  type: 'words' | 'sentences';
}

const TranscriptTabContent: React.FC<
  TranscriptTabContentProps
> = ({ type }) => {
  const { current, metadata, totalPages } =
    useTranscriptContext();

  const pages = Array.from(
    {
      length: Math.min(
        Math.max(current.page, 1),
        totalPages,
      ),
    },
    (_, index) => index,
  );

  const results = useGetTranslateRecommends(
    pages.map((page) => ({
      key: `${metadata?.key}`,
      language: current.language,
      page,
    })),
    {
      gcTime: Infinity,
      staleTime: Infinity,
      enabled: (query) => {
        if (query.state.status === 'success') return false;
        return true;
      },
      refetchInterval: (query) => {
        return query.state.error ? 5000 : false;
      },
    },
  );

  const datas = results.map(({ data, ...rest }) => ({
    data: parseSingleData(data?.data.data.contents),
    ...rest,
  }));

  return (
    <section className="tw-h-full tw-min-h-[450px] tw-rounded-xl tw-border tw-bg-white tw-py-6 !tw-shadow-none">
      <ul className="tw-space-y-2">
        {datas.map(
          ({ data, status, failureCount }, index) => (
            <ContentError
              page={index}
              status={status}
              failureCount={failureCount}
            >
              {data[type] && (
                <TranscriptContent
                  page={index}
                  contents={data[type]}
                  key={`${type}-page-${index}`}
                  isEndPage={index === pages.length - 1}
                />
              )}
            </ContentError>
          ),
        )}
      </ul>
    </section>
  );
};

export default TranscriptTabContent;
