const faker = require("faker");
const { User } = require("../models");
const { usersSize } = require("../config/seeders");
const bcrypt = require("bcryptjs");
const salts = 10;

faker.locale = "en";

module.exports = async () => {
  const user = [];
  const password = await bcrypt.hash("root", salts);

  for (let i = 0; i < usersSize; i++) {
    user.push({
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      password,
    });
  }

  await User.bulkCreate(user);
  console.log("[Database] Se corrió el seeder de User.");
};
