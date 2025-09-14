import express from "express";
import { getUsers, getUserById } from "../controllers/userController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get all users (admin only)
router.get("/", authenticate, requireAdmin, getUsers);
// Get user by id (admin only)
router.get("/:id", authenticate, requireAdmin, getUserById);

export default router;
