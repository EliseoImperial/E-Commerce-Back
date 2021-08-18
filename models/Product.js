module.exports = (sequelize, Model, DataTypes) => {
  class Product extends Model {}

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      slug: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "product",
    }
  );

  Product.beforeCreate(() => {
    /*const sendMail = require("../utils/mail");
    sendMail(title, content);*/
  });

  return Product;
};
