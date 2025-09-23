"use client";
import React, { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  qty: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Product 1", image: "/images/slider-image-1.jpeg", price: 150, qty: 2 },
    { id: 2, name: "Product 2", image: "/images/slider-image-2.jpeg", price: 200, qty: 1 },
  ]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Billing Details */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border rounded p-2 w-full" />
            <input type="text" placeholder="Last Name" className="border rounded p-2 w-full" />
            <input type="email" placeholder="Email" className="border rounded p-2 w-full md:col-span-2" />
            <input type="text" placeholder="Address" className="border rounded p-2 w-full md:col-span-2" />
            <input type="text" placeholder="City" className="border rounded p-2 w-full" />
            <input type="text" placeholder="Zip Code" className="border rounded p-2 w-full" />
            <input type="text" placeholder="Country" className="border rounded p-2 w-full md:col-span-2" />
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                  <div>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">{item.price * item.qty} EGP</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal} EGP</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `${shipping} EGP`}</span>
            </div>
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>{total} EGP</span>
            </div>
          </div>

          <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
