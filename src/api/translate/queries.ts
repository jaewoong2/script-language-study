"use client";

import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

import translateService from "./translateService";
import {
  GetTranslateRecommendRequestParams,
  GetTranslateRecommendResponse,
  PostTranslateRecommendRequestParams,
  PostTranslateRecommendResponse,
} from "./type";
import { AxiosResponse } from "axios";

const queryKeys = {
  recommend: ({ key, language, page }: GetTranslateRecommendRequestParams) => [
    "recommend",
    `${key}-${language}-${page}`,
  ],
};

const queryOptions = {
  recommend: (): UseMutationOptions<
    AxiosResponse<PostTranslateRecommendResponse>,
    Error,
    PostTranslateRecommendRequestParams,
    unknown
  > => ({
    mutationFn: (post: PostTranslateRecommendRequestParams) =>
      translateService.recommend(post),
  }),
  getRecommend: ({
    key,
    page,
    language,
  }: GetTranslateRecommendRequestParams): UseQueryOptions<
    AxiosResponse<GetTranslateRecommendResponse>,
    Error,
    AxiosResponse<GetTranslateRecommendResponse>,
    string[]
  > => ({
    queryKey: queryKeys.recommend({ page, key, language }),
    queryFn: () => translateService.getRecommend({ key, page, language }),
  }),
};

export default queryOptions;
