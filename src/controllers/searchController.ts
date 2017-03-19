import { Request } from 'express';
import { Document } from 'mongoose';

import { ISearchParams } from '../routes/interfaces/searchParams.interface';
import stripAccents from '../util/stripAccents';
import { Query } from 'mongoose';

export abstract class SearchController {

  /**
   * The default projection for queries.
   *
   * @type {String}
   */
  static projection = '-__v';

  /**
   * Helper to return formatted search parameters from a request.
   *
   * @param req {Request} The express Request object.
   *
   * @returns {ISearchParams}
   */
  getSearchParams (req: Request): ISearchParams {
    const page = Number(req.query.page || 0);
    const limit = Number(req.query.limit || 10);
    const filters = req.body || {};
    // @TODO sanitize
    // const page = Number(sanitizer.sanitize(req.query.page));
    // const limit = Number(sanitizer.sanitize(req.query.limit));
    // const filters = req.body ? sanitizeObject(req.body) : {};
    const sortField = req.query.sort ? req.query.sort : null;
    const sortDir = req.query.dir === 'asc' || req.query.dir === 'desc' ? req.query.dir : 'desc';
    const sort = sortField ? {
        [sortField]: sortDir
      } : {};

    return { page, limit, filters, sort, lean: true };
  }

  /**
   * Convert a "search" parameter into actual query conditions.
   */
  addSearchFilter (params: ISearchParams, fields: string[]): ISearchParams {
    const processedParams = Object.assign({}, params);
    const strippedTerm = stripAccents(processedParams.filters['search']).trim();

    if (fields.length > 1) {
      processedParams.filters['$or'] = [];
      fields.forEach(field => {
        processedParams.filters['$or'].push({
          [field]: {
            $regex: strippedTerm,
            $options: 'i'
          }
        });
      });
    } else {
      processedParams.filters[fields[0]] = strippedTerm;
    }

    delete processedParams.filters['search'];
    return processedParams;
  }

  /**
   * Helper to remove null filters which may have come in from a form submission.
   */
  stripNullFilters (params: ISearchParams): ISearchParams {
    if (!params['filters']) {
      return params;
    }

    const processedParams = Object.assign({}, params);

    // Remove null filters.
    Object.keys(processedParams.filters).forEach(key => {
      if (processedParams.filters[key] === null || processedParams.filters[key] === undefined) {
        delete processedParams.filters[key];
      }
    });

    return processedParams;
  }

  /**
   * Helper to apply query parameters.
   */
  public setParams (query: Query<Document[]>, params: ISearchParams): Query<Document[]> {
    if (params.sort) {
      query.sort(params.sort);
    }

    if ('limit' in params) {
      query.limit(params.limit);
    }

    if ('lean' in params) {
      query.lean(params.lean);
    } else {
      query.lean(true);
    }

    // Intentionally ignore params.page as we have a PagedSearch interface for that.
    // This is specifically a simple search.
    return query;
  }
}
