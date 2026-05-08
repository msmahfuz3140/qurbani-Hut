import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoStar, IoCartOutline, IoHeartOutline } from "react-icons/io5";

const AnimalCard = ({ animal }) => {
  const { name, brand, price, rating, image, stock, category, id } = animal;

  return (
    <div className="group bg-white rounded-3xl border border-neutral-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <div className="aspect-square">
          <Image
            src={image}
            alt={name}
            width={1000}
            height={1000}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* CATEGORY */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow">
          <p className="text-xs font-semibold text-neutral-700 uppercase">
            {category}
          </p>
        </div>

        {/* LOW STOCK */}
        {stock < 15 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Low Stock
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">

        {/* BRAND + RATING */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-blue-600 uppercase">
            {brand}
          </p>

          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
            <IoStar className="text-yellow-500" size={16} />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </div>

        {/* NAME */}
        <h3 className="text-lg font-bold text-neutral-900 line-clamp-2 group-hover:text-blue-600 transition">
          {name}
        </h3>

        {/* PRICE */}
        <div>
          <p className="text-xs text-neutral-500 uppercase mb-1">Price</p>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold">৳</span>
            <span className="text-2xl font-black text-neutral-900">
              {typeof price === "number"
                ? price.toLocaleString("en-BD")
                : price}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS (STATIC — NO HOVER FLOAT) */}
        <div className="flex gap-3 pt-4">

          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-300 hover:bg-neutral-100 transition">
            <IoHeartOutline size={18} />
            Wishlist
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
            <IoCartOutline size={18} />
            Add Cart
          </button>
        </div>

        {/* DETAILS BUTTON */}
        <Link href={`/animals/${id}`}>
          <button className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:scale-[1.02] transition">
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
};

export default AnimalCard;