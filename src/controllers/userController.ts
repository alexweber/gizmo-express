import { Query } from 'mongoose';

import { CrudController }  from './crudController';
import { UserInterface } from '../models/user.interface';
import User from '../models/user';

export default class UserController extends CrudController {

  public load (conditions: Object): Promise<UserInterface> {
    return User.findOne(conditions, '-__v').lean(true).then(res => {
      return res as UserInterface;
    });
  }

  public loadAll (): Promise<UserInterface[]> {
    return User.find({}, '-__v').sort({ created: 'desc' }).lean(true).then(res => {
      return res as UserInterface[];
    });
  }

  public create (data: Object): Promise<UserInterface> {
    return User.create(data).then((res: UserInterface) => {
      return res.toObject();
    });
  }

  public remove (conditions: Object): Query<void> {
    return User.remove(conditions);
  }

  public save (conditions: Object, data: Object, upsert: boolean = false): Promise<UserInterface> {
    return User.findOneAndUpdate(conditions, data, { 'new': true, upsert: true }).lean(true).then(res => {
      return res as UserInterface;
    });
  }
}
