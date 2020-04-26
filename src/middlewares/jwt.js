const expressJwt = require('express-jwt');
const { JWT_SECRET_KEY } = require('../common/config');

function jwt() {
  const secret = JWT_SECRET_KEY;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      '/',
      '/login',
      '/doc'
    ]
  });
}

module.exports = jwt;
