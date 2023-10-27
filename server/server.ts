import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { useRouter } from "./src/routes/useRouter.js";
import { cfg } from "./config.js";

const server = express();

// Add headers before the routes are defined
// server.options("http://localhost:5173", cors());
server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(cookieParser());
useRouter(server);
server.use(errorHandler);

server.listen(cfg.APP_PORT, () => {
  console.log(`Server listening on http://localhost:${cfg.APP_PORT}`);
});
