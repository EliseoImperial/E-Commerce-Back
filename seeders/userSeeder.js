const faker = require("faker");
const { User, Token } = require("../models");
const { usersSize } = require("../config/seeders");
const bcrypt = require("bcryptjs");
const salts = 10;
const jwt = require("jsonwebtoken");

faker.locale = "en";

module.exports = async () => {
  const users = [];
  const password = await bcrypt.hash("root", salts);

  for (let i = 0; i < usersSize; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      password,
      roleId: 2,
    });
  }

  users.push({
    firstname: "admin",
    lastname: "admin",
    email: "admin@admin.admin",
    address: "admin a d m i n admin",
    telephone: "adm ina dmi",
    password: await bcrypt.hash("admin", salts),
    roleId: 4,
  });

  await User.bulkCreate(users);

  for (let i = 0; i < users.length; i++) {
    const token = await Token.create({
      userId: i + 1,
      token: jwt.sign(
        { sub: i + 1, roleId: users[i].roleId },
        process.env.TOKEN_SECRET
      ),
    });
  }
  console.log("[Database] Se corrió el seeder de Usuario.");
};
