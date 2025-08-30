import express from "express";
import cors from "cors";
import morgan from "morgan";

// Routes
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/category.js";
import cartRoutes from "./routes/cart.js";
import authRoutes from "./routes/auth.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // logs requests

// Health check
app.get("/", (req, res) => {
  res.json({ message: "🚀 Shoply API is running!" });
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;