const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const All_USERS = require('./user.memory.repository');
const ALL_TASKS = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const addNewUser = async (req, res) => {
  const newUser = new User(req.body);
  All_USERS.users.push(newUser);
  await res.json(User.toResponse(newUser));
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = All_USERS.users.find(item => item.id === id);

  if (user) {
    await res.json(User.toResponse(user));
  } else {
    res.status(404).send({ error: `The user with id ${id} doesn't exist` });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = All_USERS.users.find(item => item.id === id);
  const updatedUser = req.body;

  if (user) {
    for (const key in user) {
      if (updatedUser[key]) {
        user[key] =
          user[key] !== updatedUser[key] ? updatedUser[key] : user[key];
      }
    }

    await res.json(`The user ${user.name} have been updated successfully`);
  } else {
    res.status(404).send({ error: `The user with id ${id} doesn't exist` });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = All_USERS.users.find(item => item.id === id);

  if (user) {
    All_USERS.users.forEach((item, i) => {
      if (item.id === id) {
        All_USERS.users.splice(i, 1);

        ALL_TASKS.tasks.forEach(task => {
          if (task.userId === id) {
            task.userId = null;
          }
        });
      }
    });

    await res.json(`The user ${user.name} have been deleted successfully`);
  } else {
    res.status(404).send({ error: `The user with id ${id} doesn't exist` });
  }
};

module.exports = {
  getAll,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser
};
