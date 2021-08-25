const { Order, User, OrderProduct } = require("../models");

async function index(req, res) {
  const orders = await Order.findAll();
  res.json(orders);
}

async function show(req, res) {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.json("Order not found.");
  return res.json(order);
}

async function store(req, res) {
  if (req.headers.authorization === process.env.ULTRA_SECRET_TOKEN) {
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
      }
    }
    res.sendStatus(403);
  } else {
    res.sendStatus(403);
  }
}

function update(req, res) {}

function destroy(req, res) {}

module.exports = { index, show, store, update, destroy };
