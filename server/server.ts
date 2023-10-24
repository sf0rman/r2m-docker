import express, { json, urlencoded } from "express";
import { useRouter } from "./src/routes/useRouter.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import cookieParser from "cookie-parser";

const server = express();

server.use(json());
server.use(urlencoded({ extended: true }));
server.use(cookieParser());
useRouter(server);
server.use(errorHandler);

server.listen(8080, () => {
  console.log(`Server listening on http://localhost:${8080}`);
});
