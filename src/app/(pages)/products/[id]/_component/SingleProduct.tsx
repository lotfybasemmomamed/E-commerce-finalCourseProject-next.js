"use client";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../_componnents/puplicComponents/Loading";
import { getSingleProduct } from "@/app/_apis/productsApi";
import ErrorMessage from "@/app/_componnents/puplicComponents/ErrorMesage";
import { Product } from "@/app/_types/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import AddToCartBtn from "@/app/(pages)/cart/_component/AddToCartBtn";


export default function SingleProduct({id}:{id:string}) {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product>({
    queryKey: ["singleproduct", id],
    queryFn: () => getSingleProduct({ id }),
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  console.log(product)

  return (
  <div className="flex flex-col justify-center items-center md:flex-row gap-8 mt-32 md:px-20">
      {/* images */}
      <div className="flex justify-center items-center md:w-1/2">
        <Swiper
          className="w-full max-w-lg h-80 md:h-96"
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {product?.images && product.images.length > 0 && (
            product?.images.map((img) => (
              <SwiperSlide key={img}>
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src={img}
                    alt={product.title}
                    width={350}
                    height={350}
                    className="object-contain w-full h-full rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))
          ) }
        </Swiper>
      </div>
{/* content */}
      <div className="md:w-1/2 flex flex-col justify-start px-4 md:px-0">
      <h2 className="text-2xl font-semibold mb-2">{product?.title}</h2>
        <p className="text-sm text-main mb-1">{product?.category?.name}</p>
        
        <p className="text-gray-700 mb-4 leading-relaxed">{product?.description}</p>

        {product?.brand && (
          <p className="text-sm text-gray-500 mb-3">
            <span className="font-bold">Brand: </span>
             <span className="font-medium">{product?.brand.name}</span>
          </p>
        )}

        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-bold text-main">{product?.price} EGP</p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <i className="fa-solid fa-star text-yellow-400"></i>
            <span>{product?.ratingsAverage}</span>
            <span>({product?.ratingsQuantity} reviews)</span>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span><span className="font-bold">In Stock: </span>{product?.quantity} items</span>
          <span><span className="font-bold">Sold: </span> {product?.sold}</span>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <AddToCartBtn width="w-full" />
        </div>
      </div>
    </div>
  );
}
