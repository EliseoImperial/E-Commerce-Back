const express = require("express");
const publicRouter = express.Router();

publicRouter.get("/public", (req, res) => res.json("Hola C:"));

module.exports = publicRouter;
