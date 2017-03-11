import mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Role = new Schema({
  slug: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String
});

export default mongoose.model('Role', Role);
