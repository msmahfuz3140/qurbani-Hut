"use client";

import React from "react";
import {
  IoWaterOutline,
  IoShieldCheckmarkOutline,
  IoLeafOutline,
  IoCarOutline,
} from "react-icons/io5";
import "animate.css";

const Tips = () => {
  const tips = [
    {
      title: "Water & Shade",
      desc: "Keep animals calm with clean water through the journey. Plan shaded waiting areas ahead of slaughter time.",
      icon: <IoWaterOutline size={36} />,
    },
    {
      title: "Inspect Health & Documents",
      desc: "Meet the farmer, check coat, movement, appetite and veterinary notes before purchase.",
      icon: <IoShieldCheckmarkOutline size={36} />,
    },
    {
      title: "Ethical Feed & Husbandry",
      desc: "Animals should eat natural fodder. Proper care ensures ethical and healthy Qurbani.",
      icon: <IoLeafOutline size={36} />,
    },
    {
      title: "Transport Timing",
      desc: "Book transport early and reduce travel stress through proper hydration and humane loading.",
      icon: <IoCarOutline size={36} />,
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Qurbani <span className="gradient-text">Care Tips</span>
          </h2>

          <p className="text-neutral-600 max-w-2xl mx-auto">
            Smart preparation ensures a humane and meaningful sacrifice.
          </p>
        </div>

        {/* TREE STRUCTURE */}
        <div className="relative flex flex-col items-center">

          {/* CENTER LINE */}
          <div className="hidden md:block absolute h-full w-[3px] bg-gradient-to-b from-orange-400 to-red-500 left-1/2 -translate-x-1/2"></div>

          {tips.map((tip, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`w-full flex flex-col md:flex-row items-center mb-16 relative`}
              >
                {/* LEFT SIDE */}
                <div
                  className={`md:w-1/2 ${
                    isLeft ? "md:pr-12 text-right" : "md:order-2 md:pl-12 text-left"
                  }`}
                >
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-200 hover:-translate-y-2 transition duration-500">
                    <div className="mb-4 text-orange-500 flex justify-center md:justify-start">
                      {tip.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-3">
                      {tip.title}
                    </h3>

                    <p className="text-neutral-600 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>

                {/* CENTER DOT */}
                <div className="relative z-10 flex items-center justify-center my-6 md:my-0">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-4 border-white shadow-lg"></div>
                </div>

                {/* RIGHT SPACE */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tips;