const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  }
);

const User = require("./User")(sequelize, Model, DataTypes);
const Article = require("./Article")(sequelize, Model, DataTypes);
const Token = require("./Token")(sequelize, Model, DataTypes);

/// Acomodar, el usuario tiene muchos articulos y viceversa
User.hasMany(Article);
Article.belongsTo(User);
User.hasMany(Token);
Token.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Article,
  Token,
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
