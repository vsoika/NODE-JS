const Board = require('./board.model');
const Column = require('./column.model');
const ALL_TASKS = require('../tasks/task.memory.repository');

const boards = [
  new Board({
    title: 'boards1',
    columns: [
      new Column({ title: 'columns1', order: 0 }),
      new Column({ title: 'columns2', order: 1 })
    ]
  }),
  new Board({
    title: 'boards2',
    columns: [
      new Column({ title: 'columns1', order: 3 }),
      new Column({ title: 'columns2', order: 2 })
    ]
  })
];

const getAll = () => {
  return boards;
};

const addNewBoard = body => {
  const newBoard = new Board(body);
  boards.push(newBoard);
  return newBoard;
};

const getBoardById = id => {
  const board = boards.find(item => item.id === id);
  return board;
};

const updateBoard = (id, body) => {
  const board = boards.find(item => item.id === id);
  const updatedBoard = body;

  if (board) {
    for (const key in board) {
      if (updatedBoard[key]) {
        board[key] =
          board[key] !== updatedBoard[key] ? updatedBoard[key] : board[key];
      }
    }
  }
  return board;
};

const deleteBoard = id => {
  const board = boards.find(item => item.id === id);

  if (board) {
    boards.forEach((item, i) => {
      if (item.id === id) {
        boards.splice(i, 1);
      }
    });

    ALL_TASKS.tasks.forEach((item, i) => {
      if (item.boardId === id) {
        ALL_TASKS.tasks.splice(i, 1);
      }
    });
  }
  return board;
};

module.exports = {
  getAll,
  addNewBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
module.exports.boards = boards;
