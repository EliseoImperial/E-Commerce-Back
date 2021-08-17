const express = require("express");
const apiRoutes = express.Router();
const userRoutes = require("./usersRoutes");
const publicRoutes = require("./publicRoutes");

apiRoutes.use(userRoutes);
apiRoutes.use(publicRoutes);

module.exports = (app) => {
  app.use("/api", apiRoutes);
};
