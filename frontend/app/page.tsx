import HeroSection from "@/components/hero/HeroSection";
import HeroFeatureBox from "@/components/hero/HeroFeatureBox";
import FeaturedSection from "@/components/Featured/FeaturedSection";
import GallerySection from "@/components/Gallery/GallerySection";
import FestiveWorldSection from "@/components/FestiveWorld/FestiveWorldSection";
import LatestUpdatesSection from "@/components/Updates/LatestUpdatesSection";
import BannerCTA from "@/components/Banner/BannerCTA";
import BottomFloatingBar from "@/components/BottomBar/BottomFloatingBar";
import LocationTracker from "@/components/LocationTracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf4ec] text-[#1f140e] pb-16">
      <LocationTracker/>
      <HeroSection />
      <HeroFeatureBox />
      <FeaturedSection />
      <GallerySection />
      <FestiveWorldSection />
      <LatestUpdatesSection />
      <BannerCTA />
      <BottomFloatingBar />
    </main>
  );
}
