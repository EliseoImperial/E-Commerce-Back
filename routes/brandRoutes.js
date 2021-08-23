const express = require("express");
const brandRoutes = express.Router();
const brandController = require("../controllers/brandController");

brandRoutes.get("/", brandController.index);
brandRoutes.get("/:brand", brandController.show);
brandRoutes.post("/", brandController.store);
brandRoutes.patch("/", brandController.update);
brandRoutes.delete("/", brandController.destroy);

module.exports = brandRoutes;