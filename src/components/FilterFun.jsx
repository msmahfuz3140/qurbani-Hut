"use client"
import Filter from "./Filter";
import { useState } from "react";

export default function FilterFun({ onSortChange }) {
  const [sort, setSort] = useState("default");

  const handleSortChange = (value) => {
    console.log("Sorting:", value);
    setSort(value);
    onSortChange?.(value);
  };

  return (
    <Filter sortType={sort} onSortChange={handleSortChange} />
  );
}