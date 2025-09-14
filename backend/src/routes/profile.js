import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get current user's profile
router.get("/", protect, getProfile);
// Update current user's profile
router.put("/", protect, updateProfile);

export default router;
