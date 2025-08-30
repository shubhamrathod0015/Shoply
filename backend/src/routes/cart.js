import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/remove/:productId", protect, removeFromCart);
router.put("/update/:productId", protect, updateCartItem);
router.delete("/clear", protect, clearCart);

export default router;
