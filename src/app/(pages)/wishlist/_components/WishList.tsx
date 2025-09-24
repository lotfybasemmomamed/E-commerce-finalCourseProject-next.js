"use client";
import Image from "next/image";
import { useState } from "react";
import AddToCartBtn from "../../cart/_component/AddToCartBtn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WishListRoot } from "@/app/_types/wishlist";
import axios, { AxiosError } from "axios";
import Loading from "@/app/_componnents/puplicComponents/Loading";
import ErrorMessage from "@/app/_componnents/puplicComponents/ErrorMesage";
import removeWishListItemAction from "../_actions/removeWishListItemAction";
import SuccessMessage from "@/app/_componnents/puplicComponents/SuccessMessage";


interface ApiError {
  error?: string;
}
export default function Wishlist() {

  const [deletingId, setDeletingId] = useState<string | null>(null);

 //delete wishlist item
  const queryClient = useQueryClient();
  const { mutate:deletedMutate, isPending:isDeletedPending, isSuccess:isDeletedSuccessed, error:deletedError } = useMutation({
    mutationFn: removeWishListItemAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishItems"] });
    },
  });

  //get wishlist items
  const {
    data: wishItems,
    isLoading,
    isError,
    error,
  } = useQuery<WishListRoot>({
    queryKey: ["wishItems"],

    queryFn: async () => {
      try {
        const res = await axios.get("/api/wishlist", { withCredentials: true });
        console.log("wishitems", res.data);
        return res.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log("wishitems err", err);

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
   if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage message={error.message} />;


  return (
    <>
    {deletedError&&<ErrorMessage message={deletedError.message} />}
    {isDeletedSuccessed&&<SuccessMessage message="product deleted succeffully" />}
    <div className="container mx-auto px-4 mt-24 py-10">
      <h1 className="text-2xl font-bold mb-6">
        My Wishlist <i className="fa-solid fa-heart text-red-500"></i>
      </h1>

      {wishItems?.data&&wishItems?.data.length > 0 ? (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
          {wishItems.data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b py-4"
            >
              <Image
                src={item.imageCover}
                alt={item.title}
                width={80}
                height={80}
                className="rounded"
              />
              <div className="flex-1">
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-gray-500">${item.price}</p>
              </div>
              <div className="flex items-center  gap-3">
                <AddToCartBtn
                  height="h-[40px]"
                  productId={item._id}
                  width="w-[120px]"
                />
                <button
                  onClick={() =>{
                    setDeletingId(item._id)
                    deletedMutate(item._id)
                  } }
                  className="text-red-500 hover:text-red-700"
                >
                 {deletingId===item._id&&isDeletedPending?<i className="fa-solid fa-spin fa-spinner"></i>:<i className="fa-solid fa-trash text-2xl"></i>} 
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg min-h-[70vh] bg-gray-100  flex justify-center items-center">No items in wishlist <i className="text-red-500 fa-solid fa-heart-crack"></i></p>
      )}
    </div>
    </>
  );
}
