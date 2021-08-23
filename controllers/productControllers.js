const { Product, Brand } = require("../models");
const { Op } = require("sequelize");

async function index(req, res) {
  const products = await Product.findAll({ include: Brand });
  if (!products) return res.status(404).json({ error: "Products not found" });
  res.json(products);
}

async function show(req, res) {
  const product = await Product.findOne({ where: { slug: req.params.slug }, include: Brand });
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
}

async function store(req, res) {
  const { name } = req.body;
  const [product, created] = await Product.findOrCreate({
    where: {
      [Op.or]: [{ name }, { slug: name }],
    },
    defaults: req.body,
  });
  res.json(product);
}

function update(req, res) {
  res.json("[update] We are working...");
}

function destroy(req, res) {
  res.json("[destroy] We are working...");
}

module.exports = { index, show, store, update, destroy };
