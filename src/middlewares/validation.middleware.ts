import { RequestHandler } from "#types/request-handler.type";
import { badRequest } from "@hapi/boom";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

type ValidationHandler = <T>(dataType: ClassConstructor<T>) => RequestHandler;

export const validation: ValidationHandler = (dataType) => (req, res, next) => {
  const data = plainToInstance(dataType, req.body || {});

  validate(data as Record<string, unknown>).then((errors) => {
    if (errors.length > 0) {
      const errorMessage = generateErrorMessage(errors);
      next(badRequest(errorMessage));
      return;
    }

    next();
  });
};

const generateErrorMessage = (errors: ValidationError[], constraints: string[] = []): string => {
  for (const error of errors) {
    if (error.constraints) {
      constraints.push(...Object.values(error.constraints));
    }

    if (error.children?.length) {
      generateErrorMessage(error.children, constraints);
    }
  }

  return JSON.stringify(constraints);
};
