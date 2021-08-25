const express = require("express");
const privateRoutes = express.Router();
const dbInitialSetup = require("../dbInitialSetup");
const checkJwt = require("express-jwt");
const isAdmin = require("../middlewares/isAdmin");

privateRoutes.use(
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

privateRoutes.use(isAdmin);

privateRoutes.patch("/db", async (req, res) => {
  dbInitialSetup(); // Crea tablas e inserta datos de prueba.
  res.json("[DB] Database will restart");
});

module.exports = privateRoutes;
