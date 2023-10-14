import express from "express";

const server = express();

server.listen(8080, () => {
  console.log(`Server listening on port ${8080}`);
});
