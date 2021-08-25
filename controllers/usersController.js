const { User, Token, Order, Role } = require("../models");
const { validUser, filterUserProps } = require("../utils/user");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

async function index(req, res) {
  const users = await User.findAll();
  if (!users) res.status(408).json({ error: "Server on maintenance" });
  const filterUsers = users.map((user) => {
    delete user.dataValues.password;
    return user;
  });
  res.json(filterUsers);
}

async function token(req, res) {
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
    res.json({ user: user.email, token: userToken.token });
  } else {
    res.status(400).json({ error: "User do not exist or bad request." });
  }
}

async function show(req, res) {
  const user = await User.findByPk(req.user.sub);
  if (!user) return res.json("User not found.");
  const role = await Role.findOne({ where: { id: user.roleId } });
  const { firstname, lastname, email, address, telephone } = user;
  res.json({ firstname, lastname, email, address, telephone, role: role.name });
}

async function showById(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.json("User not found.");
  const filterUser = { ...user }.dataValues;
  delete filterUser.password;
  res.json(filterUser);
}

async function store(req, res) {
  if (!validUser(req.body))
    return res.status(422).json({ error: "Error en algun campo." });
  req.body.roleId = 2;
  const [user, created] = await User.findOrCreate({
    where: { [Op.and]: [{ email: req.body.email }, { roleId: 2 }] },
    defaults: req.body,
  });
  if (!created) return res.status(406).json({ error: "User already exists" });
  const token = await Token.create({
    userId: user.id,
    token: jwt.sign(
      { sub: user.id, roleId: user.roleId },
      process.env.TOKEN_SECRET
    ),
  });
  const newUser = { ...filterUserProps(user), token: token };
  res.json(newUser);
}

async function update(req, res) {
  const user = await update_lazy(req.user.sub, req.body);
  if (!user) return res.status(404).json("User not finded");
  res.json(user);
}

async function updateById(req, res) {
  const user = await update_lazy(req.params.id, req.body, true);
  if (!user) return res.status(404).json("User not finded");
  res.json(user);
}

async function update_lazy(id, body, admin = false) {
  const user = await User.findByPk(id);
  const { firstname, lastname, email, address, telephone, roleId, password } =
    body;
  if (!user) return null;
  if (user.roleId === 1 || user.roleId === 3) return null;
  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname = lastname;
  if (email) {
    const isEmail = await User.findOne({ where: { email } });
    if (!isEmail) user.email = email;
  }
  if (address) user.address = address;
  if (telephone) user.telephone = telephone;
  if (password) user.password = user.hash(password);
  if (admin && roleId) user.roleId = roleId;
  await user.save();
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    address: user.address,
    telephone: user.telephone,
  };
}

async function destroy(req, res) {
  const user = await destroy_aux(req.user.sub);
  if (!user) return res.status(404).json("User not found");
  res.json(user);
}

async function destroyById(req, res) {
  const user = await destroy_aux(req.params.id);
  if (!user) return res.status(404).json("User not found");
  res.json(user);
}

async function destroy_aux(id) {
  const user = await User.findByPk(id);
  if (!user) return null;
  const orders = await Order.findOne({ where: { userId: id } });
  if (!orders) {
    await User.destroy({ where: { id } });
  } else {
    await User.update({ roleId: 3 }, { where: { id } });
  }
  const { firstname, lastname, email, address, telephone } = user;
  return { firstname, lastname, email, address, telephone };
}

module.exports = {
  index,
  show,
  showById,
  store,
  update,
  updateById,
  destroy,
  destroyById,
  token,
};
