type LogLevel = "INFO" | "ERROR" | "WARN" | "DEBUG";

export class Logger {
  private static format(level: LogLevel, message: string, data?: unknown) {
    const timestamp = new Date().toISOString();
    const base = `[${level}] [${timestamp}] ${message}`;
    return data ? `${base} | ${JSON.stringify(data)}` : base;
  }

  static info(message: string, data?: unknown) {
    console.info(this.format("INFO", message, data));
  }

  static error(message: string, error?: unknown) {
    console.error(this.format("ERROR", message, error));
  }

  static warn(message: string, data?: unknown) {
    console.warn(this.format("WARN", message, data));
  }

  static debug(message: string, data?: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(this.format("DEBUG", message, data));
    }
  }
}
