const express = require("express");
const productsRoutes = express.Router();
const productController = require("../controllers/productControllers");
const checkJwt = require("express-jwt");

productsRoutes.get("/", productController.index);
productsRoutes.get("/:slug", productController.show);
productsRoutes.post("/", productController.store);

productsRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

productsRoutes.patch("/", productController.update);
productsRoutes.delete("/", productController.destroy);

module.exports = productsRoutes;
