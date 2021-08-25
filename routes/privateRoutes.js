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
  try {
    await dbInitialSetup(); // Crea tablas e inserta datos de prueba.
    res.json("[DB] Database has reset.");
  } catch (error) {
    res.status(408).json("[DB] Database could not be reset.");
  }
});

module.exports = privateRoutes;
