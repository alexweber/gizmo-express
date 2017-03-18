export interface ISearchParams {
  // What page to return results for, defalts to 0.
  page?: number;

  // Limit the number of results returned, defaults to 10.
  limit?: number;

  // Query filters.
  filters: Object;

  // Optional sort conditions.
  sort?: Object;

  // External references to populate.
  populate?: Object;

  // Fields to project.
  select?: Object|string;

  // Whether to return plain objects instead of full Mongoose Documents, defaults to true.
  lean?: boolean;
}
