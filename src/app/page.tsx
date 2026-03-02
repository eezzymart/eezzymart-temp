import HeroSlider from "@/components/home/HeroSlider";
import FeatureBanner from "@/components/home/FeatureBanner";
import PopularCategories from "@/components/home/PopularCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DealOfTheDay from "@/components/home/DealOfTheDay";
import TrendingProducts from "@/components/home/TrendingProducts";
import PromoBanner from "@/components/home/PromoBanner";
import NewArrivals from "@/components/home/NewArrivals";
import BrandShowcase from "@/components/home/BrandShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeatureBanner />
      <PopularCategories />
      <FeaturedProducts />
      <DealOfTheDay />
      <TrendingProducts />
      <PromoBanner />
      <NewArrivals />
      <BrandShowcase />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
