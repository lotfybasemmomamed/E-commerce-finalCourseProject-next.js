"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import logo from "../../../../public/images/freshcart-logo.svg";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const links = [
    { to: "/", label: "Home" },
    { to: "/cart", label: "Cart" },
    { to: "/products", label: "Products" },
    { to: "/categories", label: "Categories" },
    { to: "/brands", label: "Brands" },
  ];
  return (
    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900 ">
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
            <ul className="flex flex-col w-full md:flex-row md:space-x-6 rtl:space-x-reverse md:w-auto">
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
            </ul>
            <div className="flex flex-col gap-4 mt-4 md:hidden">
              <span className="flex items-center gap-x-4 justify-center">
                <i className="fa-brands fa-instagram hover:text-pink-500 cursor-pointer"></i>
                <i className="fa-brands fa-facebook hover:text-blue-500 cursor-pointer"></i>
                <i className="fa-brands fa-tiktok hover:text-black cursor-pointer"></i>
                <i className="fa-brands fa-x-twitter hover:text-gray-400 cursor-pointer"></i>
                <i className="fa-brands fa-linkedin hover:text-blue-600 cursor-pointer"></i>
                <i className="fa-brands fa-youtube hover:text-red-600 cursor-pointer"></i>
              </span>
              <button className="font-medium hover:text-red-400 cursor-pointer text-center">
                Sign Out
              </button>
            </div>
          </div> 
        </div>
        <div className="flex md:order-2 space-x-3 md:hidden md:space-x-0 rtl:space-x-reverse">
          <span className="hidden md:flex items-center gap-x-6 px-4 py-2 rounded-lg">
            <i className="fa-brands fa-instagram hover:text-pink-500 cursor-pointer"></i>
            <i className="fa-brands fa-facebook hover:text-blue-500 cursor-pointer"></i>
            <i className="fa-brands fa-tiktok hover:text-black cursor-pointer"></i>
            <i className="fa-brands fa-x-twitter hover:text-gray-400 cursor-pointer"></i>
            <i className="fa-brands fa-linkedin hover:text-blue-600 cursor-pointer"></i>
            <i className="fa-brands fa-youtube hover:text-red-600 cursor-pointer"></i>
            <p className="ml-auto font-medium hover:text-red-400 cursor-pointer">
              Sign Out
            </p>
          </span>
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
    </nav>
  );
}