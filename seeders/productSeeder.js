const { User, Product } = require("../models");
const teslaSeeder = require("./teslaSeeder");
const ferrariSeeder = require("./ferrariSeeder");
const lamborghiniSeeder = require("./lamborghiniSeeder");

module.exports = async () => {
  const products = [];

  products.push(
    {
      name: "Tesla M3",
      slug: "Tesla-M3",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/Tesla-M3.jpeg",
      price: 48490,
      description:
        "Es eléctrico, eléctricoooo. Barato? Se dice: Inversión a futuro, y eléctrico.",
      brandId: 1,
    },
    {
      name: "Ferrari 296 GTB",
      slug: "Ferrari-296-GTB",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/Ferrari-296GTB.jpeg",
      price: 321400,
      description:
        "Hace brum, brum y brum... Potencia: muy muy potente. Atrae mujeres, hombres y otros.",
      brandId: 2,
    },
    {
      name: "Lamborghini Aventador",
      slug: "Lamborghini-Aventador",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/Lambo-Aventador.webp",
      price: 517826,
      description: "Luxury I love It C:",
      brandId: 3,
    }
  ),
    {
      name: "Ferrari Monza",
      slug: "Tesla-M3",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/Tesla-M3.jpeg",
      price: 48490,
      description:
        "The 2018 Ferrari Monza SP1 was designed for the driver who doesn't want to take any passenger along the road. The one-seater vehicle was built mostly for collectors. The car was inspired by the 1955 Ferrari 750 with one seat and track-days in mind",
      brandId: 2,
    },
    await Product.bulkCreate(products);
  const products = [...teslaSeeder, ...ferrariSeeder, ...lamborghiniSeeder];
  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Productos.");
};
