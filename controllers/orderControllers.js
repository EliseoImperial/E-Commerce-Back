const { Order, User, OrderProduct, Role } = require("../models");

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
  if (req.body.guest === true) {
    const user = await User.create({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      password: "",
      telephone: req.body.phone,
      roleId: 1,
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
          }));
          const order_product = await OrderProduct.bulkCreate(products);
          if (order_product) return res.sendStatus(200);
        }
    }
  }
  res.sendStatus(403);
}

function update(req, res) {}

function destroy(req, res) {}

module.exports = { index, show, store, update, destroy };
