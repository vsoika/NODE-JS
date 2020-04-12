const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const addNewUser = user => {
  const newUser = usersRepo.addNewUser(user);
  return newUser;
};

const getUserById = id => {
  const user = usersRepo.getUserById(id);
  return user;
};

const updateUser = (id, body) => {
  const user = usersRepo.updateUser(id, body);
  return user;
};

const deleteUser = id => {
  const user = usersRepo.deleteUser(id);
  return user;
};

module.exports = {
  getAll,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser
};
