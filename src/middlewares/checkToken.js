const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { NewError } = require('./errorHandler');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');

const checkToken = (req, res, next) => {
  const headerAuth = req.headers['x-access-token'] || req.headers.authorization;

  if (headerAuth) {
    const token = headerAuth.slice(7, headerAuth.length);
    jwt.verify(token, JWT_SECRET_KEY);
    return next();
  }
  res.status(UNAUTHORIZED).send(getStatusText(UNAUTHORIZED));
  throw new NewError(
    UNAUTHORIZED,
    getStatusText(UNAUTHORIZED),
    'Failed to authenticate token'
  );
};

module.exports = checkToken;
