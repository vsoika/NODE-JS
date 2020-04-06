const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  await boardService.getAll(req, res);
});

router.route('/').post(async (req, res) => {
  await boardService.addNewBoard(req, res);
});

router.route('/:id').get(async (req, res) => {
  await boardService.getBoardById(req, res);
});

router.route('/:id').put(async (req, res) => {
  await boardService.updateBoard(req, res);
});

router.route('/:id').delete(async (req, res) => {
  await boardService.deleteBoard(req, res);
});

module.exports = router;
