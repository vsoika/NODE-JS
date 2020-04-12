const router = require('express').Router({ mergeParams: true });
const User = require('./user.model');
const usersService = require('./user.service');
const { NewError, catchError } = require('../../common/errorHandler');

const { BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchError(async (req, res) => {
    const users = await usersService.getAll();
    await res.json(users.map(User.toResponse));
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const { name, login, password } = req.body;

    if (name && login && password) {
      const newUser = await usersService.addNewUser(req.body);
      res.json(User.toResponse(newUser));
    } else {
      res.status(BAD_REQUEST).send({ error: getStatusText(BAD_REQUEST) });
      throw new NewError(
        BAD_REQUEST,
        getStatusText(BAD_REQUEST),
        getStatusText(BAD_REQUEST)
      );
    }
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);

    if (user) {
      res.json(User.toResponse(user));
    } else {
      const message = `The user with id ${id} does not exist`;
      res.status(NOT_FOUND).send({ error: message });
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.updateUser(id, req.body);

    if (user) {
      res.json(`The user ${user.name} have been updated successfully`);
    } else {
      const message = `The user with id ${id} does not exist`;
      res.status(NOT_FOUND).send({ error: message });
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.deleteUser(id);

    if (user) {
      res.json(`The user ${user.name} have been deleted successfully`);
    } else {
      const message = `The user with id ${id} does not exist`;
      res.status(NOT_FOUND).send({ error: message });
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

module.exports = router;
