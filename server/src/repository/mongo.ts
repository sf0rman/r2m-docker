import { MongoClient } from "mongodb";
import { cfg } from "../../config.js";

const uri = `mongodb://${cfg.DB_USER}:${cfg.DB_PASS}@${cfg.DB_URL}:${cfg.DB_PORT}`;
const client = new MongoClient(uri);
const db = client.db(cfg.DB_NAME);

export const getClient = (collection: string) => db.collection(collection);
