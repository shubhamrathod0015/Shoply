import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, CartItemId } from "../types";
import { toast } from "sonner";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: CartItemId) => void; // <-- updated type here
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        const itemExists = items.find((item) => item.id === product.id);

        if (itemExists) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          toast.success(`Added another "${product.title}" to cart.`);
        } else {
          set({ items: [...items, { ...product, id: product.id as CartItemId, quantity: 1 }] });
          toast.success(`"${product.title}" added to cart!`);
        }
      },

      removeItem: (id: CartItemId) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
        toast.error("Item removed from cart.");
      },
      clearCart: () => {
        set({ items: [] });
        toast.info("Cart has been cleared.");
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
