const express = require("express");
const apiRoutes = express.Router();
const userRoutes = require("./userRoutes");
const usersRoutes = require("./usersRoutes");
const publicRoutes = require("./publicRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const privateRoutes = require("./privateRoutes");
const brandRoutes = require("./brandRoutes");

apiRoutes.use("/brands", brandRoutes);
apiRoutes.use(publicRoutes);
apiRoutes.use("/orders", orderRoutes);
apiRoutes.use("/user", userRoutes);
apiRoutes.use("/users", usersRoutes);
apiRoutes.use(privateRoutes);

module.exports = (app) => {
  app.use("/api", apiRoutes);
};
