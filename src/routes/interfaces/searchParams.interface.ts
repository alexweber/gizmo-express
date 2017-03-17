export interface ISearchParams {
  page?: number;
  limit?: number;
  filters: Object;
  sort?: Object;
  populate?: Object;
  select?: Object|string;
}
