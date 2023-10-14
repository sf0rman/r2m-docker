import { z } from "zod";
import { RequestHandler } from "express";
import { getClient } from "../repository/mongo.js";
import { AlreadyExistsError } from "../middleware/errorHandler.js";

const UserDto = z.object({
  username: z.string(),
  password: z.string(),
});
type UserDto = z.infer<typeof UserDto>;

class UserAlreadyExistsError extends AlreadyExistsError {}

const client = getClient("user");

export const register: RequestHandler<UserDto> = async (req, res, next) => {
  const result = await client.find(req.body);
  if (result) {
    throw new UserAlreadyExistsError("User already exists", req.body.username);
  }
  res.json(req.body);
};
export const login: RequestHandler = (req, res, next) => {
  res.send("logged in");
};
export const logout: RequestHandler = (req, res, next) => {
  res.send("logged out");
};
