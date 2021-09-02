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
    firstname: "Admin",
    lastname: "Montevideo",
    email: "admin@uy.com",
    address: "Av. de las Leyes",
    telephone: "+598 33 565 656",
    password: await bcrypt.hash("root", salts),
    roleId: 4,
  });

  users.push({
    firstname: "User",
    lastname: "Montevideo",
    email: "user@uy.com",
    address: "Pl. Independencia",
    telephone: "+598 33 565 656",
    password: await bcrypt.hash("root", salts),
    roleId: 2,
  });

  await User.bulkCreate(users);

  for (let i = users.length - 1; i < users.length; i++) {
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
