module.exports = (sequelize, Model, DataTypes) => {
  class Article extends Model {}

  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
      img: {
        type: DataTypes.STRING(200),
      },
    },
    {
      sequelize,
      modelName: "article",
    }
  );

  Article.beforeCreate(() => {
    /*const sendMail = require("../utils/mail");
    sendMail(title, content);*/
  });

  return Article;
};
