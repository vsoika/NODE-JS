const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../..//common/config');
const { NewError } = require('../../middlewares/errorHandler');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');
const User = require('../users/user.model');

const authenticate = async (login, pass) => {
  const user = await User.findOne({ login, password: pass });
  console.log('user authenticate: ', user);
  // const payload = { sub: user.id, login: user.login };
  // const token = jwt.sign(payload, JWT_SECRET_KEY);
  // const { password, ...userWithoutPassword } = user;
  // console.log(payload, token)
  // res.send(token);

  return user;
};

const checkToken = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  console.log('TOKEN: ', token);
  console.log('REQ BODY: ', req.body);

  if (token) {
    token = token.slice(7, token.length);

    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        res.status(401).json('Failed to authenticate token');

        throw new NewError(
          UNAUTHORIZED,
          getStatusText(UNAUTHORIZED),
          getStatusText('Failed to authenticate token')
        );

        // next(
        //    new NewError(
        //     UNAUTHORIZED,
        //     getStatusText(UNAUTHORIZED),
        //     getStatusText('Failed to authenticate token')
        //   )
        // );
      }
      res.status(200).json(req.body);
      next();
    });
  } else {
    res.status(401).json('No token provided');

    throw new NewError(
      UNAUTHORIZED,
      getStatusText(UNAUTHORIZED),
      getStatusText('No token provided')
    );

    // next(
    //    new NewError(
    //     UNAUTHORIZED,
    //     getStatusText(UNAUTHORIZED),
    //     getStatusText('No token provided')
    //   )
    // );
  }
};

module.exports = {
  authenticate,
  checkToken
};
