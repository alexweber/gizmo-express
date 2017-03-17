import { Query, Types, PaginateResult } from 'mongoose';

import { ICrudController }  from './interfaces/crud.interface';
import { PagedSearchController } from './pagedSearchController';
import { ISearchParams } from '../routes/interfaces/searchParams.interface';
import { IUser } from '../models/interfaces/user.interface';
import User from '../models/user';

export default class UserController extends PagedSearchController implements ICrudController {

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
  public save (conditions: Object, data: Object, upsert: boolean = false, lean: boolean = false): Promise<IUser> {
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
      processedParams = this.addSearchFilter(processedParams, ['name', 'email']);
    }

    processedParams = this.stripNullFilters(processedParams);
    const options = this.getPaginationOptions(processedParams, lean);
    return User.paginate(processedParams.filters, options);
  }
}
