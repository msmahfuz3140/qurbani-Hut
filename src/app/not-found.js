"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { IoArrowBackOutline } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-stone-50 flex items-center justify-center px-6 py-20">
      <div className="container w-full text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-12 bg-stone-900/10"></span>
          <span className="text-orange-500 text-xs font-black uppercase tracking-[0.5em]">
            Error 404
          </span>
          <span className="h-px w-12 bg-stone-900/10"></span>
        </div>

        <h1 className="text-[12rem] md:text-[16rem] font-serif leading-none text-stone-900 tracking-tighter opacity-5 select-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -z-10">
          404
        </h1>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-tight mb-6">
            This grazing path ends here.
          </h2>

          <p className="text-stone-500 text-lg md:text-xl font-medium  mx-auto mb-12">
            The page you want isn’t on this farm anymore — it may have moved or
            been retired.
            <br />
            Head home to keep exploring Qurbani listings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={"/"}>
              <Button className="h-16 px-10 bg-stone-900 text-stone-50 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-500 transition-all shadow-xl shadow-stone-200 flex items-center gap-3">
                <IoArrowBackOutline size={18} />
                Return Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-stone-200/60 inline-block px-12">
          <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.3em]">
            QurbaniHut Trusted Livestock Hub
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
