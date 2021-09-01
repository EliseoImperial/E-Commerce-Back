const { Brand } = require("../models");

module.exports = async () => {
  const brands = [];

  brands.push(
    {
      name: "Tesla",
      description:
        "Tesla, Inc. is an electric vehicle and clean energy company based in Palo Alto, California, United States. Tesla designs and manufactures electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services.",
    },
    {
      name: "Ferrari",
      description:
        "Ferrari S.p.A. is an Italian luxury sports car manufacturer based in Maranello, Italy. Founded by Enzo Ferrari in 1939 out of the Alfa Romeo race division as Auto Avio Costruzioni, the company built its first car in 1940, and produced its first Ferrari-badged car in 1947.",
    },
    {
      name: "Lamborghini",
      description:
        "Automobili Lamborghini S.p.A. is an Italian brand and manufacturer of luxury sports cars and SUVs based in Sant'Agata Bolognese. The company is owned by the Volkswagen Group through its subsidiary Audi.",
    }
  );

  await Brand.bulkCreate(brands);
  console.log("[Database] Se corrió el seeder de Brands.");
};
