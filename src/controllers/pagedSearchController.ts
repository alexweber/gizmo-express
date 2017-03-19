import { Document, PaginateOptions, PaginateResult } from 'mongoose';

import { ISearchParams } from '../routes/interfaces/searchParams.interface';
import { SearchController } from './searchController';

export abstract class PagedSearchController extends SearchController {

  /**
   * Finds documents paged.
   *
   * @param params {ISearchParams}
   *
   * @return {Promise<PaginateResult<Document>>} The paged search result.
   */
  public abstract findPaged (params: ISearchParams): Promise<PaginateResult<Document>>;

  /**
   * Helper to build mongoose pagination options.
   */
  getPaginationOptions (params: ISearchParams): PaginateOptions {
    const populateOptions = [];
    const sortTemp = params.sort ? Object.assign({}, params.sort) : {};

    if (params.populate) {
      const populatedSorts = {};

      if (params.sort) {
        Object.keys(params.sort).forEach(key => {
          // If we're sorting on a key that's populated, break it up.
          if (key.indexOf('.') !== -1) {
            const temp = key.split('.');
            populatedSorts[temp[0]] = {};
            populatedSorts[temp[0]][temp[1]] = params.sort[key];
            delete sortTemp[key];
          }
        });
      }

      Object.keys(params.populate).forEach(key => {
        const populateParams: any = {
          path: key,
          select: params.populate[key]
        };

        if (populatedSorts.hasOwnProperty(key)) {
          populateParams.options = { sort: populatedSorts[key] };
        }

        populateOptions.push(populateParams);
      });
    }

    const options: PaginateOptions = {
      lean: ('lean' in params ? params.lean : true),
      leanWithId: false,
      limit: params.limit,
      offset: params.page * params.limit,
      sort: sortTemp
    };

    if (params.select) {
      options.select = params.select;
    }

    if (populateOptions.length) {
      options.populate = populateOptions;
    }

    return options;
  }
}
