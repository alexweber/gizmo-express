import mongoose = require('mongoose');

export interface UserInterface extends mongoose.Document {
  id: string;
  name: string;
  photo?: string;
}
