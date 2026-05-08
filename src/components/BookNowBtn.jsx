"use client";

import { useState } from "react";
import BookForm from "./BookForm";
import toast from "react-hot-toast";

export default function BookNowBtn() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full btn-primary mt-6 py-4 text-base font-bold shadow-2xl"
      >
        Book Now
      </button>

      <BookForm open={open} setOpen={setOpen} />
    </>
  );
}