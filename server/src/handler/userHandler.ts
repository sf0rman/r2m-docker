import { z } from "zod";
import { RequestHandler } from "express";
import { Collection, getClient } from "../repository/mongo.js";
import {
  AlreadyExistsError,
  ForbiddenError,
  NotFoundError,
  err,
} from "../middleware/errorHandler.js";
import { ObjectId } from "mongodb";

const UserDto = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();
type UserDto = z.infer<typeof UserDto>;

class UserAlreadyExistsError extends AlreadyExistsError {}
class UserAuthError extends ForbiddenError {}
class UserNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message, "");
  }
}

const client = getClient(Collection.USER);

export const getSelf: RequestHandler<never> = err(async (req, res, next) => {
  const result = await client.findOne({
    _id: new ObjectId(req.cookies["demo-session-cookie"]),
  });
  if (!result) {
    throw new UserNotFoundError("Cannot get data for user");
  }

  // Strip id and password. Should never be returned in response
  const { _id, password, ...user } = result;

  res.send(user);
});

export const register: RequestHandler<UserDto> = err(async (req, res, next) => {
  const body = UserDto.parse(req.body);
  const result = await client.findOne({ username: body.username });
  if (result) {
    throw new UserAlreadyExistsError("User already exists", req.body.username);
  }

  client.insertOne(body);
  res.status(201).send({ message: "User created successfully" });
});

export const login: RequestHandler<UserDto> = err(async (req, res, next) => {
  const body = UserDto.parse(req.body);

  const result = await client.findOne(body);
  if (result) {
    // Insecure, just for demo purposes
    res
      .cookie("demo-session-cookie", result._id.toString())
      .send({ message: "Success" });
  } else {
    throw new UserAuthError("Username and password don't match", body.username);
  }
});

export const logout: RequestHandler<never> = err((req, res, next) => {
  res.clearCookie("demo-session-cookie").send({ message: "Success" });
});
