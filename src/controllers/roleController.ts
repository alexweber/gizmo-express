import { Types } from 'mongoose';

import { ICrudController } from './interfaces/crud.interface';
import Role from '../models/role.model';
import { IRole } from '../models/interfaces/role.interface';
import { ISimpleSearchController } from './interfaces/simpleSearch.interface';
import { ISearchParams } from '../routes/interfaces/searchParams.interface';
import { SearchController } from './searchController';

export default class RoleController extends SearchController implements ICrudController, ISimpleSearchController {

  /** @inheritdoc */
  public load (id: Types.ObjectId, lean = false): Promise<IRole> {
    return Role.findOne({ _id: id }, RoleController.projection).lean(lean).then(res => {
      return res as IRole;
    });
  }

  /** @inheritdoc */
  public loadAll (lean = false): Promise<IRole[]> {
    return Role.find({}, '-__v -description').sort({ slug: 'asc' }).lean(lean).then(res => {
      return res as IRole[];
    });
  }

  /** @inheritdoc */
  public create (data: Object, lean = false): Promise<IRole> {
    return Role.create(data).then((res: IRole) => {
      return lean ? res.toObject() : res;
    });
  }

  /** @inheritdoc */
  public update (id: Types.ObjectId, data: Object, lean = false): Promise<IRole> {
    return Role.findOneAndUpdate({ _id: id }, data, { 'new': true }).lean(lean).then((res: IRole) => {
      return res as IRole;
    });
  }

  /** @inheritdoc */
  public remove (id: Types.ObjectId): Promise<void> {
    return Role.remove({ _id: id }).then(() => {
      return null;
    });
  }

  /** @inheritdoc */
  public save (conditions: Object, data: Object, upsert = false, lean = false): Promise<IRole> {
    return Role.findOneAndUpdate(conditions, data, {
      'new': true,
      upsert,
      setDefaultsOnInsert: true
    }).lean(lean).then(res => {
      return res as IRole;
    });
  }

  /** @inheritdoc */
  public find (params: ISearchParams): Promise<IRole[]> {
    const query = Role.find(params.filters, RoleController.projection);
    return super.setParams(query, params).then(results => {
      return results as IRole[];
    });
  }
}
