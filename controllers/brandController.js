const { Brand } = require("../models");

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

async function index(req, res) {
  const brands = await Brand.findAll();
  if (!brands) return res.status(404).json({ error: "Brands not found" });
  res.json(brands);
}

async function show(req, res) {
  const brand = await Brand.findOne({
    where: { name: capitalize(req.params.brand) },
  });
  if (!brand) return res.status(404).json({ error: "Brand not found" });
  res.json(brand);
}

async function store(req, res) {
  res.json("[update] We are working...");
}

function update(req, res) {
  res.json("[update] We are working...");
}

function destroy(req, res) {
  res.json("[destroy] We are working...");
}

module.exports = { index, show, store, update, destroy };
