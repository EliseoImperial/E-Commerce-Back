/*const faker = require("faker");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "en";

module.exports = async () => {
  const role = 1;
  const user = [];

  for (let i = 0; i < 10; i++) {
    const password = await bcrypt.hash(faker.internet.password(), 10);
    user.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: password,
      roleId: role,
    });
  }

  await User.bulkCreate(user);
  console.log("[Database] Se corrió el seeder de User.");
};*/