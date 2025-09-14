import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { calculateTotal, validateQuantity } from "../utils/cartUtils.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

/**
 * @desc   Get logged-in user's cart
 */
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price image"
    );

    if (!cart) {
      // Instead of error, return empty cart
      return res.json({
        success: true,
        cart: {
          user: req.user._id,
          items: [],
          total: 0,
        },
      });
    }
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc   Add item to cart
 */
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !validateQuantity(quantity)) {
      return errorResponse(res, 400, "Invalid product or quantity");
    }

    const product = await Product.findById(productId);
    if (!product) return errorResponse(res, 404, "Product not found");

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }

    cart.total = calculateTotal(cart.items);
    await cart.save();
    await cart.populate("items.product", "name price image");

    return successResponse(res, { cart }, "Item added to cart");
  } catch (error) {
    console.error("Error adding to cart:", error);
    return errorResponse(res, 500, "Server error");
  }
};

/**
 * @desc   Remove item from cart
 */
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return errorResponse(res, 404, "Cart not found");

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    cart.total = calculateTotal(cart.items);
    await cart.save();
    await cart.populate("items.product", "name price image");

    return successResponse(res, { cart }, "Item removed from cart");
  } catch (error) {
    console.error("Error removing item:", error);
    return errorResponse(res, 500, "Server error");
  }
};

/**
 * @desc   Update item quantity
 */
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!validateQuantity(quantity)) {
      return errorResponse(res, 400, "Invalid quantity");
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return errorResponse(res, 404, "Cart not found");

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === req.params.productId
    );

    if (itemIndex === -1) {
      return errorResponse(res, 404, "Item not found in cart");
    }

    cart.items[itemIndex].quantity = quantity;
    cart.total = calculateTotal(cart.items);

    await cart.save();
    await cart.populate("items.product", "name price image");

    return successResponse(res, { cart }, "Cart updated successfully");
  } catch (error) {
    console.error("Error updating item:", error);
    return errorResponse(res, 500, "Server error");
  }
};

/**
 * @desc   Clear cart
 */
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return errorResponse(res, 404, "Cart not found");

    cart.items = [];
    cart.total = 0;
    await cart.save();

    return successResponse(res, { cart }, "Cart cleared successfully");
  } catch (error) {
    console.error("Error clearing cart:", error);
    return errorResponse(res, 500, "Server error");
  }
};
