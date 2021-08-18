const faker = require("faker");
const { User } = require("../models");
const { usersSize } = require("../config/seeders");
const bcrypt = require("bcryptjs");
const salts = 10;

faker.locale = "en";

module.exports = async () => {
  const products = [];
  const password = await bcrypt.hash("root", salts);

  products.push(
    {
      name: "Tesla M3",
      slug: "Tesla-M3",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/Tesla-M3.jpeg",
      price: "100000000000",
      description:
        "Es eléctrico, eléctricoooo que mas podrías pedir, se lo vendemos. Auto muy muy caro? Se dice: Inversión a futuro, y eléctrico.",
    },
    {
      name: "Tesla M3",
      slug: "Tesla-M3",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/Tesla-M3.jpeg",
      price: "100000000000",
      description:
        "Hace brum, brum y brum... Potencias: v8,v6, voy y compro. Incluye: Atrae mujeres, hombres y otros.",
    },
  );

  await User.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Productos.");
};
