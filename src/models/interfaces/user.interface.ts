import mongoose = require('mongoose');

export interface IUserInterface extends mongoose.Document {
  id: string;
  name: string;
  created: Date;
  last_login: Date;
  email?: string;
  photo?: string;
}
