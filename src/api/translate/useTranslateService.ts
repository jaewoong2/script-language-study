import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import queryOptions from "./queries";

import {
  GetTranslateRecommendRequestParams,
  PostTranslateRecommendRequestParams,
  PostTranslateRecommendResponse,
} from "./type";
import { AxiosResponse } from "axios";

export function useTranslateRecommend(
  options?: UseMutationOptions<
    AxiosResponse<PostTranslateRecommendResponse>,
    Error,
    PostTranslateRecommendRequestParams,
    unknown
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...queryOptions.recommend(),
    ...options,
    onSuccess(data, variables, context) {
      if (options?.onSuccess) {
        options?.onSuccess(data, variables, context);
      }
      queryClient.invalidateQueries({
        predicate: (query) => {
          const { key, page, language } = variables;

          return query.queryKey.includes(`${key}-${language}-${page}`);
        },
      });
    },
  });
}

type GetTranslateRecommendType = ReturnType<typeof queryOptions.getRecommend>;

export function useGetTransalteRecommend(
  { key, page, language }: GetTranslateRecommendRequestParams,
  options?: Omit<GetTranslateRecommendType, "queryFn" | "queryKey">
) {
  return useQuery({
    ...queryOptions.getRecommend({ key, page, language }),
    ...options,
  });
}
