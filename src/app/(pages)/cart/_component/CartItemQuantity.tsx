"use client";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CartItemQuantity({ productId, initialCount }: { productId: string, initialCount: number | string }) {
  const [count, setCount] = useState<number>(Number(initialCount) || 0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newCount: number) => {
      const res = await axios.put(`/api/cart/${productId}`, { count: newCount });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cartItems"] }),
    onError: (err) => console.error("Update quantity error:", err),
  });

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    mutation.mutate(newCount);
  };

  const handleDecrease = () => {
    if (count <= 1) return;
    const newCount = count - 1;
    setCount(newCount);
    mutation.mutate(newCount);
  };

  return (
    <div className="flex items-center gap-3 mt-2">
      <button 
        onClick={handleDecrease} 
        disabled={mutation.isPending || count <= 1} 
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        {mutation.isPending ? "..." : "-"}
      </button>

      <span>{mutation.isPending ? <i className="fa-solid fa-spin fa-spinner"></i> : count}</span>

      <button 
        onClick={handleIncrease} 
        disabled={mutation.isPending} 
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        {mutation.isPending ? "..." : "+"}
      </button>
    </div>
  );
}
