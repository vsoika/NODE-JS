const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, '../logs/', 'error.log'),
      level: 'error',
      format: format.combine(
        format.uncolorize(),
        format.json(),
        format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss'
        }),
        format.prettyPrint()
      )
    }),
    new transports.File({
      filename: path.join(__dirname, '../logs/', 'info.log'),
      level: 'info',
      format: format.combine(
        format.uncolorize(),
        format.json(),
        format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss'
        }),
        format.prettyPrint()
      )
    })
  ]
});

//   logger.silly('silly');
// logger.debug('debug');
// logger.verbose('verbose');
// logger.info('info');
// logger.warn('warn');
// logger.error('error');

// logger.log('info', 'info from log');

module.exports = logger;
