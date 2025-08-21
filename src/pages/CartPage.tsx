import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "wouter";

const CartPage = () => {
    const { items, removeItem, clearCart } = useCartStore();
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Your Cart</h1>
                {items.length > 0 && (
                    <Button variant="destructive" onClick={clearCart}>Clear Cart</Button>
                )}
            </div>

            {items.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty.</h2>
                    <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
                    <Link href="/products">
                        <Button className="mt-6">Start Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                    <Trash2 className="h-5 w-5 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="p-6 bg-gray-50 rounded-lg border sticky top-24">
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
                            <Button className="w-full mt-6" size="lg">Proceed to Checkout</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;