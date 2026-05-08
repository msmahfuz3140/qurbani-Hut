"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { IoCartOutline, IoClose } from "react-icons/io5";

export default function BookForm({ open, setOpen }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Booking Request Submitted ✅");

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">


      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-[fadeIn_.3s_ease]">


        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-black"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-stone-900 mb-6">
          Booking Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <textarea
            required
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            rows={3}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition"
          >
            Submit Booking
          </button>

        </form>
      </div>
    </div>
  );
}