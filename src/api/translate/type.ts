export interface PageMetaDtoParameters {
  pageOptionsDto: {
    page: number;
    take: number;
  };
  total: number;
}

export class PageMetaDto {
  readonly total: number;

  readonly page: number;

  readonly take: number;

  readonly last_page: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor({
    pageOptionsDto,
    total,
  }: PageMetaDtoParameters) {
    this.page =
      pageOptionsDto.page <= 0 ? 1 : pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.total = total;
    this.last_page = Math.ceil(this.total / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.last_page;
  }
}

export type GetTranslateRecommendRequestParams = {
  key: string; // yotubue url
  page: number;
  language: string;
};

export type GetTranslateRecommendResponse = {
  success: boolean;
  message: string;
  error: null | string;
  status: number;
  data: {
    category: string;
    contents: string;
    createdAt: string;
    id: string;
    key: string;
    updateAt: string;
  };
};

export type PostTranslateRecommendRequestParams = {
  category: string; // default: video
  key: string; // yotubue url
  script: string; // yotubue script
  language: string; // from languae (e.g. => kr, en, jp, cn)
  page: number;
  status: 'QUEUE' | 'DONE' | 'NULL';
};

export type PostTranslateRecommendResponse = {
  success: boolean;
  message: string;
  error: null | string;
  status: number;
  data: {
    category: string;
    contents: string;
    createdAt: string;
    id: string;
    key: string;
    updateAt: string;
  };
};
