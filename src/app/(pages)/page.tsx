"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import slider1 from "../../../public/images/slider-image-1.jpeg";
import slider2 from "../../../public/images/slider-image-2.jpeg";
import slider3 from "../../../public/images/slider-image-3.jpeg";
import blog1 from "../../../public/images/blog-img-1.jpeg";
import blog2 from "../../../public/images/blog-img-2.jpeg";
import "swiper/css/pagination";
import "swiper/css";
import ProductList from "../_componnents/products/ProductList";
import { getAllProducts } from "../_apis/productsApi";
import { ProductRoot } from "../_types/products";
import ClientWrapper from "../_utilites/providers/ClientWrapper";
import Loading from "../_componnents/puplicComponents/Loading";
import ErrorMesage from "../_componnents/puplicComponents/ErrorMesage";

export default function Home() {
  return (
    <ClientWrapper>
      <div className="container">
        <div className="mb-5 mt-24">
          <SWIPER />
        </div>
        <div>
          <HomeProducts />
        </div>
      </div>
    </ClientWrapper>
  );
}

function HomeProducts() {
  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useQuery<ProductRoot>({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <Loading/>;
  if (isError) return <ErrorMesage message={error.message}/>;

  return <ProductList products={productsData!} />;
}

function SWIPER() {
  return (
    <div className="flex flex-col md:flex-row justify-center w-full">
      <div className="w-full md:w-[900px]">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <Image
              src={slider1}
              alt="Slider 1"
              className="w-full h-[250px] md:h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={slider2}
              alt="Slider 2"
              className="w-full h-[250px] md:h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={slider3}
              alt="Slider 3"
              className="w-full h-[250px] md:h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="hidden md:flex w-[330px] flex-col">
        <Image src={blog1} alt="Blog 1" className="h-1/2 object-cover" />
        <Image src={blog2} alt="Blog 2" className="h-1/2 object-cover" />
      </div>
    </div>
  );
}
