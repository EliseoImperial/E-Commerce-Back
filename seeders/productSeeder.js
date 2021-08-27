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
      name: "Ferrari SF90 Spider",
      slug: "Ferrari-SF90-Spider",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/sf90spider.jpg",
      price: 507300,
      description:
        "As the Prancing Horse’s first production plug-in hybrid spider, the SF90 Spider sets new performance and innovation benchmarks not only for the marque’s range, but for the entire sports car sector. The new convertible has the same extreme supercar specification and record-breaking performance as the SF90 Stradale yet also adds further driving pleasure and versatility to the mix, thanks to the latest iteration of Ferrari’s signature Retractable Hard Top architecture. This makes the SF90 Spider the ideal car for owners that demand the very pinnacle of Ferrari technology, but still want the thrill and versatility of open-top driving.",
      brandId: 2,
    },
    {
      name: "Ferrari 290 GBT",
      slug: "Ferrari-290-GBT",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/ferrari290gbt.jpg",
      price: 507300,
      description:
        "The 296 GTB, an evolution of Ferrari’s mid-rear-engined two-seater sports berlinetta concept, represents a revolution for the Maranello-based company as it introduces the new 120° V6 engine coupled with a plug-in (PHEV) electric motor capable of delivering up to 830 cv. The car thus redefines the idea of driving fun to provide pure excitement not only when pursuing maximum performance but also in everyday driving.",
      brandId: 2,
    },
    {
      name: "Ferrari Roma",
      slug: "Ferrari-Roma",
      image:
        "https://dhqdctvzoxoazqvdwpwj.supabase.in/storage/v1/object/public/public-bucket/assets/ferrari roma.jpg",
      price: 507300,
      description:
        "The F8 Spider’s greatest achievement is the fact that it unleashes its power instantaneously with zero turbo lag, whilst retaining this V8’s unique and very special soundtrack.",
      brandId: 2,
    },
    await Product.bulkCreate(products);
  const products = [...teslaSeeder, ...ferrariSeeder, ...lamborghiniSeeder];
  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Productos.");
};
