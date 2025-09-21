// components/Footer.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col  items-start justify-between gap-6">
          <div>
            <h2 className="  text-gray-800">
              Get the FreshCart app
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </div>

          <div className="w-full ">
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email .."
                className="flex-1 bg-white border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
              >
                Share App Link
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200"></div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium min-w-[150px]">
              Payment Partners
            </span>

            <div className="flex items-center gap-3">
              <i className="fa-brands fa-amazon-pay"></i>
              <i className="fa-brands fa-cc-visa"></i>
              <i className="fa-brands fa-paypal"></i>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto">
            <p className="text-sm text-gray-700 md:mr-4">
              Get deliveries with FreshCart
            </p>

            <div className="flex items-center gap-3">
              <i className="fa-brands fa-google-play"></i>
              <i className="fa-brands fa-app-store-ios"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
