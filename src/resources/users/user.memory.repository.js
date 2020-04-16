const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = () => {
  return User.find({});
};

const addNewUser = async user => {
  return User.create(user);
};

const getUserById = async id => {
  return User.findById(id);
};

const updateUser = async (id, body) => {
  return User.updateOne({ _id: id }, body);
};

const deleteUser = async id => {
  const user = await User.findById(id);

  if (user) {
    await Task.updateMany({ userId: id }, { userId: null });
  }

  return User.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser
};
