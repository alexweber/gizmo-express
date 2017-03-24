import { Document } from 'mongoose';

export interface IRole extends Document {
  id: string;
  name: string;
  description?: string;
}
