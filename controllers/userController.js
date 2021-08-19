const { User } = require("../models");
const { Op } = require("sequelize");
const { validUser, filterUserProps } = require("../utils/user");

function index(req, res) {
  res.json("[index] We are working...");
}

async function show(req, res) {
  const user = await User.findOne({ where: { email: req.params.email } });
  if(!user) return res.json("User not found.");
  return res.json(user);
}

async function store(req, res) {
  if (!validUser(req.body))
    return res.status(422).json({ error: "Error en algun campo." });
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: req.body,
  });
  if (!created) return res.status(406).json({ error: "User exist" });
  res.json(filterUserProps(user));
}

function update(req, res) {
  res.json("[update] We are working...");
}

function destroy(req, res) {
  res.json("[destroy] We are working...");
}

module.exports = { index, show, store, update, destroy };
