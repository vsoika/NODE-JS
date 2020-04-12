const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const { NewError, catchError } = require('../../middlewares/errorHandler');
const { BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchError(async (req, res) => {
    const id = req.params.boardId;
    const taskData = await taskService.getTaskByBoardId(id);

    const [board, task] = taskData;

    if (board) {
      if (task.length) {
        await res.json(task.map(Task.toResponse));
      } else {
        const message = `The board with id ${id} does not have any tasks`;
        res.status(404).send({ error: message });
        throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
      }
    } else {
      const message = `The board with id ${id} does not exist`;
      res.status(404).send({ error: message });
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const boardId = req.params.boardId;
    const task = await taskService.createTask(boardId, req.body);

    if (task) {
      res.json(Task.toResponse(task));
    } else {
      throw new NewError(
        BAD_REQUEST,
        getStatusText(BAD_REQUEST),
        getStatusText(BAD_REQUEST)
      );
    }
  })
);

router.route('/:taskId').get(
  catchError(async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const taskData = await taskService.getTaskByBoardIdAndTaskId(
      boardId,
      taskId
    );

    const [board, task] = taskData;

    if (board) {
      if (task) {
        res.json(Task.toResponse(task));
      } else {
        const message = `The task with id ${taskId} does not exist`;
        res.status(404).send({ error: message });
        throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
      }
    } else {
      const message = `The board with id ${boardId} does not exist`;
      res.status(404).send({ error: message });
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

router.route('/:taskId').put(
  catchError(async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const taskData = await taskService.updateTask(boardId, taskId, req.body);

    const [board, task] = taskData;

    if (board) {
      if (task) {
        res.json(`The task with id ${taskId} have been updated successfully`);
      } else {
        const message = `The task with id ${taskId} does not exist`;
        throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
      }
    } else {
      const message = `The board with id ${boardId} does not exist`;
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

router.route('/:taskId').delete(
  catchError(async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const taskData = await taskService.deleteTask(boardId, taskId);
    const [board, task] = taskData;

    if (board) {
      if (!task) {
        const message = `The task with id ${taskId} does not exist`;
        res.status(404).send({ error: message });
        throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
      }
      res.json(`The task with id ${taskId} have been deleted successfully`);
    } else {
      const message = `The board with id ${boardId} does not exist`;
      throw new NewError(NOT_FOUND, getStatusText(NOT_FOUND), message);
    }
  })
);

module.exports = router;
