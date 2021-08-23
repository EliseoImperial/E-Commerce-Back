const express = require("express");
const usersRoutes = express.Router();
const userController = require("../controllers/userController");
const checkJwt = require("express-jwt");

usersRoutes.post("/token", userController.token);
usersRoutes.post("/", userController.store);

usersRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

usersRoutes.get("/", userController.index);
usersRoutes.get("/:email", userController.show);
usersRoutes.patch("/", userController.update);
usersRoutes.delete("/", userController.destroy);

module.exports = usersRoutes;
