import { createLogger, format, transports } from 'winston';

const { colorize, combine, metadata, timestamp, printf } = format;

const {
  LOG_LEVEL = 'info',
} = process.env;

/**
 * this customFormat will format the text and color only ERROR message to red
 */
const customFormat = printf(info => {
  const message = `${info.timestamp}\t[${info.metadata.filename}]\t${info.level}\t${info.message}`;

  if (info.level === 'ERROR' || info.level === 'WARN') {
    return colorize({ level: true }).colorize(info.level.toLowerCase(), message);
  }

  return message;
});

const changeLevelToUpperCase = format(info => {
  info.level = info.level.toUpperCase();

  return info;
});

const appLogger = createLogger({
  level: LOG_LEVEL,
  exitOnError: false,
  format: combine(
    changeLevelToUpperCase(),
    metadata(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    customFormat
  ),
  transports: [
    new transports.Console()
  ]
});

class Logger {
  constructor(filename) {
    this.filename = filename;
  }

  error(message) {
    appLogger.error(message, { filename: this.filename });
  }

  warn(message) {
    appLogger.warn(message, { filename: this.filename });
  }

  info(message) {
    appLogger.info(message, { filename: this.filename });
  }

  verbose(message) {
    appLogger.verbose(message, { filename: this.filename });
  }

  debug(message) {
    appLogger.debug(message, { filename: this.filename });
  }

  silly(message) {
    appLogger.silly(message, { filename: this.filename });
  }

  log(level, message) {
    appLogger.log(level, message, { filename: this.filename });
  }
}

export default Logger;
