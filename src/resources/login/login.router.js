const router = require('express').Router({ mergeParams: true });
const { NewError, catchError } = require('../../middlewares/errorHandler');
const { FORBIDDEN, getStatusText } = require('http-status-codes');
const { authenticate } = require('./login.service');

router.route('/').post(
  catchError(async (req, res) => {
    const { login, password } = req.body;
    const token = await authenticate(login, password);

    if (token) {
      res.status(200).send({ token });
    } else {
      throw new NewError(
        FORBIDDEN,
        getStatusText(FORBIDDEN),
        'Login or password is incorrect'
      );
    }
  })
);

module.exports = router;
