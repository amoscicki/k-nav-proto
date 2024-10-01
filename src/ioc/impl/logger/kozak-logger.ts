import "reflect-metadata";
import { injectable } from "inversify";
import { ILoggerService, LogLevel } from "@/ioc/core/logger";

const LOG_LEVEL = (process.env.NEXT_PUBLIC_LOG_LEVEL?.toUpperCase() ||
  "INFO") as LogLevel;

@injectable()
export class kozakLogger implements ILoggerService {
  log(...args: any[]) {
    const levels: LogLevel[] = ["DEBUG", "INFO", "WARN", "ERROR"];
    const [first, ...rest] = args;
    let level: LogLevel = "DEBUG";
    let message = args;

    if (typeof first === "string" && levels.includes(first as LogLevel)) {
      level = first as LogLevel;
      message = rest;
    }

    const isDebugMode = LOG_LEVEL === "DEBUG";
    const shouldLog =
      isDebugMode || levels.indexOf(level) >= levels.indexOf(LOG_LEVEL);
    const isExplicitDebug = level === "DEBUG" && first === "DEBUG";

    if (isDebugMode || shouldLog || isExplicitDebug) {
      let logMessage = [
        `[${level}] ${new Date().toISOString()}]: `,
        ...message,
      ];

      switch (level) {
        case "INFO":
          console.info(...logMessage);
          break;
        case "WARN":
          console.warn(...logMessage);
          break;
        case "ERROR":
          console.error(...logMessage);
          break;
        case "DEBUG":
          console.log(...logMessage);
          break;
        default:
          if (isDebugMode) {
            console.log(...logMessage);
          }
          break;
      }
    }
  }
}
