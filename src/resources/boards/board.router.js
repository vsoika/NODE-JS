const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();

  if (boards.length) {
    res.json(boards.map(Board.toResponse));
  } else {
    res.status(404).send({ error: 'The boards not found' });
  }
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardService.addNewBoard(req.body);
  res.json(Board.toResponse(newBoard));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardService.getBoardById(id);

  if (board) {
    await res.json(Board.toResponse(board));
  } else {
    res.status(404).send({ error: `The board with id ${id} doesn't exist` });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const board = await boardService.updateBoard(id, req.body);

  if (board) {
    res.json(`The board with id ${id} have been updated successfully`);
  } else {
    res.status(404).send({ error: `The board with id ${id} doesn't exist` });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const board = await boardService.deleteBoard(id);

  if (board) {
    res.json(`The board with id ${id} have been deleted successfully`);
  } else {
    res.status(404).send({ error: `The board with id ${id} doesn't exist` });
  }
});

module.exports = router;
