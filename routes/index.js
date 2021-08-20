const express = require("express");
const apiRoutes = express.Router();
const userRoutes = require("./usersRoutes");
const publicRoutes = require("./publicRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const privateRoutes = require("./privateRoutes");

apiRoutes.use(publicRoutes);
apiRoutes.use("/orders", orderRoutes);
apiRoutes.use("/products", productRoutes);
apiRoutes.use("/users", userRoutes);
apiRoutes.use(privateRoutes);

module.exports = (app) => {
  app.use("/api", apiRoutes);
};
