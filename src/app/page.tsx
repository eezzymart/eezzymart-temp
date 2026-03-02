import HeroSlider from "@/components/home/HeroSlider";
import FeatureBanner from "@/components/home/FeatureBanner";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import NewArrivals from "@/components/home/NewArrivals";
import Testimonials from "@/components/home/Testimonials";
import LatestBlogs from "@/components/home/LatestBlogs";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeatureBanner />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <Testimonials />
      <LatestBlogs />
      <Newsletter />
    </>
  );
}
