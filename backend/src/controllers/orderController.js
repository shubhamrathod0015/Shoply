// Order controller for /api/orders
import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const { items, total } = req.body;
  const order = new Order({ user: req.user._id, items, total });
  await order.save();
  res.status(201).json(order);
};
