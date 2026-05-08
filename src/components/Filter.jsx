"use client";

import React from "react";
import { IoChevronDownOutline, IoFunnelOutline } from "react-icons/io5";

const Filter = ({
  sortType = "default",
  onSortChange = () => { },
}) => {

  const handleChange = (e) => {
    const value = e.target.value;

    // SAFE CALL (error prevent)
    onSortChange?.(value);
    
  };
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

      {/* TITLE */}
      <div className="flex items-center gap-2 text-stone-700 font-semibold text-sm uppercase tracking-wider">
        <IoFunnelOutline className="text-orange-500" size={18} />
        <span>Sort By:</span>
      </div>

      {/* SELECT BOX */}
      <div className="relative w-full sm:w-64">
        <select
          value={sortType}
          onChange={handleChange}
          className="w-full bg-white border-2 border-stone-200 px-4 py-3 rounded-2xl appearance-none outline-none cursor-pointer"
        >
          <option value="default">Newest Arrivals</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="weight">By Weight</option>
        </select>

        {/* ICON */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <IoChevronDownOutline size={18} />
        </div>
      </div>

    </div>
  );
};

export default Filter;