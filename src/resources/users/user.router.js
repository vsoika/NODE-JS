const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  await res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  await usersService.addNewUser(req, res);
});

router.route('/:id').get(async (req, res) => {
  await usersService.getUserById(req, res);
});

router.route('/:id').put(async (req, res) => {
  await usersService.updateUser(req, res);
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteUser(req, res);
});

module.exports = router;
