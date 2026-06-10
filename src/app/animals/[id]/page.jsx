import BookNowBtn from "@/components/BookNowBtn";
import { getProducts } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoStar, IoLocationOutline, IoScaleOutline, IoCalendarOutline, IoWaterOutline } from "react-icons/io5";

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

  const specs = [
    { icon: <IoStar className="text-amber-500" size={22} />, label: "Breed", value: breed, color: "from-amber-50 to-yellow-50", border: "border-amber-200" },
    { icon: <IoLocationOutline className="text-emerald-500" size={22} />, label: "Region", value: location, color: "from-emerald-50 to-teal-50", border: "border-emerald-200" },
    { icon: <IoScaleOutline className="text-blue-500" size={22} />, label: "Weight", value: weight ? `${weight} kg` : null, color: "from-blue-50 to-indigo-50", border: "border-blue-200" },
    { icon: <IoCalendarOutline className="text-violet-500" size={22} />, label: "Age", value: age ? `${age} years` : null, color: "from-violet-50 to-purple-50", border: "border-violet-200" },
    { icon: <IoWaterOutline className="text-cyan-500" size={22} />, label: "Category", value: category, color: "from-cyan-50 to-sky-50", border: "border-cyan-200" },
  ].filter(item => item.value);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 py-8 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <span>/</span>
            <a href="/animals" className="hover:text-blue-600 transition-colors">Animals</a>
            <span>/</span>
            <span className="text-neutral-700 font-semibold">{name}</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden">
            
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-[21/9] md:aspect-[2.4/1]">
                <Image
                  src={image}
                  alt={name}
                  width={1400}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {/* Top Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <div className="backdrop-blur-xl bg-white/90 px-5 py-2.5 rounded-full shadow-xl border border-white/30">
                  <span className="text-sm font-bold text-neutral-800 uppercase tracking-wide">
                    {category}
                  </span>
                </div>
                {stock < 15 && (
                  <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/90 to-rose-500/90 px-5 py-2.5 rounded-full shadow-xl border border-white/20">
                    <span className="text-sm font-bold text-white">Only {stock} left</span>
                  </div>
                )}
              </div>

              {/* Rating on Image */}
              <div className="absolute bottom-6 right-6 backdrop-blur-xl bg-white/90 px-5 py-2.5 rounded-full shadow-xl border border-white/30 flex items-center gap-2">
                <IoStar className="text-amber-500" size={20} />
                <span className="text-lg font-bold text-neutral-900">{rating}</span>
                <span className="text-sm text-neutral-500">/ 5.0</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10 lg:p-12">

              {/* Brand & Name */}
              <div className="mb-8">
                <p className="text-blue-600 font-black uppercase tracking-[0.25em] text-sm mb-3">
                  {brand}
                </p>
                <h1 className="text-3xl md:text-5xl font-serif text-neutral-900 tracking-tight leading-tight">
                  {name}
                </h1>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {specs.map((info, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 md:p-5 bg-gradient-to-br ${info.color} rounded-2xl border ${info.border} hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white/80 shadow-sm flex items-center justify-center">
                        {info.icon}
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      {info.label}
                    </p>
                    <p className="text-sm font-bold text-neutral-900">
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Section */}
              <div className="mb-8 p-6 bg-gradient-to-r from-stone-50 to-neutral-50 rounded-2xl border border-neutral-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Price</p>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black text-blue-600">৳</span>
                      <span className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight">
                        {priceDisplay}
                      </span>
                      <span className="text-lg text-neutral-500 mb-1 font-medium">BDT</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    Verified Listing
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                <h3 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Description</h3>
                <p className="text-neutral-600 leading-relaxed text-base">
                  {description}
                </p>
              </div>

              {/* Book Now Button */}
              <div className="max-w-md mx-auto">
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