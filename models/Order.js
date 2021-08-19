module.exports = (sequelize, Model, DataTypes) => {
  class Order extends Model {}

  Order.init(
    {
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "order",
    }
  );

  return Order;
};
