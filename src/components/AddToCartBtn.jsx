"use client";
import toast from "react-hot-toast";
import React from "react";
import { IoCartOutline } from "react-icons/io5";

const AddToCartBtn = () => {
  return (
    <button
      onClick={() =>
        toast.success("Interest saved — our team follows up shortly", {
          duration: 4000,
        })
      }
      className="w-full btn-accent gap-3 py-4 text-base font-bold shadow-2xl"
    >
      <IoCartOutline size={22} />
      Reserve Inquiry
    </button>
  );
};

export default AddToCartBtn;
