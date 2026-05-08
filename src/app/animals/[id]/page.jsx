import AddToCartBtn from "@/components/AddToCartBtn";
import BookNowBtn from "@/components/BookNowBtn";
import { getProducts } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  IoStar,
  IoShieldCheckmarkOutline,
  IoBriefcaseOutline,
  IoRefreshOutline,
  IoLeafOutline,
} from "react-icons/io5";

export async function generateMetadata({ params }) {
  const singleAnimal = await params;
  const animalId = singleAnimal.id;
  const animals = await getProducts();
  const animal = animals.find((item) => item.id === parseInt(animalId, 10));

  if (!animal) {
    return {
      title: "Listing Not Found - QurbaniHut",
    };
  }

  return {
    title: `${animal.name} - QurbaniHut`,
    description:
      animal.description || `View ${animal.name} on QurbaniHut — trusted Qurbani listings.`,
  };
}

const AnimalDetailsPage = async ({ params }) => {
  const singleAnimal = await params;
  const animalId = singleAnimal.id;

  const animals = await getProducts();

  const animal = animals.find(
    (item) => item.id === parseInt(animalId, 10),
  );

  if (!animal) {
    notFound();
  }

  const {
    name,
    brand,
    price,
    rating,
    image,
    stock,
    category,
    description,
    breed,
    weight,
    age,
    location,
  } = animal;

  const trustFeatures = [
    {
      icon: <IoShieldCheckmarkOutline className="text-orange-500" size={24} />,
      title: "Verified listing",
      desc: "Details shared by sellers for transparent Qurbani decisions.",
    },
    {
      icon: <IoBriefcaseOutline className="text-orange-500" size={24} />,
      title: "Guided handover",
      desc: "Coordinate pickup or delivery windows that reduce animal stress.",
    },
    {
      icon: <IoRefreshOutline className="text-orange-500" size={24} />,
      title: "Replace window",
      desc: "If health checks fail on arrival, we help you re-match quickly.",
    },
    {
      icon: <IoLeafOutline className="text-orange-500" size={24} />,
      title: "Ethical care",
      desc: "We spotlight natural feed history and calm handling practices.",
    },
  ];

  const priceDisplay =
    typeof price === "number" ? price.toLocaleString("en-BD") : price;

  return (
    <div className="min-h-screen bg-stone-50 py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="top-24">
            <div className="relative overflow-hidden rounded-xl bg-white border border-stone-200 shadow-sm">
              <Image
                src={image}
                alt={name}
                height={800}
                width={800}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl">
                <span className="text-stone-900 text-xs font-black uppercase tracking-widest">
                  {category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-3">
                {brand}
              </p>
              <h1 className="text-5xl md:text-6xl font-serif text-stone-900 tracking-tighter leading-none mb-6">
                {name}
              </h1>
              {(breed || location || weight || age !== undefined) && (
                <p className="text-stone-600 text-sm md:text-base font-medium mb-3">
                  {[
                    breed && `Breed: ${breed}`,
                    location && `Region: ${location}`,
                    weight != null && `Est. weight: ${weight} kg`,
                    age != null && `Age: ${age} yrs`,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              )}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-xl">
                  <IoStar className="text-orange-500" size={16} />
                  <span className="text-sm font-black text-stone-900">
                    {rating}
                  </span>
                </div>
                <span className="text-stone-900/40 text-sm font-medium">|</span>
                <span className="text-stone-900/60 text-sm font-medium italic">
                  {stock} available for inquiries
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-stone-200 mb-10 shadow-sm">
              <div className="flex items-end gap-2 mb-8">
                <span className="text-3xl font-black text-orange-600">৳</span>
                <span className="text-5xl font-black text-stone-900 tracking-tighter">
                  {priceDisplay}
                </span>
                <span className="text-stone-900/40 text-lg mb-1 font-medium">
                  BDT
                </span>
              </div>

              <p className="text-stone-900/70 leading-relaxed mb-8 text-lg">
                {description}
              </p>

              <AddToCartBtn />
              <BookNowBtn />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl border border-stone-200/60 flex items-start gap-4 hover:border-orange-500/30 transition-colors"
                >
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <h4 className="text-stone-900 font-bold text-sm uppercase tracking-tight mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-stone-900/50 text-xs leading-snug">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailsPage;
