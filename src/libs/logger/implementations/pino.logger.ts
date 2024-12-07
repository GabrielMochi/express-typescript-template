import type { Logger } from "../logger.interface";
import pino from "pino";
import { isNullOrUndefined } from "@utils/is-null-or-undefined.util";
import { isStringOrNumber } from "@utils/is-string-or-number.util";

export class PinoLogger implements Logger {
  public static pinoInstance = pino({ transport: { target: "pino-pretty" } });

  private getConcatArgs(args: unknown[]): (string | number)[] {
    return args.filter((arg) => isStringOrNumber(arg));
  }

  private buildChildLogger(args: unknown[]): pino.Logger | undefined {
    const { pinoInstance } = PinoLogger;

    const child = args.reduce<pino.Logger | undefined>((prevChild, arg) => {
      if (isNullOrUndefined(arg) || isStringOrNumber(arg)) return prevChild;
      if (prevChild === undefined) return pinoInstance.child(arg as Record<string, unknown>);

      return prevChild.child(arg as Record<string, unknown>);
    }, undefined);

    return child;
  }

  private log(
    method: keyof Pick<pino.Logger, "info" | "error" | "warn">,
    message: unknown,
    args: unknown[],
  ): void {
    const { pinoInstance } = PinoLogger;

    if (!Array.isArray(args)) return pinoInstance[method](message);

    const concatArgs = this.getConcatArgs(args);
    const childLogger = this.buildChildLogger(args);

    if (!childLogger) {
      if (typeof message === "string") return pinoInstance[method](message, ...concatArgs);
      return pinoInstance[method](message);
    }

    if (typeof message === "string") return childLogger[method](message, ...concatArgs);
    childLogger[method](message);
  }

  info(message: unknown, ...args: unknown[]): void {
    this.log("info", message, args);
  }

  error(message: unknown, ...args: unknown[]): void {
    this.log("error", message, args);
  }

  warn(message: unknown, ...args: unknown[]): void {
    this.log("warn", message, args);
  }
}
