import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoStar, IoCartOutline, IoHeartOutline, IoLocationOutline } from "react-icons/io5";

const AnimalCard = ({ animal }) => {
  const { name, brand, price, rating, image, stock, category, id, weight, age, location } = animal;

  return (
    <div className="group bg-white rounded-3xl border border-neutral-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3]">
          <Image
            src={image}
            alt={name}
            width={1000}
            height={750}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* CATEGORY BADGE */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-neutral-100">
          <p className="text-[11px] font-bold text-neutral-700 uppercase tracking-wide">
            {category}
          </p>
        </div>

        {/* RATING BADGE */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-yellow-100">
          <IoStar className="text-yellow-500" size={14} />
          <span className="text-sm font-bold text-neutral-800">{rating}</span>
        </div>

        {/* LOW STOCK INDICATOR */}
        {stock < 15 && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            Only {stock} left
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4">

        {/* BRAND + LOCATION */}
        <div className="flex justify-between items-center">
          <p className="text-[11px] font-black text-blue-600 uppercase tracking-wider">
            {brand}
          </p>
          {location && (
            <div className="flex items-center gap-1 text-neutral-400">
              <IoLocationOutline size={12} />
              <span className="text-[11px] font-medium">{location}</span>
            </div>
          )}
        </div>

        {/* NAME */}
        <div>
          <h3 className="text-lg font-bold text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>
        </div>

        {/* SPECS ROW */}
        {weight && (
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="px-2 py-1 bg-neutral-50 rounded-lg font-medium">{weight} kg</span>
            {age && <span className="px-2 py-1 bg-neutral-50 rounded-lg font-medium">{age} years</span>}
          </div>
        )}

        {/* PRICE */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-blue-600">৳</span>
          <span className="text-2xl font-black text-neutral-900">
            {typeof price === "number"
              ? price.toLocaleString("en-BD")
              : price}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2.5 pt-1">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-neutral-200 text-neutral-600 font-semibold text-sm hover:bg-neutral-50 hover:border-neutral-300 hover:text-red-500 transition-all active:scale-[0.97]">
            <IoHeartOutline size={16} />
            Wishlist
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all active:scale-[0.97] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30">
            <IoCartOutline size={16} />
            Add Cart
          </button>
        </div>

        {/* DETAILS BUTTON */}
        <Link href={`/animals/${id}`}>
          <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-stone-800 to-stone-900 text-white font-semibold text-sm tracking-wide hover:from-orange-500 hover:to-red-500 transition-all duration-300 active:scale-[0.97] shadow-lg">
            View Full Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AnimalCard;