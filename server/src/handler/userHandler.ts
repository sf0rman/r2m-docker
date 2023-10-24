import { z } from "zod";
import { RequestHandler } from "express";
import { Collection, getClient } from "../repository/mongo.js";
import {
  AlreadyExistsError,
  ForbiddenError,
  err,
} from "../middleware/errorHandler.js";

const UserDto = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();
type UserDto = z.infer<typeof UserDto>;

class UserAlreadyExistsError extends AlreadyExistsError {}
class UserNotFoundError extends ForbiddenError {}

const client = getClient(Collection.USER);

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
    throw new UserNotFoundError(
      "Username and password don't match",
      body.username
    );
  }
});

export const logout: RequestHandler<never> = err((req, res, next) => {
  res.clearCookie("demo-session-cookie").send({ message: "Success" });
});
