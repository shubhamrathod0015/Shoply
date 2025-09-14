import express from "express";
import { getOrders, createOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all orders for logged-in user
router.get("/", protect, getOrders);
// Create a new order
router.post("/", protect, createOrder);

export default router;
