import express from "express";
import { getOrders, createOrder } from "../controllers/orderController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all orders for logged-in user
router.get("/", authenticate, getOrders);
// Create a new order
router.post("/", authenticate, createOrder);

// Uncomment and import these if you implement them in your controller:
// import { updateOrder, deleteOrder } from "../controllers/orderController.js";
// router.put("/:id", authenticate, updateOrder);
// router.delete("/:id", authenticate, deleteOrder);

export default router;
