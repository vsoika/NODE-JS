const tasksRepo = require('./task.memory.repository');
const All_BOARDS = require('../boards/board.memory.repository');

const getTaskByBoardId = id => {
  const task = tasksRepo.getTaskByBoardId(id);
  return task;
};

const getTaskByBoardIdAndTaskId = (boardId, taskId) => {
  const board = All_BOARDS.boards.find(item => item.id === boardId);
  const task = tasksRepo.getTaskByBoardIdAndTaskId(taskId);
  return [board, task];
};

const createTask = (boardId, body) => {
  const task = tasksRepo.createTask(boardId, body);
  return task;
};

const updateTask = (boardId, taskId, body) => {
  const board = All_BOARDS.boards.find(item => item.id === boardId);
  const task = tasksRepo.updateTask(board, taskId, body);

  return [board, task];
};

const deleteTask = (boardId, taskId) => {
  const board = All_BOARDS.boards.find(item => item.id === boardId);
  const task = tasksRepo.deleteTask(board, taskId);

  return [board, task];
};

module.exports = {
  getTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  createTask,
  updateTask,
  deleteTask
};
