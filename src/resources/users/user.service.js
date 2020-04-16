const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const addNewUser = async user => {
  const newUser = await usersRepo.addNewUser(user);
  return newUser;
};

const getUserById = async id => {
  const user = await usersRepo.getUserById(id);
  return user;
};

const updateUser = async (id, body) => {
  const user = await usersRepo.updateUser(id, body);
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
