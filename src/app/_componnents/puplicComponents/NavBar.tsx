"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import logo from "../../../../public/images/freshcart-logo.svg";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import CartItemQuentity from "@/app/(pages)/cart/_component/CartItemQuantity";
import { RootCart } from "@/app/_types/cart";
import axios, { AxiosError } from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import removeCartItemAction from "@/app/(pages)/cart/_actions/removeCartItemAction";
import { WishListRoot } from "@/app/_types/wishlist";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMesage";
import removeWishListItemAction from "@/app/(pages)/wishlist/_actions/removeWishListItemAction";
import { signOut } from "next-auth/react";


export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);

  const pathName = usePathname();
  // const links = [
  //   // { to: "/products", label: "Products" },
  //   // { to: "/categories", label: "Categories" },
  //   // { to: "/brands", label: "Brands" },
  // ];
  const { data: session, status } = useSession();

  console.log("session", session);

  return (
    <>
    <nav className="bg-gray-100 border-gray-200 right-0 left-0 dark:bg-gray-900 fixed top-0 z-[10000] ">
      <div className="container max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex gap-8 items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="fresh cart"
              className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            />
          </Link>
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } fixed top-16 left-0 right-0 bg-gray-100 dark:bg-gray-900 z-50 flex-col p-4 md:relative md:top-auto md:left-auto md:right-auto md:bg-transparent md:dark:bg-transparent md:z-auto md:p-0 md:flex md:flex-row md:items-center`}
            id="navbar-cta"
          >
            {/* <ul className="flex flex-col w-full md:flex-row md:space-x-6 rtl:space-x-reverse md:w-auto">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.to}
                    className={`block py-3 px-3 md:p-0 rounded-sm hover:text-blue-700 md:bg-transparent ${
                      pathName === link.to
                        ? "text-blue-700 dark:text-blue-500"
                        : "text-black dark:text-white"
                    }`}
                    aria-current="page"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul> */}
            {/* social & login icons  in moboile */}
            <div className="flex flex-col gap-4 mt-4 md:hidden">
              <span className="flex items-center gap-x-4 justify-center">
                <i className="fa-brands fa-instagram hover:text-pink-500 cursor-pointer"></i>
                <i className="fa-brands fa-facebook hover:text-blue-500 cursor-pointer"></i>
                <i className="fa-brands fa-tiktok hover:text-black cursor-pointer"></i>
                <i className="fa-brands fa-x-twitter hover:text-gray-400 cursor-pointer"></i>
                <i className="fa-brands fa-linkedin hover:text-blue-600 cursor-pointer"></i>
                <i className="fa-brands fa-youtube hover:text-red-600 cursor-pointer"></i>
              </span>
              <div className="flex justify-center">
                <Button
                   onClick={()=>{
              if(session?.user?.name){
                setShow((prev)=>!prev)
                return
              }
              window.location.pathname="/login"

            }}
                  className={`${
                    session?.user?.name
                      ? "bg-red-500 hover:bg-red-400"
                      : "bg-main hover:bg-green-600"
                  } w-[100px]  font-medium cursor-pointer`}
                >
                  {session?.user?.name ? (
                    <div >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      Sign Out
                    </div>
                  ) : (
                    <>
                      <i className="fa-solid fa-right-to-bracket"></i>
                      Sign In
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
         
        </div>
        {/* social & login icons & CartWishlistIcons  in labtop  */}
        <div className="flex gap-4 md:order-2 space-x-3  md:space-x-0 rtl:space-x-reverse">
          <span className="hidden  shadow lg:flex items-center gap-x-6 px-4 py-2 rounded-lg">
            <i className="fa-brands fa-instagram hover:text-pink-500 cursor-pointer"></i>
            <i className="fa-brands fa-facebook hover:text-blue-500 cursor-pointer"></i>
            <i className="fa-brands fa-tiktok hover:text-black cursor-pointer"></i>
            <i className="fa-brands fa-x-twitter hover:text-gray-400 cursor-pointer"></i>
            <i className="fa-brands fa-linkedin hover:text-blue-600 cursor-pointer"></i>
            <i className="fa-brands fa-youtube hover:text-red-600 cursor-pointer"></i>
          </span>
          <div className="flex gap-5 ">
            <CartWishlistIcons />
            <Button
            onClick={()=>{
              if(session?.user?.name){
                setShow((prev)=>!prev)
                return
              }
              window.location.pathname="/login"

            }}
              className={`${
                session?.user?.name
                  ? "bg-red-500 hover:bg-red-400"
                  : "bg-main hover:bg-green-600"
              } hidden lg:flex ml-auto font-medium cursor-pointer`}
            >
              {session?.user?.name ? (
                <>
                  <i  className="fa-solid fa-arrow-right-from-bracket"></i>
                  Sign Out
                </>
              ) : (
                <div>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Sign In
                </div>
              )}
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
      {show&&<ConfirmSignOutModel setShow={setShow}/>} 
    </nav>
    </>
  );
}

interface ApiError {
  error?: string;
}
function CartWishlistIcons() {
   const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  //get cart items
  const {
    data: cartData,
    isLoading,
    isError,
    error,
  } = useQuery<RootCart>({
    queryKey: ["cartItems"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/cart", { withCredentials: true });
        return res.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
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

  // delete cart item
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const {
    mutate: deletedMutate,
    isPending: isDeletedPending,
    isSuccess: isDeletedSuccessed,
    error: deletedError,
  } = useMutation({
    mutationFn: removeCartItemAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  // delete cart item
  const [deletingWishListItemId, setDeletingWishListItemId] = useState<string | null>(null);

  const _queryClient = useQueryClient();
  const {
    mutate: deletedWishListItemMutate,
    isPending: isDeletedWishListItemPending,
    isSuccess: isDeletedWishListItemSuccessed,
    error: deletedWishListItemError,
  } = useMutation({
    mutationFn: removeWishListItemAction,
    onSuccess: () => {
      _queryClient.invalidateQueries({ queryKey: ["wishItems"] });
    },
  });

  //get wishlist items
  const {
    data: wishItems,
    isLoading: isWishListLoading,
    isError: isWishListError,
    error: WishListError,
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


 

  return (
    <>
   {isDeletedSuccessed&&<SuccessMessage message="product deleted successfully"/>}
   {deletedError&&<ErrorMessage message={deletedError.message}/>}
   {isDeletedWishListItemSuccessed&&<SuccessMessage message="product deleted successfully"/>}
   {deletedWishListItemError&&<ErrorMessage message={deletedWishListItemError.message}/>}
    <div className="flex items-center gap-6 relative">
      <div
        className="relative"
        onMouseEnter={() => setShowCart(true)}
        onMouseLeave={() => setShowCart(false)}
      >
        <Link href="/cart" className="relative">
          <i className="fa-solid fa-cart-shopping text-xl cursor-pointer"></i>
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
            {cartData?.data.products?.length}
          </span>
        </Link>
        {showCart && (
          <div className="absolute right-0">
            <div className=" mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50">
              {cartData?.data?.products &&
              cartData?.data.products?.length > 0 ? (
                cartData?.data.products?.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center gap-3 p-2 border-b last:border-0"
                  >
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-500">${item.price}</p>
                      <CartItemQuentity
                        initialCount={item.count}
                        productId={item.product._id}
                      />
                    </div>
                    <button
                      onClick={() => {
                        setDeletingId(item.product._id);
                        deletedMutate(item.product._id);
                      }}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      {isDeletedPending && item.product._id === deletingId ? (
                        <i className="fa-solid fa-spin fa-spinner"></i>
                      ) : (
                        <i className="fa-solid fa-trash"></i>
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm">No items in cart</p>
              )}
              <Link
                href="/cart"
                className="block text-center bg-main hover:bg-green-600 text-white py-2 rounded mt-2"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setShowWishlist(true)}
        onMouseLeave={() => setShowWishlist(false)}
      >
        <Link href="/wishlist" className="relative">
          <i className="fa-solid fa-heart text-xl cursor-pointer"></i>
          <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs rounded-full px-1">
            {wishItems?.data.length}
          </span>
        </Link>
        {showWishlist && (
          <div className="absolute right-0">
            <div className="mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50">
              {wishItems?.data && wishItems.data.length > 0 ? (
                wishItems.data.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 border-b last:border-0"
                  >
                    <Image
                      src={item.imageCover}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">${item.price}</p>
                    </div>
                    <button
                      onClick={() => {
                        setDeletingWishListItemId(item._id)
                        deletedWishListItemMutate(item._id)
                      }}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      {deletingWishListItemId===item._id&&isDeletedWishListItemPending?<i className="fa-solid fa-spin fa-spinner"></i>:<i className="fa-solid fa-trash"></i>}
                      
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm">No items in wishlist</p>
              )}
              <Link
                href="/wishlist"
                className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-2"
              >
                View Wishlist
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
     </>
  );
}



 function ConfirmSignOutModel({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [isLoading, setIsLoading] = useState(false);


  return (
   <>
  
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-3">Sign Out Confirmation</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to sign out from the store?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setIsLoading(true)
signOut({ callbackUrl: "/" })
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
          {isLoading?<i className="fa-solid fa-spin fa-spinner"></i>:"Yes, Sign Out"}  
          </button>
        </div>
      </div>
    </div>

</>

  );
}
