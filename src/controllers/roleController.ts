import { Query, Types } from 'mongoose';

import { ICrudController }  from './interfaces/crud.interface';
import Role from '../models/role';
import { IRole } from '../models/interfaces/role.interface';
import { ISearchController } from './interfaces/search.interface';
import { ISearchParams } from '../routes/interfaces/searchParams.interface';

export default class RoleController implements ICrudController, ISearchController {

  /** @inheritdoc */
  public load (id: Types.ObjectId, lean: boolean = false): Promise<IRole> {
    return Role.findOne({ _id: id }, '-__v').lean(lean).then(res => {
      return res as IRole;
    });
  }

  /** @inheritdoc */
  public loadAll (lean: boolean = false): Promise<IRole[]> {
    return Role.find({}, '-__v -description').sort({ slug: 'asc' }).lean(lean).then(res => {
      return res as IRole[];
    });
  }

  /** @inheritdoc */
  public create (data: Object, lean: boolean = false): Promise<IRole> {
    return Role.create(data).then((res: IRole) => {
      return lean ? res.toObject() : res;
    });
  }

  /** @inheritdoc */
  public update (id: Types.ObjectId, data: Object, lean: boolean = false): Promise<IRole> {
    return Role.findOneAndUpdate({ _id: id }, data, { 'new': true }).lean(lean).then((res: IRole) => {
      return res as IRole;
    });
  }

  /** @inheritdoc */
  public remove (id: Types.ObjectId): Query<void> {
    return Role.remove({ _id: id });
  }

  /** @inheritdoc */
  public save (conditions: Object, data: Object, upsert: boolean = false, lean: boolean = false): Promise<IRole> {
    return Role.findOneAndUpdate(conditions, data, {
      'new': true,
      upsert,
      setDefaultsOnInsert: true
    }).lean(lean).then(res => {
      return res as IRole;
    });
  }

  /** @inheritdoc */
  public find (params: ISearchParams, lean?: boolean): Promise<IRole[]> {
    let query = Role.find(params.filters, '-__v');

    if (params.sort) {
      query.sort(params.sort);
    }

    if (params.limit) {
      query.limit(params.limit);
    }

    // Intentionally ignore params.page as we have a PagedSearch interface for that.
    // This is specifically a "simple" find.

    return query.lean(lean).then(results => {
      return results as IRole[];
    });
  }
}
