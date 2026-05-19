import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define level colors
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// Choose level based on environment
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

// Define format for files (JSON with timestamp and metadata)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Define format for console (Colorized, nice formatting)
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] [${info.level}]: ${info.message}${info.stack ? `\n${info.stack}` : ""}`
  )
);

// Define transports
const transports: winston.transport[] = [
  // Console Transport
  new winston.transports.Console({
    format: consoleFormat,
  }),
  
  // Daily Rotate File for errors
  new DailyRotateFile({
    filename: path.join("logs", "error-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "7d",
    level: "error",
    format: fileFormat,
  }),

  // Daily Rotate File for all combined logs
  new DailyRotateFile({
    filename: path.join("logs", "combined-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "7d",
    format: fileFormat,
  }),
];

// Create the logger instance
export const logger = winston.createLogger({
  level: level(),
  levels,
  transports,
});
