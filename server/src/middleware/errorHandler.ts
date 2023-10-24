import { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

class ApiError extends Error {
  context: string | undefined;
  statusCode = 500;
}

export class ForbiddenError extends ApiError {
  statusCode = 401;
  constructor(message: string, context: string) {
    super(message);
    this.context = context;
  }
}

export class AlreadyExistsError extends ApiError {
  statusCode = 409;
  constructor(message: string, context: string) {
    super(message);
    this.context = context;
  }
}

export class NotFoundError extends ApiError {
  statusCode = 404;
  constructor(message: string, context: string) {
    super(message);
    this.context = context;
  }
}

export class AuthenticationError extends ApiError {
  statusCode = 401;
}

export const err =
  <Fn extends RequestHandler>(fn: Fn): RequestHandler =>
  async (req, res, next): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error", err.message);
  if (err instanceof ApiError) {
    res
      .status(err.statusCode)
      .send({ error: err.message, context: err.context ?? undefined });
  } else if (err instanceof ZodError) {
    const resposne = err.issues.map((issue) => ({
      field: issue.path.join("."),
      issue: issue.message,
    }));
    res.status(400).send({ error: "Bad Request", context: resposne });
  } else {
    res.status(500).send("Internal Server Error");
  }
};
