import { injectable } from "inversify";

interface LogFunction {
  (...args: any[]): void;
  (level: LogLevel, ...args: any[]): void;
}

export interface ILoggerService {
  log: LogFunction;
}

export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

@injectable()
export class defaultLoggerService implements ILoggerService {
  log(level: LogLevel, ...args: any[]) {
    const logMessage = [`[${level}] ${new Date().toISOString()}]: `, ...args];
    switch (level) {
      case "DEBUG":
        console.debug(...logMessage);
        break;
      case "INFO":
        console.info(...logMessage);
        break;
      case "WARN":
        console.warn(...logMessage);
        break;
      case "ERROR":
        console.error(...logMessage);
        break;
      default:
        console.log(...logMessage);
        break;
    }
  }
}
