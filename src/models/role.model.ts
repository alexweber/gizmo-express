import * as mongoose from 'mongoose';

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

let RoleModel;

if (mongoose['models'].Role) {
  RoleModel = mongoose.model('Role');
} else {
  RoleModel = mongoose.model('Role', Role);
}

export default RoleModel;
