"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormValues, checkoutSchema } from "@/app/_schemas/checkoutFormSchema";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import checkoutSessionAction from "../_actions/checkoutSessionAction";
import ErrorMessage from "@/app/_componnents/puplicComponents/ErrorMesage";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  qty: number;
};

export default function Checkout({cartId}:{cartId:string}) {
  // const [cart, setCart] = useState<CartItem[]>([
  //   { id: 1, name: "Product 1", image: "/images/slider-image-1.jpeg", price: 150, qty: 2 },
  //   { id: 2, name: "Product 2", image: "/images/slider-image-2.jpeg", price: 200, qty: 1 },
  // ]);

  // const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  // const shipping = subtotal > 500 ? 0 : 50;
  // const total = subtotal + shipping;
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      phone: "",
      details: "",
      city: "",
    },
  });
  console.log("cart id",cartId)
const { mutate, isPending, isSuccess, error } = useMutation({
  mutationFn: ({ cartId, data }: { cartId: string; data: CheckoutFormValues }) =>
    checkoutSessionAction(cartId, data),
    onSuccess: (res) => {
    console.log("Checkout response:", res);
window.location.href = res.session.url  },
  onError: (err) => {
    console.error("Checkout error:", err);
  },
});

const onSubmit = (data: CheckoutFormValues) => {
  mutate({ cartId, data });
};
  return (
    <>
    {error&&<ErrorMessage message={error.message}/>}
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Billing Details */}
         <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Details</FormLabel>
                    <FormControl>
                      <Input placeholder="Street, Building, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white">
                {isPending?<i className="fa-solid fa-spin fa-spinner"></i>:"Place Order"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {/* <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Image height={5} width={5}  src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
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
          </div> */}
        </div>
      </div>
    </div>
    </>
  );
}
