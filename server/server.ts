import express, { json } from "express";
import { useRouter } from "./src/routes/useRouter.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const server = express();

server.use(json());
useRouter(server);
server.use(errorHandler);

server.listen(8080, () => {
  console.log(`Server listening on http://localhost:${8080}`);
});
