import { Query, Types } from 'mongoose';

import { CrudController }  from './interfaces/crud.interface';
import Role from '../models/role';
import { RoleInterface } from '../models/role.interface';
import { SearchController } from './interfaces/search.interface';
import { SearchParams } from '../routes/searchParamsInterface';

export default class RoleController implements CrudController, SearchController {

  /** @inheritdoc */
  public load (id: Types.ObjectId, lean: boolean = false): Promise<RoleInterface> {
    return Role.findOne({ _id: id }, '-__v').lean(lean).then(res => {
      return res as RoleInterface;
    });
  }

  /** @inheritdoc */
  public loadAll (lean: boolean = false): Promise<RoleInterface[]> {
    return Role.find({}, '-__v -description').sort({ slug: 'asc' }).lean(lean).then(res => {
      return res as RoleInterface[];
    });
  }

  /** @inheritdoc */
  public create (data: Object, lean: boolean = false): Promise<RoleInterface> {
    return Role.create(data).then((res: RoleInterface) => {
      return lean ? res.toObject() : res;
    });
  }

  /** @inheritdoc */
  public update (id: Types.ObjectId, data: Object, lean: boolean = false): Promise<RoleInterface> {
    return Role.findOneAndUpdate({ _id: id }, data, { 'new': true }).lean(lean).then((res: RoleInterface) => {
      return res as RoleInterface;
    });
  }

  /** @inheritdoc */
  public remove (id: Types.ObjectId): Query<void> {
    return Role.remove({ _id: id });
  }

  /** @inheritdoc */
  public save (conditions: Object, data: Object, upsert: boolean = false, lean: boolean = false): Promise<RoleInterface> {
    return Role.findOneAndUpdate(conditions, data, {
      'new': true,
      upsert,
      setDefaultsOnInsert: true
    }).lean(lean).then(res => {
      return res as RoleInterface;
    });
  }

  /** @inheritdoc */
  public find (params: SearchParams, lean?: boolean): Promise<RoleInterface[]> {
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
      return results as RoleInterface[];
    });
  }
}
