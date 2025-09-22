import React from "react";
import ProductItem from "./ProductItem";
import { ProductRoot } from "@/app/_types/products";

export default function ProductList({ products }: { products: ProductRoot }) {
  return (
    <div className="flex flex-wrap -m-2">
      {products?.data?.map((item) => (
        <div key={item._id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  );
}