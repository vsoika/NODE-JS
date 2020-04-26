const usersRepo = require('./user.db.repository');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAll = async () => await usersRepo.getAll();

const addNewUser = async user => {
  await bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) return;
    user.password = hash;
  });

  return await usersRepo.addNewUser(user);
};

const getUserById = async id => {
  return await usersRepo.getUserById(id);
};

const updateUser = async (id, body) => {
  return await usersRepo.updateUser(id, body);
};

const deleteUser = async id => {
  return await usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser
};
