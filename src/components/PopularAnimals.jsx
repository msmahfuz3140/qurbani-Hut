import { getProducts } from "@/lib/data";
import React from "react";
import { IoFlameSharp } from "react-icons/io5";
import AnimalCard from "./AnimalCard";
import "animate.css";

const PopularAnimals = async () => {
  const animals = await getProducts();
  const popularAnimals = [...animals]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-neutral-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg mb-6">
            <IoFlameSharp size={24} className="animate-pulse" />
            <span className="font-bold text-sm uppercase tracking-wider">
              Featured for Qurbani
            </span>
          </div> */}
          
          <h1 className="text-4xl md:text-6xl font-black font-serif mb-6">
            Top <span className="gradient-text">Animals</span>
          </h1>
          
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Highest-rated livestock on QurbaniHut today — revisit often as new
            healthy animals arrive daily.
          </p>
        </div>
        
        {/* Animals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularAnimals.map((animal) => (
            <div key={animal.id} className="animate__animated animate__slideInUp">
              <AnimalCard animal={animal} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAnimals;
