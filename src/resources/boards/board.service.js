const usersRepo = require('./board.memory.repository');
const Board = require('./board.model');
const All_BOARDS = require('./board.memory.repository');
const ALL_TASKS = require('../tasks/task.memory.repository');

const getAll = async (req, res) => {
  const boards = await usersRepo.getAll();

  if (boards.length) {
    await res.json(boards.map(Board.toResponse));
  } else {
    res.status(404).send({ error: 'The boards not found' });
  }
};

const addNewBoard = async (req, res) => {
  const newBoard = new Board(req.body);
  All_BOARDS.boards.push(newBoard);
  await res.json(Board.toResponse(newBoard));
};

const getBoardById = async (req, res) => {
  const id = req.params.id;
  const board = All_BOARDS.boards.find(item => item.id === id);

  if (board) {
    await res.json(Board.toResponse(board));
  } else {
    res.status(404).send({ error: `The board with id ${id} doesn't exist` });
  }
};

const updateBoard = async (req, res) => {
  const id = req.params.id;
  const board = All_BOARDS.boards.find(item => item.id === id);
  const updatedBoard = req.body;

  if (board) {
    for (const key in board) {
      if (updatedBoard[key]) {
        board[key] =
          board[key] !== updatedBoard[key] ? updatedBoard[key] : board[key];
      }
    }

    await res.json(`The board with id ${id} have been updated successfully`);
  } else {
    res.status(404).send({ error: `The board with id ${id} doesn't exist` });
  }
};

const deleteBoard = async (req, res) => {
  const id = req.params.id;
  const board = All_BOARDS.boards.find(item => item.id === id);

  if (board) {
    All_BOARDS.boards.forEach((item, i) => {
      if (item.id === id) {
        All_BOARDS.boards.splice(i, 1);
      }
    });

    ALL_TASKS.tasks.forEach((item, i) => {
      if (item.boardId === id) {
        ALL_TASKS.tasks.splice(i, 1);
      }
    });

    await res.json(`The board with id ${id} have been deleted successfully`);
  } else {
    await res
      .status(404)
      .send({ error: `The board with id ${id} doesn't exist` });
  }
};

module.exports = {
  getAll,
  addNewBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
