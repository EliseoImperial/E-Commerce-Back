module.exports = (sequelize, Model, DataTypes) => {
  class Brand extends Model {}

  Brand.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "brand",
    }
  );

  return Brand;
};
