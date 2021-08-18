const express = require("express");
const productsRoutes = express.Router();
const productController = require("../controllers/productControllers");
const checkJwt = require("express-jwt");

productsRoutes.get("/products", productController.index);
productsRoutes.get("/products/:slug", productController.show);
productsRoutes.post("/products", productController.store);

productsRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

productsRoutes.patch("/products", productController.update);
productsRoutes.delete("/products", productController.destroy);

module.exports = productsRoutes;
