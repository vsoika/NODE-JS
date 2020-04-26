const router = require('express').Router({ mergeParams: true });
const { NewError, catchError } = require('../../middlewares/errorHandler');
const { FORBIDDEN, getStatusText } = require('http-status-codes');
const { authenticate } = require('./login.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../..//common/config');

router.route('/').post(
  catchError(async (req, res) => {
    console.log('/login POST: ', req.body);
    const { login, password } = req.body;
    const user = await authenticate(login, password);
    console.log('USER: ', user);
    if (user) {
      const payload = { sub: user.id, login: user.login };
      const token = jwt.sign(payload, JWT_SECRET_KEY);
      console.log(payload, token);

      res.json({ token });
    } else {
      res.status(FORBIDDEN).json({ message: 'Login or password is incorrect' });
      throw new NewError(
        FORBIDDEN,
        getStatusText(FORBIDDEN),
        getStatusText('Login or password is incorrect')
      );
    }
  })
);

module.exports = router;
