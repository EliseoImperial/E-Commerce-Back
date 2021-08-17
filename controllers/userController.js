const { User, Article, Token } = require("../models");

function index(req, res) {
  res.json("[index] We are working...");
}

function store(req, res) {
  res.json("[store] We are working...");
}

function update(req, res) {
  res.json("[update] We are working...");
}

function destroy(req, res) {
  res.json("[destroy] We are working...");
}

module.exports = { index, store, update, destroy };
