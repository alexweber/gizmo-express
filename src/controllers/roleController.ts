import { Query } from 'mongoose';

import { CrudController }  from './crudController';
import Role from '../models/role';
import { RoleInterface } from '../models/role.interface';

export default class RoleController extends CrudController {

  public load (conditions: Object): Promise<RoleInterface> {
    return Role.findOne(conditions, '-__v').lean(true).then(res => {
      return res as RoleInterface;
    });
  }

  public loadAll (): Promise<RoleInterface[]> {
    return Role.find({}, '-__v -description').sort({ slug: 'asc' }).lean(true).then(res => {
      return res as RoleInterface[];
    });
  }

  public create (data: Object): Promise<RoleInterface> {
    return Role.create(data).then((res: RoleInterface) => {
      return res.toObject();
    });
  }

  public remove (conditions: Object): Query<void> {
    return Role.remove(conditions);
  }

  public save (conditions: Object, data: Object, upsert: boolean = false): Promise<RoleInterface> {
    return Role.findOneAndUpdate(conditions, data, { 'new': true, upsert: true }).lean(true).then(res => {
      return res as RoleInterface;
    });
  }
}
