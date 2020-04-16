const boardsRepo = require('./board.memory.repository');

const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards;
};

const addNewBoard = async body => {
  const board = await boardsRepo.addNewBoard(body);
  return board;
};

const getBoardById = async id => {
  const board = await boardsRepo.getBoardById(id);
  return board;
};

const updateBoard = async (id, body) => {
  const board = await boardsRepo.updateBoard(id, body);
  return board;
};

const deleteBoard = async id => {
  const board = await boardsRepo.deleteBoard(id);
  return board;
};

module.exports = {
  getAll,
  addNewBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
