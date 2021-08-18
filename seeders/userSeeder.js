const faker = require("faker");
const { User } = require("../models");
const { usersSize } = require("../config/seeders");

faker.locale = "en";

module.exports = async () => {
  const user = [];

  for (let i = 0; i < usersSize; i++) {
    user.push({
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      password: "root",
    });
  }

  await User.bulkCreate(user);
  console.log("[Database] Se corrió el seeder de User.");
};
