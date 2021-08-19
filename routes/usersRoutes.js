const express = require("express");
const usersRoutes = express.Router();
const userController = require("../controllers/userController");
const checkJwt = require("express-jwt");

usersRoutes.post("/", userController.store);
usersRoutes.get("/", userController.login);

usersRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

usersRoutes.patch("/", userController.update);
usersRoutes.delete("/", userController.destroy);

module.exports = usersRoutes;
