const express = require("express");
const brandRoutes = express.Router();
const brandController = require("../controllers/brandController");
const checkJwt = require("express-jwt");
const isAdmin = require("../middlewares/isAdmin");

brandRoutes.get("/", brandController.index);
brandRoutes.get("/:brand", brandController.show);

brandRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

brandRoutes.use(isAdmin);

brandRoutes.post("/", brandController.store);
brandRoutes.patch("/", brandController.update);
brandRoutes.delete("/", brandController.destroy);

module.exports = brandRoutes;
