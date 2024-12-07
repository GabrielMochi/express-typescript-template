import { Boom, internal } from "@hapi/boom";
import { LoggerProvider } from "@libs/logger";
import type { ErrorHandler } from "#types/error-handler.type";

const logger = LoggerProvider.getInstance();

export const errorHandler: ErrorHandler = (error, req, res, next) => {
  if (!error) return next();

  if ((error as Boom).isServer || (error as Boom).isServer === undefined) logger.error(error);

  if ((error as Boom).isBoom) {
    res.status((error as Boom).output.statusCode).json((error as Boom).output.payload);
    return;
  }

  const internalError = internal();
  res.status(internalError.output.statusCode).json(internalError.output.payload);
};
