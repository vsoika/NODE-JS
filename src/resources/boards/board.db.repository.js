const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  return Board.find({});
};

const addNewBoard = async body => {
  return Board.create(body);
};

const getBoardById = async id => {
  return Board.findById(id);
};

const updateBoard = async (id, body) => {
  return Board.updateOne({ _id: id }, body);
};

const deleteBoard = async id => {
  const board = await Board.findById(id);

  if (board) {
    Task.deleteMany({ boardId: id });
  }

  return Board.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  addNewBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
