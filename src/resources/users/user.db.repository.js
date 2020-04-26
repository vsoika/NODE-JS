const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  return await User.find({});
};

const addNewUser = async user => {
  return await User.create(user);
};

const getUserById = async id => {
  return User.findOne({ _id: id });
};

const updateUser = async (id, body) => {
  const user = await User.updateOne({ _id: id }, body);
  return User.toResponse(user);
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
