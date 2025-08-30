import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name must be less than 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Category image is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
