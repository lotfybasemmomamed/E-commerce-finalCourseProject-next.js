"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddToCartBtn({ productId, width = "", height = "" }: { productId: string, width?: string, height?: string }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/cart", { productId, count: 1 });
      return res.data;
    },
    onSuccess: () => {
      // بعد إضافة المنتج للكارت، يحدث استعلام الكارت تلقائياً
      queryClient.invalidateQueries(["cartItems"]);
    },
    onError: (err) => {
      console.error("Add to cart error:", err);
    },
  });

  const handleAddToCart = () => {
    setLoading(true);
    mutation.mutate(undefined, {
      onSettled: () => setLoading(false),
    });
  };

  return (
    <Button 
      onClick={handleAddToCart} 
      className={`${width} ${height} btn px-4 py-2 rounded`}
      disabled={loading || mutation.isLoading}
    >
      {loading || mutation.isLoading ? <i className="fa-solid sa-spin fa-spinner"></i> : "Add to Cart"}
    </Button>
  );
}
