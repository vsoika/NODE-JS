const tasksRepo = require('./task.db.repository');

const getTaskByBoardId = async id => {
  const result = await tasksRepo.getTaskByBoardId(id);
  return result;
};

const getTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  const result = await tasksRepo.getTaskByBoardIdAndTaskId(boardId, taskId);
  return result;
};

const createTask = async (boardId, body) => {
  const task = await tasksRepo.createTask(boardId, body);
  return task;
};

const updateTask = async (boardId, taskId, body) => {
  const result = await tasksRepo.updateTask(boardId, taskId, body);
  return result;
};

const deleteTask = async (boardId, taskId) => {
  const result = await tasksRepo.deleteTask(boardId, taskId);
  return result;
};

module.exports = {
  getTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  createTask,
  updateTask,
  deleteTask
};
