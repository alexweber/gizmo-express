import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  created: Date;
  last_login: Date;
  email?: string;
  photo?: string;
}
