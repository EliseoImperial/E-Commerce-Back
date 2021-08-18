const express = require("express");
const usersRoutes = express.Router();
const userController = require("../controllers/userController");
const checkJwt = require("express-jwt");

usersRoutes.post("/users", userController.store);

usersRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

usersRoutes.get("/users", userController.index);
usersRoutes.patch("/users", userController.update);
usersRoutes.delete("/users", userController.destroy);

module.exports = usersRoutes;
