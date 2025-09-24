"use client";
import Image from "next/image";
import { useState } from "react";

type Item = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<Item[]>([
    {
      id: 1,
      name: "Wishlist Product 1",
      image: "/images/slider-image-1.jpeg",
      price: 300,
    },
    {
      id: 2,
      name: "Wishlist Product 2",
      image: "/images/slider-image-2.jpeg",
      price: 450,
    },
  ]);

  const handleRemove = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 mt-24 py-10">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

      {wishlistItems.length > 0 ? (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b py-4"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded"
              />
              <div className="flex-1">
                <h2 className="font-medium">{item.name}</h2>
                <p className="text-gray-500">${item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                {/* <button className="bg-main hover:bg-green-600 text-white px-4 py-2 rounded">
                  Add to Cart
                </button> */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No items in wishlist 💔</p>
      )}
    </div>
  );
}
