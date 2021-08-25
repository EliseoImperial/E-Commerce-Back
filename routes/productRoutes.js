const express = require("express");
const productsRoutes = express.Router();
const productController = require("../controllers/productControllers");
const checkJwt = require("express-jwt");
const isAdmin = require("../middlewares/isAdmin");

productsRoutes.get("/", productController.index);
productsRoutes.get("/:slug", productController.show);

productsRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

productsRoutes.use(isAdmin);

productsRoutes.get("/admin", productController.indexAdmin);
productsRoutes.get("/admin/:id", productController.showAdmin);
productsRoutes.post("/", productController.store);
productsRoutes.patch("/:id", productController.update);
productsRoutes.delete("/:id", productController.destroy);

module.exports = productsRoutes;
