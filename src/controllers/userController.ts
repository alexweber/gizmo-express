import { Request } from 'express';
import { Query, Types, PaginateOptions, PaginateResult } from 'mongoose';

import { ICrudController }  from './interfaces/crud.interface';
import { IPagedSearchController } from './interfaces/pagedSearch.interface';
import { ISearchParams } from '../routes/interfaces/searchParams.interface';
import { IUser } from '../models/interfaces/user.interface';
import User from '../models/user';
import stripAccents from '../util/stripAccents';

export default class UserController implements ICrudController, IPagedSearchController {

  /**
   * The default projection for queries.
   *
   * @type {string}
   */
  static projection = '-__v';

  /** @inheritdoc */
  public load (id: Types.ObjectId, lean: boolean = false): Promise<IUser> {
    return User.findOne({ _id: id }, UserController.projection).lean(lean).then(res => {
      return res as IUser;
    });
  }

  /** @inheritdoc */
  public loadAll (lean: boolean = false): Promise<IUser[]> {
    return User.find({}, UserController.projection).sort({ created: 'desc' }).lean(lean).then(res => {
      return res as IUser[];
    });
  }

  /** @inheritdoc */
  public create (data: Object, lean: boolean = false): Promise<IUser> {
    return User.create(data).then((res: IUser) => {
      return lean ? res.toObject() : res;
    });
  }

  /** @inheritdoc */
  public update (id: Types.ObjectId, data: Object, lean: boolean = false): Promise<IUser> {
    return User.findOneAndUpdate({ _id: id }, data, { 'new': true }).lean(lean).then((res: IUser) => {
      return res as IUser;
    });
  }

  /** @inheritdoc */
  public remove (id: Types.ObjectId): Query<void> {
    return User.remove({ _id: id });
  }

  /** @inheritdoc */
  public save (
    conditions: Object, data: Object, upsert: boolean = false, lean: boolean = false
  ): Promise<IUser> {
    return User.findOneAndUpdate(conditions, data, {
      'new': true,
      upsert,
      setDefaultsOnInsert: true
    }).lean(lean).then(res => {
      return res as IUser;
    });
  }

  /** @inheritdoc */
  public findPaged (params: ISearchParams, lean?: boolean): Promise<PaginateResult<IUser>> {
    let processedParams = Object.assign({}, params);
    processedParams.select = UserController.projection;
    // processedParams.populate = UserController.populate;

    if (processedParams.filters && 'search' in processedParams.filters) {
      processedParams = this.pagedSearchHelper(processedParams);
    }

    // Remove null filters.
    Object.keys(processedParams.filters).forEach(key => {
      if (processedParams.filters[key] === null || processedParams.filters[key] === undefined) {
        delete processedParams.filters[key];
      }
    });

    const options = this.getPaginationOptions(processedParams, lean);
    return User.paginate(processedParams.filters, options);
  }

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
  pagedSearchHelper (params: ISearchParams): ISearchParams {
    let processedParams = Object.assign({}, params);
    const strippedTerm = stripAccents(params.filters['search']).trim();
    processedParams.filters['$or'] = [
      {
        name: {
          $regex: strippedTerm,
          $options: 'i'
        }
      },
      {
        email: {
          $regex: strippedTerm,
          $options: 'i'
        }
      },
    ];
    delete processedParams.filters['search'];
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
