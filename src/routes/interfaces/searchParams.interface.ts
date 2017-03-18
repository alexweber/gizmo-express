export interface ISearchParams {
  page?: number;
  limit?: number;
  filters: Object;
  sort?: Object;
  populate?: Object;
  select?: Object|string;

  // Whether to return plain objects instead of full Mongoose Documents, defaults to true.
  lean?: boolean;
}
