const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  const id = req.params.boardId;
  const task = await taskService.getTaskByBoardId(id);

  if (task.length) {
    await res.json(task.map(Task.toResponse));
  } else {
    res
      .status(404)
      .send({ error: `The board with id ${id} doesn't have any tasks` });
  }
});

router.route('/').post(async (req, res) => {
  const boardId = req.params.boardId;
  const task = await taskService.createTask(boardId, req.body);
  res.json(Task.toResponse(task));
});

router.route('/:taskId').get(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const taskData = await taskService.getTaskByBoardIdAndTaskId(boardId, taskId);

  const [board, task] = taskData;

  if (board) {
    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res
        .status(404)
        .send({ error: `The task with id ${taskId} doesn't exist` });
    }
  } else {
    res
      .status(404)
      .send({ error: `The board with id ${boardId} doesn't exist` });
  }
});

router.route('/:taskId').put(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const taskData = await taskService.updateTask(boardId, taskId, req.body);

  const [board, task] = taskData;

  if (board) {
    if (task) {
      res.json(`The task with id ${taskId} have been updated successfully`);
    } else {
      res
        .status(404)
        .send({ error: `The task with id ${taskId} doesn't exist` });
    }
  } else {
    res
      .status(404)
      .send({ error: `The board with id ${boardId} doesn't exist` });
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const taskData = await taskService.deleteTask(boardId, taskId);
  const [board, task] = taskData;

  if (board) {
    if (!task) {
      res
        .status(404)
        .send({ error: `The task with id ${taskId} doesn't exist` });
    }
    res.json(`The task with id ${taskId} have been deleted successfully`);
  } else {
    res
      .status(404)
      .send({ error: `The board with id ${boardId} doesn't exist` });
  }
});

module.exports = router;
