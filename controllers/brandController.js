const { Brand, Product } = require("../models");

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
  const { name } = req.body;
  if (!name || !req.body.logo || !req.body.description) {
    res.status(406).json("All fields are required");
  } else {
    const [brand, created] = await Brand.findOrCreate({
      where: { name },
      defaults: req.body,
    });
    if (!created) {
      res.status(409).json("Brand already exist.");
    } else {
      res.json(brand);
    }
  }
}

async function update(req, res) {
  const brand = await Brand.findByPk(req.params.id);
  const { name, description, logo } = req.body;

  if (!brand) return res.status(404).json("Brand does not exist");

  if (name) brand.name = name;
  if (description) brand.description = description;
  if (logo) brand.logo = logo;
  await brand.save();
  res.json(brand);
}

async function destroy(req, res) {
  const product = await Product.findOne({ where: { brandId: req.params.id } });
  console.log(req.params.id, product);

  if (product)
    return res
      .status(406)
      .json("Brand have at least one product, not can deleted");

  const brandDeleted = await Brand.destroy({
    where: { id: req.params.id },
  });

  if (brandDeleted) return res.json(brandDeleted);

  return res.status(404).json("Brand not funded");
}

module.exports = { index, show, store, update, destroy };
