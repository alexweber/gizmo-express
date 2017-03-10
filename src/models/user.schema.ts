import mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  id: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  created: Date,
  last_login: Date,
  email: {
    type: String,
    index: true,
    unique: true
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }],
  photo: String,
  phone: String
});

export default User;
