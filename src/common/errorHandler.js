const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const logger = require('./log');

class NewError extends Error {
  constructor(statusCode, statusText, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.statusText = statusText;
  }
}

const catchError = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message, statusText } = err;

  if (!(err instanceof NewError)) {
    statusCode = INTERNAL_SERVER_ERROR;
    statusText = getStatusText(INTERNAL_SERVER_ERROR);
    message = getStatusText(INTERNAL_SERVER_ERROR);
  }

  logger.error(`ERROR ${statusCode} ${statusText}, ${message}`);
};

module.exports = {
  NewError,
  errorHandler,
  catchError
};
