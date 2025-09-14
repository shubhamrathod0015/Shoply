import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  // updateCartItem, // Uncomment if you implement this in your controller
} from "../controllers/cartController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getCart);
router.post("/", authenticate, addToCart);
router.delete("/:productId", authenticate, removeFromCart);
router.delete("/", authenticate, clearCart);

// Uncomment below if you implement updateCartItem in your controller
// router.put("/update/:productId", authenticate, updateCartItem);

export default router;
