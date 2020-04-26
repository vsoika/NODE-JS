const Task = require('./task.model');
const Board = require('../boards/board.model');

const getTaskByBoardId = async id => {
  const board = await Board.findById(id);
  const task = await Task.find({ boardId: id });
  return [board, task];
};

const createTask = async (boardId, body) => {
  const newTask = body;
  newTask['boardId'] = boardId;
  return Task.create(newTask);
};

const getTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  const board = await Board.findById(boardId);
  const task = await Task.findById(taskId);
  return [board, task];
};

const updateTask = async (boardId, taskId, body) => {
  const board = await Board.findById(boardId);
  const task = await Task.findById(taskId);
  const updatedTask = body;

  if (board) {
    if (task) {
      await Task.updateOne({ _id: taskId }, updatedTask);
    }
  }

  return [board, task];
};

const deleteTask = async (boardId, taskId) => {
  const board = await Board.findById(boardId);
  const task = await Task.findById(taskId);

  if (board) {
    if (task) {
      await Task.deleteOne({ _id: taskId });
    }
  }
  return [board, task];
};

module.exports = {
  getTaskByBoardId,
  createTask,
  getTaskByBoardIdAndTaskId,
  updateTask,
  deleteTask
};
