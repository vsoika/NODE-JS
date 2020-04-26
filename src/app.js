const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./logger/logger');
const loginRouter = require('./resources/login/login.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const logsHandler = require('./middlewares/logsHandler');
const { errorHandler } = require('./middlewares/errorHandler');
const checkToken = require('./middlewares/checkToken');

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logsHandler);

app.use('/login', loginRouter);
app.use('/users', checkToken, userRouter);
app.use('/boards', checkToken, boardRouter);
app.use('/boards/:boardId/tasks', checkToken, taskRouter);

app.use(errorHandler);

process.on('uncaughtException', error => {
  logger.error(`Uncaught Exception error: ${error.message}`);
  console.log(`Uncaught Exception error: ${error.message}`);

  const { exit } = process;
  logger.on('finish', () => exit(1));
});

process.on('unhandledRejection', error => {
  logger.error(`Unhandled rejection error: ${error.message}`);
  console.log(`Unhandled rejection error: ${error.message}`);
});

// For testing uncaughtException and unhandledRejection uncomment one of the errors below

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
