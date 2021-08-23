const express = require("express");
const usersRoutes = express.Router();
const userController = require("../controllers/userController");
const checkJwt = require("express-jwt");

usersRoutes.get("/token", userController.token);
usersRoutes.post("/", userController.store);

usersRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

// User
usersRoutes.get("/", userController.show);
usersRoutes.patch("/", userController.update);
usersRoutes.delete("/", userController.destroy);

// Admin
usersRoutes.get("/", userController.index);
usersRoutes.get("/:id", userController.showById);
usersRoutes.patch("/:id", userController.updateById);
usersRoutes.delete("/:id", userController.destroyById);

module.exports = usersRoutes;
