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
  const user = await User.findOneAndUpdate({ email: req.body.email }, { telephone: req.body.phone, address: req.body.address }, {
    new: true
  });
  if (user) {
    const order = await Order.create({
      status: "PENDING",
      userId: user.id,
      paymentMethod: req.body.paymentMethod,
    });
    if (order) {
      const products = req.body.items.map((item) => ({
        orderId: order.id,
        productId: item,
        quantity: 1,
        unit_price: 1,
      }));
      const order_product = await OrderProduct.bulkCreate(products);
      if (order_product) return res.json(order);
    }
  }
  res.sendStatus(403);
}

function update(req, res) {}

function destroy(req, res) {}

module.exports = { index, show, store, update, destroy };
