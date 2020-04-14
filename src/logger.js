
const {
  createLogger,
  transports,
  format
} = require('winston');
require('winston-mongodb');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.timestamp(),
        format.simple())
    }),
    new transports.MongoDB({
      db: 'mongodb+srv://adwera:adwera@node-rest-api-mongo-0iss4.mongodb.net/test?retryWrites=true&w=majority',
      options: { useUnifiedTopology: true },
      collection: 'mongo-logs',
      format: format.combine(format.timestamp(), format.simple())
    })
  ]
});

module.exports = logger;
