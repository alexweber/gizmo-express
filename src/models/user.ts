import mongoose = require('mongoose');
import mongoosePaginate = require('mongoose-paginate');

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
  photo: String
});

User.plugin(mongoosePaginate);

let UserModel;

if (mongoose['models'].User) {
  UserModel = mongoose.model('User');
} else {
  UserModel = mongoose.model('User', User);
}

export default UserModel;
