const User = require('./user.model');
// const ALL_TASKS = require('../tasks/task.memory.repository');

const getAll = () => {
  return User.find({});
  // return users;
};

const addNewUser = async user => {
  return User.create(user);
  // throw new Error();
  // const a = await User.create(user);
  // console.log('REPO: ', a)
  // return a;
  // const newUser = new User(user);
  // users.push(newUser);
  // return newUser;
};

const getUserById = async id => {
  return User.findById(id);
  // throw new Error();
  // const user = users.find(item => item.id === id);
  // return user;
};

const updateUser = async (id, body) => {
  return User.updateOne({ _id: id }, body);
  // throw new Error();
  // const user = users.find(item => item.id === id);
  // const updatedUser = body;

  // if (user) {
  //   for (const key in user) {
  //     if (updatedUser[key]) {
  //       user[key] =
  //         user[key] !== updatedUser[key] ? updatedUser[key] : user[key];
  //     }
  //   }
  // }
  // return user;
};

const deleteUser = id => {
  return User.deleteOne({ _id: id });
  // throw new Error();
  // const user = users.find(item => item.id === id);

  // if (user) {
  //   users.forEach((item, i) => {
  //     if (item.id === id) {
  //       users.splice(i, 1);

  //       ALL_TASKS.tasks.forEach(task => {
  //         if (task.userId === id) {
  //           task.userId = null;
  //         }
  //       });
  //     }
  //   });
  // }

  // return user;
};

module.exports = {
  getAll,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser
};
