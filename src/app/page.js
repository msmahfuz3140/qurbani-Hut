import AllAnimals from "@/components/AllAnimals";
import HeroSlider from "@/components/HeroSlider";
import PopularAnimals from "@/components/PopularAnimals";
import Tips from "@/components/Tips";

export default async function Home() {
  return (
    <>
      <HeroSlider />
      <PopularAnimals />
      <Tips />
      <AllAnimals />
    </>
  );
}
