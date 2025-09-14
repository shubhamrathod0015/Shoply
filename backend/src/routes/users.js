import express from "express";
import { getUsers, getUserById } from "../controllers/userController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Get all users (admin only)
router.get("/", protect, admin, getUsers);
// Get user by id (admin only)
router.get("/:id", protect, admin, getUserById);

export default router;
