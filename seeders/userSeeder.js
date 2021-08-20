const faker = require("faker");
const { User } = require("../models");
const { usersSize } = require("../config/seeders");
const bcrypt = require("bcryptjs");
const salts = 10;

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
      roleId: 1,
    });
    users.push({
      firstname: "admin",
      lastname: "admin",
      email: "admin@admin.admin",
      address: "admin a d m i n admin",
      telephone: "adm ina dmi",
      password: "admin",
      roleId: 3,
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Usuario.");
};
