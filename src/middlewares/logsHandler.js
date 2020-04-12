const logger = require('../logger/logger');

const logsHandler = (req, res, next) => {
  const { method, originalUrl } = req;
  const queryObject = JSON.stringify(req.query);
  const bodyObject = JSON.stringify(req.body);

  const { statusCode } = res;
  logger.info(
    `METHOD: ${method},  STATUS: ${statusCode}, URL: ${originalUrl}, QUERY PARAMS: ${queryObject}, BODY: ${bodyObject}`
  );
  next();
};

module.exports = logsHandler;
