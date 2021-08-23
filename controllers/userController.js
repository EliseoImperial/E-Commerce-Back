const { User, Token } = require("../models");
const { Op } = require("sequelize");
const { validUser, filterUserProps } = require("../utils/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function index(req, res) {
  const users = await User.findAll();
  if (!users) res.status(408).json({ error: "Server on maintenance" });
  res.json(users);
}

async function token(req, res) {
  console.log("entre al token");
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user && (await user.validPassword(req.body.password))) {
    const userToken = await Token.findOne({
      where: {
        userId: user.id,
      },
    });
    console.log(user);
    console.log(userToken);
    res.json({ user: user.email, token: userToken.token });
  } else {
    res.status(400).json({ error: "User do not exist or bad request." });
  }
}

async function show(req, res) {
  const user = await User.findOne({ where: { email: req.params.email } });
  if (!user) return res.json("User not found.");
  return res.json(user);
}

async function store(req, res) {
  if (!validUser(req.body))
    return res.status(422).json({ error: "Error en algun campo." });
  req.body.roleId = 1;
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: req.body,
  });
  const token = await Token.create({
    userId: user.id,
    token: jwt.sign({ sub: user.id }, process.env.TOKEN_SECRET),
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

module.exports = { index, store, update, destroy, token, show };
