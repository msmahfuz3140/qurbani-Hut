import BookNowBtn from "@/components/BookNowBtn";
import { getProducts } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoStar } from "react-icons/io5";

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

  const priceDisplay =
    typeof price === "number" ? price.toLocaleString("en-BD") : price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-orange-50 py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden">
            <div className="relative">
              <div className="aspect-video">
                <Image
                  src={image}
                  alt={name}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full">
                <span className="text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  {category}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12">

              <div className="text-center mb-8">
                <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-4">
                  {brand}
                </p>
                <h1 className="text-4xl md:text-6xl font-serif text-neutral-900 tracking-tighter leading-none mb-6">
                  {name}
                </h1>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full border border-blue-200">
                    <IoStar className="text-blue-500" size={20} />
                    <span className="text-lg font-bold text-neutral-900">
                      {rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200">
                    <span className="text-sm font-semibold text-neutral-700">
                      {stock} available
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: <IoStar className="text-blue-500" size={20} />, label: "Breed", value: breed },
                  { icon: <IoStar className="text-blue-500" size={20} />, label: "Region", value: location },
                  { icon: <IoStar className="text-blue-500" size={20} />, label: "Weight", value: `${weight} kg` },
                  { icon: <IoStar className="text-blue-500" size={20} />, label: "Age", value: `${age} years` },
                ].filter(item => item.value).map((info, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl border border-neutral-200">
                    <div className="flex justify-center mb-2">
                      {info.icon}
                    </div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      {info.label}
                    </p>
                    <p className="text-sm font-bold text-neutral-900">
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-end gap-2">
                  <span className="text-3xl font-black text-blue-600">৳</span>
                  <span className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter">
                    {priceDisplay}
                  </span>
                  <span className="text-lg text-neutral-600 mb-1 font-medium">
                    BDT
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-neutral-700 leading-relaxed text-center text-lg">
                  {description}
                </p>
              </div>
      
              <div className="flex justify-center">
                <BookNowBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailsPage;
