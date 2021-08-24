const express = require("express");
const usersRoutes = express.Router();
const userController = require("../controllers/usersController");
const checkJwt = require("express-jwt");

usersRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

// User
usersRoutes.get("/", userController.show);
usersRoutes.patch("/", userController.update);
usersRoutes.delete("/", userController.destroy);

module.exports = usersRoutes;
