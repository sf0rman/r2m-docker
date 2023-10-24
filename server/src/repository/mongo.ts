import { MongoClient } from "mongodb";
import { cfg } from "../../config.js";

export const Collection = {
  USER: "user",
  TODO: "todo",
} as const;
export type Collection = (typeof Collection)[keyof typeof Collection];

const uri = `mongodb://${cfg.DB_USER}:${cfg.DB_PASS}@${cfg.DB_URL}:${cfg.DB_PORT}`;
const client = new MongoClient(uri);
const db = client.db(cfg.DB_NAME);

export const getClient = (collection: Collection) => db.collection(collection);
