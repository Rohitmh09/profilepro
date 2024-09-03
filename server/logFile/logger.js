import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Define the log file path
const logDirectory = path.join(path.resolve(), 'logs');
const logFilePath = path.join(logDirectory, 'application.log');


if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: logFilePath,
    }),
  ],
});

export default logger;
