const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  await taskService.getTaskByBoardId(req, res);
});

router.route('/').post(async (req, res) => {
  await taskService.createTask(req, res);
});

router.route('/:taskId').get(async (req, res) => {
  await taskService.getTaskByBoardIdAndTaskId(req, res);
});

router.route('/:taskId').put(async (req, res) => {
  await taskService.updateTask(req, res);
});

router.route('/:taskId').delete(async (req, res) => {
  await taskService.deleteTask(req, res);
});

module.exports = router;
