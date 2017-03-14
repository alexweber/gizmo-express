import { Query, Types } from 'mongoose';

import { CrudController }  from './crudController';
import { UserInterface } from '../models/user.interface';
import User from '../models/user';

export default class UserController extends CrudController {

  /** @inheritdoc */
  public load (id: Types.ObjectId, lean: boolean = false): Promise<UserInterface> {
    return User.findOne({ _id: id }, '-__v').lean(lean).then(res => {
      return res as UserInterface;
    });
  }

  /** @inheritdoc */
  public loadAll (lean: boolean = false): Promise<UserInterface[]> {
    return User.find({}, '-__v').sort({ created: 'desc' }).lean(lean).then(res => {
      return res as UserInterface[];
    });
  }

  /** @inheritdoc */
  public create (data: Object, lean: boolean = false): Promise<UserInterface> {
    return User.create(data).then((res: UserInterface) => {
      return lean ? res.toObject() : res;
    });
  }

  /** @inheritdoc */
  public update (id: Types.ObjectId, data: Object, lean: boolean = false): Promise<UserInterface> {
    return User.update({ _id: id }, data, { 'new': true, safe: true }).then((res: UserInterface) => {
      return lean ? res.toObject() : res;
    });
  }

  /** @inheritdoc */
  public remove (id: Types.ObjectId): Query<void> {
    return User.remove({ _id: id });
  }

  /** @inheritdoc */
  public save (
    conditions: Object, data: Object, upsert: boolean = false, lean: boolean = false
  ): Promise<UserInterface> {
    return User.findOneAndUpdate(conditions, data, {
      'new': true,
      upsert,
      setDefaultsOnInsert: true
    }).lean(lean).then(res => {
      return res as UserInterface;
    });
  }
}
