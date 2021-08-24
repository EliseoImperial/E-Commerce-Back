const express = require("express");
const orderRoutes = express.Router();
const orderController = require("../controllers/orderControllers");
const checkJwt = require("express-jwt");
const isAdmin = require("../middlewares/isAdmin");

orderRoutes.get("/:id", orderController.show);
orderRoutes.post("/", orderController.store);

orderRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

orderRoutes.use(isAdmin);

orderRoutes.get("/", orderController.index);
orderRoutes.patch("/", orderController.update);
orderRoutes.delete("/", orderController.destroy);

module.exports = orderRoutes;
