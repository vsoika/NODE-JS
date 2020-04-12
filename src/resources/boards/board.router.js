const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const { NewError, catchError } = require('../../middlewares/errorHandler');
const { BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardService.getAll();

    if (boards.length) {
      res.json(boards.map(Board.toResponse));
    } else {
      res.status(404).send({ error: 'The boards not found' });
      throw new NewError(
        NOT_FOUND,
        getStatusText(NOT_FOUND),
        getStatusText(NOT_FOUND)
      );
    }
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const newBoard = await boardService.addNewBoard(req.body);

    if (newBoard) {
      res.json(Board.toResponse(newBoard));
    } else {
      throw new NewError(
        BAD_REQUEST,
        getStatusText(BAD_REQUEST),
        getStatusText(BAD_REQUEST)
      );
    }
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.getBoardById(id);

    if (board) {
      res.json(Board.toResponse(board));
    } else {
      const message = `The board with id ${id} does not exist`;
      res.status(404).send({ error: message });
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.updateBoard(id, req.body);

    if (board) {
      res.json(`The board with id ${id} have been updated successfully`);
    } else {
      const message = `The board with id ${id} does not exist`;
      res.status(404).send({ error: message });
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.deleteBoard(id);

    if (board) {
      res.json(`The board with id ${id} have been deleted successfully`);
    } else {
      const message = `The board with id ${id} does not exist`;
      res.status(404).send({ error: message });
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

module.exports = router;
