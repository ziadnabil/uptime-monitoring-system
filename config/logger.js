require('dotenv').config({ path: '/config/config.env' });
const winston = require('winston');

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const level = () => {
  return 'debug'
}
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}
winston.addColors(colors)
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
  winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `${info.timestamp} - ${info.level}: ${info.message}`,
  ),
)
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),
  // Allow to print all the error level messages inside the error.log file
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
] 
const logger = winston.createLogger({
  level: level(),
  logLevels,
  format,
  transports,
})

module.exports = logger