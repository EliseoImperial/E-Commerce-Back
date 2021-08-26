module.exports = (sequelize, Model, DataTypes, Order, Product) => {
  class OrderProduct extends Model {}

  OrderProduct.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
      },
      unit_price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "order_product",
    }
  );

  return OrderProduct;
};
