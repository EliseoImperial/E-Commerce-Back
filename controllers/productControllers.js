const { User, Product, Token } = require("../models");
const { Op } = require("sequelize");

function index(req, res) {
  res.json("[index] We are working...");
}

async function store(req, res) {
  const { name } = req.body;
  const [user, created] = await User.findOrCreate({
    where: {
      [Op.or]: [{ name }, { slug: name }],
    },
    defaults: req.body,
  });
  res.json(filterUserProps(user));
}

function update(req, res) {
  res.json("[update] We are working...");
}

function destroy(req, res) {
  res.json("[destroy] We are working...");
}

module.exports = { index, store, update, destroy };
