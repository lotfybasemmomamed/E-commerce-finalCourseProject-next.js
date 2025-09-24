"use client";
import ErrorMessage from "@/app/_componnents/puplicComponents/ErrorMesage";
import Loading from "@/app/_componnents/puplicComponents/Loading";
import { RootCart } from "@/app/_types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import CartItemQuentity from "./CartItemQuantity";
import axios, { AxiosError } from "axios";
import removeCartItemAction from "../_actions/removeCartItemAction";
import SuccessMessage from "@/app/_componnents/puplicComponents/SuccessMessage";
import { useState } from "react";

interface ApiError {
  error?: string;
}

export default function Cart() {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    data: cartData,
    isLoading,
    isError,
    error,
  } = useQuery<RootCart>({
    queryKey: ["cartItems"],

    queryFn: async () => {
      try {
        const res = await axios.get("/api/cart", { withCredentials: true });
        return res.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const apiError = err as AxiosError<ApiError>;
          throw new Error(
            apiError.response?.data?.error ||
              apiError.message ||
              "Unknown error"
          );
        }
        throw new Error("Unknown error");
      }
    },
    refetchOnWindowFocus: false,
  });

  //delete cart item
  const queryClient = useQueryClient();
  const { mutate:deletedMutate, isPending:isDeletedPending, isSuccess:isDeletedSuccessed, error:deletedError } = useMutation({
    mutationFn: removeCartItemAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
  console.log(cartData);
  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;

  const total = cartData?.data?.totalCartPrice;

  return (
    <>
    {isDeletedSuccessed&&<SuccessMessage message="product deleted successfully"/>}
    {deletedError&&<ErrorMessage message={deletedError?.message}/>}
    <div className="container mx-auto mt-20 px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartData?.data?.products &&cartData?.data?.products?.length > 0 ? (
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
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="rounded"
                />
                <div className="flex-1">
                  <h2 className="font-medium">{item.product.title}</h2>
                  <p className="text-gray-500">{item.price} EGP</p>

                  <CartItemQuentity
                    initialCount={item.count}
                    productId={item.product._id}
                  />
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    ${(item.price * item.count).toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      setDeletingId(item.product._id)
                      deletedMutate(item.product._id)
                    }}
                    className="text-red-500 min-w-[50px] hover:text-red-700 text-sm mt-2 cursor-pointer"
                  >
                   {isDeletedPending&&item.product._id===deletingId?<i className="fa-solid fa-spin fa-spinner text-center text-black"></i>:<><i className="fa-solid fa-trash"></i> Remove</>} 
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
            <button onClick={()=>window.location.pathname=`/checkout/${cartData.cartId}`} className="w-full bg-main hover:bg-green-600 text-white py-2 rounded mt-4">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg min-h-[60vh] bg-gray-100 flex justify-center items-center">
          Your cart is empty <i className="fa-solid fa-cart-shopping"></i>
        </p>
      )}
    </div>
    </>
  );
}
