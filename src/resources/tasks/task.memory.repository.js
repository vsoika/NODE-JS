const Task = require('./task.model');

const tasks = [];

const getTaskByBoardId = id => {
  const task = tasks.filter(item => item.boardId === id);
  return task;
};

const createTask = (boardId, body) => {
  let newTask = body;
  newTask['boardId'] = boardId;
  newTask = new Task(newTask);
  tasks.push(newTask);

  return newTask;
};

const getTaskByBoardIdAndTaskId = taskId => {
  const task = tasks.find(item => item.id === taskId);
  return task;
};

const updateTask = (board, taskId, body) => {
  const task = tasks.find(item => item.id === taskId);
  const updatedTask = body;

  if (board) {
    if (task) {
      for (const key in board) {
        if (updatedTask[key]) {
          task[key] =
            task[key] !== updatedTask[key] ? updatedTask[key] : task[key];
        }
      }
    }
  }

  return task;
};

const deleteTask = (board, taskId) => {
  const task = tasks.find(item => item.id === taskId);

  if (board) {
    if (task) {
      tasks.forEach((item, i) => {
        if (item.id === taskId) {
          tasks.splice(i, 1);
        }
      });
    }
  }
  return task;
};

module.exports = {
  getTaskByBoardId,
  createTask,
  getTaskByBoardIdAndTaskId,
  updateTask,
  deleteTask
};
module.exports.tasks = tasks;
