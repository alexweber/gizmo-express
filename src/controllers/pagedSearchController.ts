import { Document, PaginateOptions, PaginateResult } from 'mongoose';

import { ISearchParams } from '../routes/interfaces/searchParams.interface';
import { SearchController } from './searchController';

export abstract class PagedSearchController extends SearchController {

  /**
   * Finds documents paged.
   *
   * @param params {ISearchParams}
   * @param lean {boolean} Whether to return plain objects instead of full Mongoose Documents.
   *
   * @return {Promise<PaginateResult<Document>>} The paged search result.
   */
  public abstract findPaged (params: ISearchParams, lean?: boolean): Promise<PaginateResult<Document>>;

  /**
   * Helper to build mongoose pagination options.
   */
  getPaginationOptions (params: ISearchParams, lean: boolean = true): PaginateOptions {
    let populateOptions = [];
    let sortTemp = Object.assign({}, params.sort);

    if (params.populate) {
      let populatedSorts = {};

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
        let populateParams: any = {
          path: key,
          select: params.populate[key]
        };

        if (populateParams.sort && populatedSorts.hasOwnProperty(key)) {
          populateParams.options = { sort: populatedSorts[key] };
        }

        populateOptions.push(populateParams);
      });
    }

    let options: PaginateOptions = {
      lean,
      leanWithId: false,
      limit: params.limit,
      offset: params.page * params.limit
    };

    if (params.select) {
      options.select = params.select;
    }

    if (params.sort) {
      options.sort = params.sort;
    }

    if (params.populate) {
      options.populate = params.populate;
    }

    return options;
  }
}
