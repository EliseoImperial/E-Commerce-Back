const express = require("express");
const usersRoutes = express.Router();
const userController = require("../controllers/userController");

usersRoutes.get("/users", userController.index);
usersRoutes.post("/users", userController.store);
usersRoutes.patch("/users", userController.update);
usersRoutes.delete("/users", userController.destroy);

module.exports = usersRoutes;
