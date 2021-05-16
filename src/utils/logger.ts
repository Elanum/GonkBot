import {
  createLogger, format, Logger, transports,
} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { NODE_ENV } = process.env;
const { Console } = transports;
const {
  align, colorize, combine, printf, timestamp,
} = format;

const logger: Logger = createLogger();

const gonkFormat = combine(
  timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
  align(),
  printf((info) => `${[info.timestamp]} [${info.level}]: ${info.message}`),
);

logger.add(
  new Console({
    format: combine(colorize(), gonkFormat),
    level: 'debug',
  }),
);

if (NODE_ENV === 'production') {
  logger.add(
    new DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: 14,
      format: gonkFormat,
    }),
  );
}

export default logger;
