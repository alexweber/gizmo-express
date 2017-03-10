import mongoose = require('mongoose');
import mongoosePaginate = require('mongoose-paginate');

import User from './user.schema';
User.plugin(mongoosePaginate);

export default mongoose.model('User', User);
