const { User, Product } = require("../models");

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
    },
    {
      name: "Ferrari 296 GTB",
      slug: "Ferrari-296-GTB",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/Ferrari-296GTB.jpeg",
      price: 321400,
      description:
        "Hace brum, brum y brum... Potencia: muy muy potente. Atrae mujeres, hombres y otros.",
    },
    {
      name: "Lamborghini Aventador",
      slug: "Lamborghini-Aventador",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/Lambo-Aventador.webp",
      price: 517826,
      description: "Luxury I love It C:",
    }
  );

  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Productos.");
};
