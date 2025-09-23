"use client";
import ErrorMessage from "@/app/_componnents/puplicComponents/ErrorMesage";
import Loading from "@/app/_componnents/puplicComponents/Loading";
import { RootCart } from "@/app/_types/cart";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CartItemQuentity from "./CartItemQuantity";



export default function Cart() {


 const {
    data: cartData,
    isLoading,
    isError,
    error,
  } = useQuery<RootCart[]>({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await fetch("/api/cart", { 
        credentials: "include",
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }); 
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
      }
      const response =await res.json()
    //   const data=response.data
      return response
    },
    refetchOnWindowFocus: false
  });
console.log(cartData)
  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
 


const total =cartData?.data?.totalCartPrice

  return (
    <div className="container mx-auto mt-20 px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartData?.data?.products?.length>0 ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
            {cartData?.data.products?.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b py-4"
              >
                <Image
                  src={item.product.imageCover}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded"
                />
                <div className="flex-1">
                  <h2 className="font-medium">{item.product.title}</h2>
                  <p className="text-gray-500">{item.price} EGP</p>

                  <CartItemQuentity initialCount={item.count} productId={item.product._id}/>

                </div>

                <div className="text-right">
                  <p className="font-medium">
                    ${(item.price * item.count).toFixed(2)}
                  </p>
                  <button
                    // onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow h-fit">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>${(total + 20).toFixed(2)}</span>
            </div>
            <button className="w-full bg-main hover:bg-green-600 text-white py-2 rounded mt-4">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">
          Your cart is empty <i className="fa-solid fa-cart-shopping"></i>
        </p>
      )}
    </div>
  );
}
