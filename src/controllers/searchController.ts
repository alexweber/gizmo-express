import { Request } from 'express';

import { ISearchParams } from '../routes/interfaces/searchParams.interface';
import stripAccents from '../util/stripAccents';

export abstract class SearchController {

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
   * Convert a "search" parameter into actual query conditions.
   */
  addSearchFilter (params: ISearchParams, fields: string[]): ISearchParams {
    let processedParams = Object.assign({}, params);
    const strippedTerm = stripAccents(params.filters['search']).trim();

    if (fields.length > 1) {
      processedParams.filters['$or'] = [];
      fields.forEach(field => {
        let obj = {};
        obj[field] = {
          $regex: strippedTerm,
          $options: 'i'
        };
        processedParams.filters['$or'].push(obj);
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
    let processedParams = Object.assign({}, params);

    // Remove null filters.
    Object.keys(processedParams.filters).forEach(key => {
      if (processedParams.filters[key] === null || processedParams.filters[key] === undefined) {
        delete processedParams.filters[key];
      }
    });

    return processedParams;
  }
}
