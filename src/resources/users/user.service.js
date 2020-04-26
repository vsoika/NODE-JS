const usersRepo = require('./user.db.repository');
// const User = require('./user.model');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAll = async () => await usersRepo.getAll();

const addNewUser = async user => {
  bcrypt.hash(user.password, saltRounds, async (err, hash) => {
    if (err) return;
    user.password = hash;
    const newUser = await usersRepo.addNewUser(user);
    return newUser;
  });
};

const getUserById = async id => {
  const user = await usersRepo.getUserById(id);
  return user;
};

const updateUser = async (id, body) => {
  const user = await usersRepo.updateUser(id, body);
  console.log('updateUser service: ', user);
  return user;
};

const deleteUser = async id => {
  const user = await usersRepo.deleteUser(id);
  return user;
};

module.exports = {
  getAll,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser
};
