// src/logger/winston.logger.ts
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const isProduction = process.env.NODE_ENV === 'production';

export const winstonLogger = WinstonModule.createLogger({
  level: isProduction ? 'info' : 'debug', // ✅ usa nivel estándar de Winston
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, context }) => {
      return `${timestamp} [${level.toUpperCase()}]${context ? ` [${context}]` : ''}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }), // ✅ colores en consola
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, context }) => {
          return `${timestamp} [${level}]${context ? ` [${context}]` : ''}: ${message}`;
        }),
      ),
    }),

    ...(isProduction
      ? [
          new winston.transports.DailyRotateFile({
            dirname: 'logs',
            filename: 'application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json()
            ),
          }),
        ]
      : []),
  ],
});
