import jwt = require('express-jwt');
import config = require('config');

// JWT middleware for token validation for Auth0.
const authCheck = jwt({
  secret: new Buffer(<string>config.get('auth0.secret'), 'base64'),
  audience: config.get('auth0.audience')
});

export default authCheck;
