import mongoose = require('mongoose');

export interface RoleInterface extends mongoose.Document {
  id: string;
  name: string;
  description: string;
}
