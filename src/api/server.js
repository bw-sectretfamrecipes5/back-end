const express = require("express");
const cors = require("cors");

// const usersRouter = require(''); // @TODO: Add route base on app
const authenticator = require("./authenticator");
const registerRouter = require("../users/register-router");
const loginRouter = require("../users/login-router");

//recipes
const recipesRouter = require("../recipes/recipe-router");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("/api/recipe", authenticator, recipesRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
