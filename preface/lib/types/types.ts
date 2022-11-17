export interface Queries {
  q?: string | string[];
  _page?: string | string[];
  _limit?: string | string[];
  _sort?: string | string[];
  _order?: string | string[];
}

export type QueryKeys = keyof Queries;
