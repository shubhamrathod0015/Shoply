import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shoply";

async function seedProducts() {
  await mongoose.connect(MONGO_URI);

  // Fetch products from fakestoreapi
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  // 1. Seed categories
  const categoryNames = [...new Set(products.map((p) => p.category))];
  const categoryDocs = {};
  for (const name of categoryNames) {
    let cat = await Category.findOne({ name });
    if (!cat) {
      cat = await Category.create({
        name,
        description: `${name} category`,
        image: "https://via.placeholder.com/150", // or any default
      });
    }
    categoryDocs[name] = cat._id;
  }

  // 2. Map products to schema
  const mapped = products.map((p) => ({
    name: p.title,
    description: p.description,
    price: p.price,
    image: p.image,
    category: categoryDocs[p.category], // ObjectId
    brand: "FakeStore",
    sku: p.id.toString(),
    stock: 100,
    rating: p.rating?.rate || 0, // store as number (average)
    reviews: [], // must be an array
  }));

  // 3. Clear and insert
  await Product.deleteMany({});
  await Product.insertMany(mapped);

  console.log("Products seeded!");
  mongoose.disconnect();
}

seedProducts();
