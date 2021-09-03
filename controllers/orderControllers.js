const { Order, User, OrderProduct, Product } = require("../models");

async function getProduct(productId) {
  const product = await Product.findByPk(productId);
  if (product) return product;
  return null;
}

async function index(req, res) {
  const { include } = req.query;
  let orders;
  if (include) {
    orders = await Order.findAll({ include: Product });
  } else {
    orders = await Order.findAll({ include: User });
  }
  res.json(orders);
}

async function show(req, res) {
  const order = await Order.findByPk(req.params.id, {
    include: [User, Product],
  });
  if (!order) {
    res.json("Order not found.");
  } else {
    res.json(order);
  }
}

async function store(req, res) {
  if (req.headers.authorization2 === process.env.ULTRA_SECRET_TOKEN) {
    await User.update(
      { telephone: req.body.phone, address: req.body.address },
      { where: { email: req.body.email } }
    );
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const order = await Order.create({
        status: "PENDING",
        userId: user.id,
        paymentMethod: req.body.paymentMethod,
      });
      if (order) {
        const products = req.body.items.map((item) => ({
          orderId: order.id,
          productId: item.id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        }));
        const order_product = await OrderProduct.bulkCreate(products);
        if (order_product) return res.json(order);
      } else {
        res.status(409).json("Order Exist");
      }
    } else {
      res.status(406).json("You are not exist");
    }
  } else {
    res.status(401).json("Unauthorized");
  }
}

async function update(req, res) {
  const result = await Order.findByPk(req.body.id);
  if (result) {
    result.status = req.body.status;
    await result.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
}

async function destroy(req, res) {
  const result = await Order.findByPk(req.body.id);
  if (result) {
    await result.destroy();
  }
  res.json(result);
}

async function userOrders(req, res) {
  const results = await Order.findAll({
    where: { userId: req.user.sub },
    include: [Product],
  });
  if (!results) return res.sendStatus(404);
  return res.json(results);
}

async function userOrder(req, res) {
  const order = await Order.findByPk(req.params.id, {
    include: [User, Product],
  });
  if (!order || req.user.sub !== order.userId) {
    res.json("Order not found.");
  } else {
    res.json(order);
  }
}

module.exports = { index, show, store, update, destroy, userOrders, userOrder };
