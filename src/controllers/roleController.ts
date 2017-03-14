import { Query, Types } from 'mongoose';

import { CrudController }  from './crudController';
import Role from '../models/role';
import { RoleInterface } from '../models/role.interface';

export default class RoleController extends CrudController {

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
  public remove (id: Types.ObjectId): Query<void> {
    return Role.remove({ _id: id });
  }

  /** @inheritdoc */
  public save (conditions: Object, data: Object, upsert: boolean = false): Promise<RoleInterface> {
    return Role.findOneAndUpdate(conditions, data, { 'new': true, upsert: true }).lean(true).then(res => {
      return res as RoleInterface;
    });
  }
}
