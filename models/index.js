const { OctetStreamParser } = require("formidable");
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  // Correcto
  /*process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    dialectModule: require("pg"),
    logging: false, // Para que no aparezcan mensajes en consola.
  }*/

  // Hardcodeado MAL (me evito cambiar el .env)
  "db.tvpeysnqvloinxumeyiu.supabase.co",
  "postgres",
  "2OhW6joyt72DHk26",
  {
    host: "db.tvpeysnqvloinxumeyiu.supabase.co",
    dialect: "postgres",
    dialectModule: require("pg"),
    logging: false,
  }
);

const User = require("./User")(sequelize, Model, DataTypes);
const Product = require("./Product")(sequelize, Model, DataTypes);
const Brand = require("./Brand")(sequelize, Model, DataTypes);
const Token = require("./Token")(sequelize, Model, DataTypes);
const Order = require("./Order")(sequelize, Model, DataTypes);
const Role = require("./Role")(sequelize, Model, DataTypes);
const OrderProduct = require("./OrderProduct")(
  sequelize,
  Model,
  DataTypes,
  Order,
  Product,
  Brand
);

/// Acomodar, el usuario tiene muchos articulos y viceversa
Role.hasMany(User);
User.belongsTo(Role);
User.hasMany(Token);
Token.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
Brand.hasMany(Product);
Product.belongsTo(Brand);
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

module.exports = {
  sequelize,
  User,
  Product,
  Token,
  Order,
  Role,
  OrderProduct,
  Brand,
};

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log(
      "[Sequalize][DB] Connection has been established successfully."
    );
  } catch (error) {
    console.error("[Sequalize][DB] Unable to connect to the database:", error);
  }
}
testDB();
