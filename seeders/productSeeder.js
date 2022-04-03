const { User, Product } = require("../models");
const teslaSeeder = require("./teslaSeeder");
const ferrariSeeder = require("./ferrariSeeder");
const lamborghiniSeeder = require("./lamborghiniSeeder");

module.exports = async () => {
  const products = [...teslaSeeder, ...ferrariSeeder, ...lamborghiniSeeder];
  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Productos.");
};
