const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../..//common/config');
const User = require('../users/user.model');
const bcrypt = require('bcrypt');

const authenticate = async (login, pass) => {
  const user = await User.findOne({ login });
  const password = await bcrypt.compare(pass, user.password);

  if (!user && !password) {
    return false;
  }

  const payload = { sub: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY);

  return token;
};

module.exports = {
  authenticate
};
