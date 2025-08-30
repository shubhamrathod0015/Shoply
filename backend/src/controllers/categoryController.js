import Category from "../models/Category.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Public (should be protected in real apps)
export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    const exists = await Category.findOne({ name });
    if (exists) {
      res.status(400);
      throw new Error("Category already exists");
    }
    const category = new Category({ name, description, image });
    const created = await category.save();
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Public (should be protected in real apps)
export const updateCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    category.name = name || category.name;
    category.description = description || category.description;
    category.image = image || category.image;
    const updated = await category.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Public (should be protected in real apps)
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    await category.deleteOne();
    res.json({ message: "Category removed" });
  } catch (error) {
    next(error);
  }
};