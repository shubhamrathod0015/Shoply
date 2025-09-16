import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "wouter";

const CartPage = () => {
  const { items, removeItem, clearCart } = useCartStore();
  const totalPrice = items.reduce(
    (total, item) => total + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Your Cart</h1>
        {items.length > 0 && (
          <Button variant="destructive" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg bg-white shadow flex flex-col items-center">
          <img
            src="https://placehold.co/120x120/E0E7FF/4F46E5?text=🛒"
            alt="Empty cart"
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty.
          </h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products">
            <Button className="mt-6" aria-label="Start Shopping">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">
                {items.length} item{items.length > 1 ? "s" : ""} in your cart
              </span>
              <span className="text-sm text-gray-500">
                Enjoy fast checkout and secure payment!
              </span>
            </div>
            {items.map((item) => (
              <div
                key={item.id ?? item.sku ?? item.name}
                className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow transition"
              >
                <img
                  src={item.image}
                  alt={item.title || item.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">
                    {item.title || item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-blue-700">
                  RS- {(item.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // Remove using the same id logic as your key, and support string or number
                    const removeId =
                      item.id ?? item._id ?? item.sku ?? item.name;
                    if (
                      typeof removeId === "string" ||
                      typeof removeId === "number"
                    ) {
                      removeItem(removeId);
                    } else {
                      console.error(
                        "Cannot remove item: id is not a string or number",
                        item
                      );
                    }
                  }}
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="p-6 bg-gray-50 rounded-lg border sticky top-24 shadow">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-6" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
