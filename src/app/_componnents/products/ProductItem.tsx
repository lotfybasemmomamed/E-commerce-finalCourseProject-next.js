import Image from "next/image";
import React from "react";
import { Product } from "@/app/_types/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="m-2">
      {/* Images */}
      <div className="flex justify-center">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {product?.images?.map((img) => (
          <SwiperSlide key={img}>
            <div className="flex justify-center items-center w-[180px] h-[200px]">
            <Image
              src={img}
              alt="Product image"
              width={250}
              height={250}
              className="object-cover"
            />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      <p className="text-main mt-3">{product.category.name}</p>
      <h5 className="truncate">{product.title}</h5>

      <div className="flex justify-between items-center mt-2">
        <p>{product.price} EGP</p>
        <div className="flex justify-between items-center gap-0.5">
          <i className="fa-solid fa-star text-rating"></i> {product.ratingsAverage}({product.ratingsQuantity})
        </div>
      </div>
    </div>
  );
}
