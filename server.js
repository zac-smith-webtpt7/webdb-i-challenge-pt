const express = require("express");

const accountsRouter = require("./accounts/accountsRouter.js");
const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountsRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    message: `Hello from / using NodeJS`
  });
});

module.exports = server;
