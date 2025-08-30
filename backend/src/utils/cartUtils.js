/**
 * Utility functions for Cart operations
 */
export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const validateQuantity = (quantity) => {
  return quantity && quantity > 0;
};
