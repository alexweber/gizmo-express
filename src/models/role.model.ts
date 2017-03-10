import mongoose = require('mongoose');

import Role from './role.schema';

export default mongoose.model('Role', Role);
