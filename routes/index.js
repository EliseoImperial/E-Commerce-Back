const express = require("express");
const apiRoutes = express.Router();
const userRoutes = require("./usersRoutes");
const publicRoutes = require("./publicRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");

apiRoutes.use(publicRoutes);
apiRoutes.use("/orders", orderRoutes);
apiRoutes.use("/products", productRoutes);
apiRoutes.use("/users", userRoutes);


module.exports = (app) => {
  app.use("/api", apiRoutes);
};
