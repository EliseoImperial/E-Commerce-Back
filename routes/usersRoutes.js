const express = require("express");
const usersRoutes = express.Router();
const userController = require("../controllers/usersController");
const checkJwt = require("express-jwt");
const isAdmin = require("../middlewares/isAdmin");

usersRoutes.post("/token", userController.token);
usersRoutes.post("/", userController.store);

usersRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

usersRoutes.use(isAdmin);

usersRoutes.get("/", userController.index);
usersRoutes.get("/:id", userController.showById);
usersRoutes.patch("/:id", userController.updateById);
usersRoutes.delete("/:id", userController.destroyById);

module.exports = usersRoutes;
