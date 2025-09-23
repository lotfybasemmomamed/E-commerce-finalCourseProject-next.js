"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../_apis/productsApi";
import { ProductRoot } from "../../_types/products";
import ProductList from "../../_componnents/products/ProductList";
import Loading from "../../_componnents/puplicComponents/Loading";
import ErrorMesage from "../../_componnents/puplicComponents/ErrorMesage";

export default function HomeProducts() {
  const { data, isLoading, isError, error } = useQuery<ProductRoot>({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMesage message={error.message} />;

  return <ProductList products={data!} />;
}
