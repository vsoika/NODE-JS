const User = require('./user.model');
const ALL_TASKS = require('../tasks/task.memory.repository');

const users = [
  new User({ name: 'Volha Soika', login: 'vsoika', password: '12345678' }),
  new User({ name: 'Pavel Ivanov', login: 'pav124', password: '5554879' })
];

const getAll = () => {
  return users;
};

const addNewUser = user => {
  const newUser = new User(user);
  users.push(newUser);
  return newUser;
};

const getUserById = id => {
  const user = users.find(item => item.id === id);
  return user;
};

const updateUser = (id, body) => {
  const user = users.find(item => item.id === id);
  const updatedUser = body;

  if (user) {
    for (const key in user) {
      if (updatedUser[key]) {
        user[key] =
          user[key] !== updatedUser[key] ? updatedUser[key] : user[key];
      }
    }
  }
  return user;
};

const deleteUser = id => {
  const user = users.find(item => item.id === id);

  if (user) {
    users.forEach((item, i) => {
      if (item.id === id) {
        users.splice(i, 1);

        ALL_TASKS.tasks.forEach(task => {
          if (task.userId === id) {
            task.userId = null;
          }
        });
      }
    });
  }

  return user;
};

module.exports = {
  getAll,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser
};
module.exports.users = users;
