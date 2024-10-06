import axios from 'axios';
import {
  GetTranslateRecommendRequestParams,
  GetTranslateRecommendResponse,
  PostTranslateRecommendRequestParams,
  PostTranslateRecommendResponse,
} from './type';

class TranslateService {
  constructor() {
    axios.defaults.baseURL = import.meta.env.DEV
      ? 'http://localhost:3001'
      : 'https://noting-api.prlc.kr';
  }

  async getRecommend({
    page,
    key,
    language,
  }: GetTranslateRecommendRequestParams) {
    const result =
      await axios.get<GetTranslateRecommendResponse>(
        `/api/translate/recommend?key=${key}&page=${page}&language=${language}`,
      );

    return result;
  }

  // Yotubue URL을 키로 하고, 자막을 통해 중요한 단어 및 문장을 추천 받는다.
  async recommend(
    params: PostTranslateRecommendRequestParams,
  ) {
    const result =
      await axios.post<PostTranslateRecommendResponse>(
        `/api/translate/recommend`,
        params,
      );

    return result;
  }
}

const translateService = new TranslateService();

export default translateService;
