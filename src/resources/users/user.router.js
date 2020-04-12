const router = require('express').Router({ mergeParams: true });
const { finished } = require('stream');
const User = require('./user.model');
const usersService = require('./user.service');
const logger = require('../../common/log');

router.route('/').get(async (req, res, next) => {
  const users = await usersService.getAll();
  const { method, originalUrl } = req;
  await res.json(users.map(User.toResponse));
  const queryObject = Object.entries(req.query).length === 0 ? '{}' : req.query;
  const bodyObject = Object.entries(req.body).length === 0 ? '{}' : req.body;

  next();

  return finished(res, () => {
    const { statusCode } = res;
    logger.info(
      `METHOD: ${method},  STATUS: ${statusCode}, URL: ${originalUrl}, QUERY PARAMS: ${queryObject}, BODY: ${bodyObject}`
    );
    logger.error(
      `METHOD: ${method},  STATUS: ${statusCode}, URL: ${originalUrl}, QUERY PARAMS: ${queryObject}, BODY: ${bodyObject}`
    );
  });
});

router.route('/').post(async (req, res) => {
  const newUser = await usersService.addNewUser(req.body);
  res.json(User.toResponse(newUser));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);

  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(404).send({ error: `The user with id ${id} doesn't exist` });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.updateUser(id, req.body);

  if (user) {
    res.json(`The user ${user.name} have been updated successfully`);
  } else {
    res.status(404).send({ error: `The user with id ${id} doesn't exist` });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.deleteUser(id);

  if (user) {
    res.json(`The user ${user.name} have been deleted successfully`);
  } else {
    res.status(404).send({ error: `The user with id ${id} doesn't exist` });
  }
});

module.exports = router;
