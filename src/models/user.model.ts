import mongoose = require('mongoose');

import User from './role.schema';

export default mongoose.model('User', User);
