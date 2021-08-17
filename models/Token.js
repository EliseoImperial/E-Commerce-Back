module.exports = (sequelize, Model, DataTypes) => {
  class Token extends Model {}

  Token.init(
    {
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "token",
    }
  );
  return Token;
};
