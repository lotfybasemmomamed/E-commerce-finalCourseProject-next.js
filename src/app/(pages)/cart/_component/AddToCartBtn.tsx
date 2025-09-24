"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addToVCartAction from "../_actions/addToCartAction";
import ErrorMessage from "@/app/_componnents/puplicComponents/ErrorMesage";
import SuccessMessage from "@/app/_componnents/puplicComponents/SuccessMessage";
type ApiError = {
  error: string;
};

export default function AddToCartBtn({
  productId,
  width = "",
  height = "",
}: {
  productId: string;
  width?: string;
  height?: string;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: addToVCartAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
 
    
   
  });

  return (
    <>
      {isSuccess && <SuccessMessage message="Product added successfully" />}
      {error && <ErrorMessage message={error.message} />}

      <Button
        onClick={() => mutate(productId)}
        className={`${width} ${height} btn px-4 py-2 rounded`}
      >
        {isPending ? (
          <i className="fa-solid fa-spin fa-spinner"></i>
        ) : (
          "Add to Cart"
        )}
      </Button>
    </>
  );
}
