import { Provider } from "@interfaces/provider.interface";
import { PinoLogger } from "./implementations/pino.logger";
import type { Logger } from "./logger.interface";

export class LoggerProvider extends Provider<Logger>(new PinoLogger()) {}
