const express = require("express");
const orderRoutes = express.Router();
const orderController = require("../controllers/orderControllers");
const checkJwt = require("express-jwt");
const isAdmin = require("../middlewares/isAdmin");

orderRoutes.post("/", orderController.store);

orderRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

orderRoutes.get("/user", orderController.userOrders);
orderRoutes.get("/", orderController.index);
orderRoutes.get("/:id", orderController.show);


orderRoutes.use(isAdmin);
orderRoutes.patch("/", orderController.update);
orderRoutes.delete("/", orderController.destroy);

module.exports = orderRoutes;
