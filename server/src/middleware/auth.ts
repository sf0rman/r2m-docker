import { RequestHandler } from "express";
import { AuthenticationError, err } from "./errorHandler.js";
import { Collection, getClient } from "../repository/mongo.js";
import { ObjectId } from "mongodb";

const mongoClient = getClient(Collection.USER);

export const authHandler: RequestHandler = err(async (req, res, next) => {
  const cookie = req.cookies["demo-session-cookie"];

  // This is not secure - assuming we know userId anyone can add cookie
  const user = await mongoClient.findOne({ _id: new ObjectId(cookie) });
  if (!user) {
    throw new AuthenticationError("Forbidden");
  }

  next();
});
