import mongoose = require('mongoose');

export interface IRole extends mongoose.Document {
  id: string;
  name: string;
  description?: string;
}
