const boardsRepo = require('./board.memory.repository');

const getAll = () => {
  const boards = boardsRepo.getAll();
  return boards;
};

const addNewBoard = body => {
  const board = boardsRepo.addNewBoard(body);
  return board;
};

const getBoardById = id => {
  const board = boardsRepo.getBoardById(id);
  return board;
};

const updateBoard = (id, body) => {
  const board = boardsRepo.updateBoard(id, body);
  return board;
};

const deleteBoard = id => {
  const board = boardsRepo.deleteBoard(id);
  return board;
};

module.exports = {
  getAll,
  addNewBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
