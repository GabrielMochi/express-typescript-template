import { Boom, internal } from "@hapi/boom";
import { RequestHandler } from "#types/request-handler.type";

const methods = {
  GET: 200,
  POST: 201,
  PUT: 200,
  PATCH: 200,
  DELETE: 204,
} as const satisfies Record<string, number>;

type Methods = keyof typeof methods;

type AsyncRequestHandler = (fn: RequestHandler) => RequestHandler;

export const asyncHandler: AsyncRequestHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .then((response) => {
      res.status(methods[req.method as Methods] || 200).json(response);
    })
    .catch((error) => {
      next((error as Boom).isBoom ? error : internal(error));
    });
};
