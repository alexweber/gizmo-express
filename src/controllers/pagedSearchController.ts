import { Request } from 'express';
import { Document, PaginateOptions, PaginateResult } from 'mongoose';

import { ISearchParams } from '../routes/interfaces/searchParams.interface';

export abstract class PagedSearchController {

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
   * Helper to return formatted search parameters.
   *
   * @param req {Request} The express Request object.
   *
   * @returns {ISearchParams}
   */
  getSearchParams (req: Request): ISearchParams {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const filters = req.body || {};
    // @TODO sanitize
    // const page = Number(sanitizer.sanitize(req.query.page));
    // const limit = Number(sanitizer.sanitize(req.query.limit));
    // const filters = req.body ? sanitizeObject(req.body) : {};
    const sortField = req.query.sort ? req.query.sort : null;
    let sort = null;

    if (sortField) {
      sort = {};
      sort[sortField] = req.query.dir === 'asc' || req.query.dir === 'desc' ? req.query.dir : 'desc';
    }

    return { page, limit, filters, sort };
  }

  /**
   * Helper to remove null filters which may have come in from a form submission.
   */
  stripNullFilters (params: ISearchParams): ISearchParams {
    let processedParams = Object.assign({}, params);

    // Remove null filters.
    Object.keys(processedParams.filters).forEach(key => {
      if (processedParams.filters[key] === null || processedParams.filters[key] === undefined) {
        delete processedParams.filters[key];
      }
    });

    return processedParams;
  }

  /**
   * Helper to build mongoose pagination options.
   */
  getPaginationOptions (params: ISearchParams, lean: boolean = true): PaginateOptions {
    let populateOptions = [];
    let sortTemp = Object.assign({}, params.sort);

    if (params.populate) {
      let populatedSorts = {};

      Object.keys(params.sort).forEach(key => {
        // If we're sorting on a key that's populated, break it up.
        if (key.indexOf('.') !== -1) {
          const temp = key.split('.');
          populatedSorts[temp[0]] = {};
          populatedSorts[temp[0]][temp[1]] = params.sort[key];
          delete sortTemp[key];
        }
      });

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
      offset: (params.page - 1) * params.limit
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
