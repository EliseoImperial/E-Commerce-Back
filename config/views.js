const express = require("express");
var cors = require("cors");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
};
