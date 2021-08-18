const express = require("express");
const apiRoutes = express.Router();
const userRoutes = require("./usersRoutes");
const publicRoutes = require("./publicRoutes");
const productsRoutes = require("./productsRoutes");

apiRoutes.use(publicRoutes);
apiRoutes.use(productsRoutes);
apiRoutes.use(userRoutes);

module.exports = (app) => {
  app.use("/api", apiRoutes);
};
