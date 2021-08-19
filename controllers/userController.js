const { User, Token } = require("../models");
const { Op } = require("sequelize");
const { validUser, filterUserProps } = require("../utils/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function index(req, res) {
  res.json("[index] We are working...");
}

async function login(req, res) {
  const salts = 10;
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user && (await user.validPassword(req.body.password))) {
    res.json("si");
  } else {
    res.json("no");
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
  const token = await Token.create({
    userId: user.id,
    token: jwt.sign({ sub: user.id }, process.env.TOKEN_KEY),
  });
  if (!created) return res.status(406).json({ error: "User already exists" });
  const newUser = { ...filterUserProps(user), token: token };
  res.json(newUser);
}

function update(req, res) {
  res.json("[update] We are working...");
}

function destroy(req, res) {
  res.json("[destroy] We are working...");
}

module.exports = { index, store, update, destroy, login, show };
