"use client";
import { getProducts } from "@/lib/data";
import React, { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";
import Link from "next/link";
import { IoArrowForwardOutline, IoGridOutline, IoListOutline } from "react-icons/io5";
import FilterFun from "./FilterFun";

const AllAnimalsClient = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await getProducts();
        setAnimals(data);
        setFilteredAnimals(data.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animals:", error);
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleSortChange = (sortType) => {
    let sorted = [...animals.slice(0, 8)];
    
    switch (sortType) {
      case "high-to-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "low-to-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "weight":
        sorted.sort((a, b) => (b.weight || 0) - (a.weight || 0));
        break;
      default:
        sorted = [...animals.slice(0, 8)];
    }
    
    setFilteredAnimals(sorted);
  };

  if (loading) {
    return (
      <div className="relative bg-gradient-to-br from-white via-neutral-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xl text-neutral-600 font-medium">Loading amazing animals...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-bold text-sm uppercase tracking-wider">
                Full Collection
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black font-serif text-neutral-900">
              All <span className="gradient-text">Animals</span>
            </h2>
            
            <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
              Browse cows, bulls, and goats listed for Qurbani — verified details &
              humane focus.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {/* View Mode Toggle */}
            {/* <div className="flex items-center gap-2 p-1 bg-white rounded-xl shadow-md border border-neutral-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <IoGridOutline size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <IoListOutline size={20} />
              </button>
            </div> */}
            
            {/* Filter */}
            <div className="bg-white rounded-xl shadow-md border border-neutral-200">
              <FilterFun onSortChange={handleSortChange} />
            </div>
          </div>
        </div>
        
        {/* Animals Grid */}
        <div className={`grid gap-8 mb-16 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredAnimals.map((animal) => (
            <div key={animal.id} className="animate__animated animate__slideInUp">
              <AnimalCard animal={animal} />
            </div>
          ))}
        </div>
        
        {/* Browse All Button */}
        {/* <div className="flex justify-center">
          <Link href="/animals" className="group">
            <button className="btn-primary gap-3 px-8 py-4 text-base font-bold shadow-2xl">
              Browse All Animals
              <IoArrowForwardOutline size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default AllAnimalsClient;
