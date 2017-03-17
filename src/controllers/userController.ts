import { Query, Types } from 'mongoose';

import { ICrudController }  from './interfaces/crud.interface';
import { IUserInterface } from '../models/interfaces/user.interface';
import User from '../models/user';

export default class UserController implements ICrudController {

  /** @inheritdoc */
  public load (id: Types.ObjectId, lean: boolean = false): Promise<IUserInterface> {
    return User.findOne({ _id: id }, '-__v').lean(lean).then(res => {
      return res as IUserInterface;
    });
  }

  /** @inheritdoc */
  public loadAll (lean: boolean = false): Promise<IUserInterface[]> {
    return User.find({}, '-__v').sort({ created: 'desc' }).lean(lean).then(res => {
      return res as IUserInterface[];
    });
  }

  /** @inheritdoc */
  public create (data: Object, lean: boolean = false): Promise<IUserInterface> {
    return User.create(data).then((res: IUserInterface) => {
      return lean ? res.toObject() : res;
    });
  }

  /** @inheritdoc */
  public update (id: Types.ObjectId, data: Object, lean: boolean = false): Promise<IUserInterface> {
    return User.findOneAndUpdate({ _id: id }, data, { 'new': true }).lean(lean).then((res: IUserInterface) => {
      return res as IUserInterface;
    });
  }

  /** @inheritdoc */
  public remove (id: Types.ObjectId): Query<void> {
    return User.remove({ _id: id });
  }

  /** @inheritdoc */
  public save (
    conditions: Object, data: Object, upsert: boolean = false, lean: boolean = false
  ): Promise<IUserInterface> {
    return User.findOneAndUpdate(conditions, data, {
      'new': true,
      upsert,
      setDefaultsOnInsert: true
    }).lean(lean).then(res => {
      return res as IUserInterface;
    });
  }
}
