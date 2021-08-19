module.exports = (sequelize, Model, DataTypes, Order, Product) => {
  class OrderProduct extends Model {}

  OrderProduct.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: Order,
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: Product,
          key: "id",
        },
      },
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
