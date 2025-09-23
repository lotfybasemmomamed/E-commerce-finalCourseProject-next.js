"use client";
import React, { useState, useEffect } from "react";

export default function ErrorMessage({ message }: { message: string }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isOpen && (
        <>
       <div className="text-green-500 fixed top-[75px] left-1/2 -translate-x-1/2  z-[999999] bg-gray-100 p-5 rounded shadow-lg">
   {message}
</div>
        </>
      )}
    </>
  );
}
