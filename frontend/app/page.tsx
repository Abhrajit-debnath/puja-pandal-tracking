import HeroSection from "@/components/hero/HeroSection";
import HeroFeatureBox from "@/components/hero/HeroFeatureBox";
import FeaturedSection from "@/components/Featured/FeaturedSection";
import GallerySection from "@/components/Gallery/GallerySection";
import FestiveWorldSection from "@/components/FestiveWorld/FestiveWorldSection";
import LatestUpdatesSection from "@/components/Updates/LatestUpdatesSection";
import BannerCTA from "@/components/Banner/BannerCTA";
import AudioPlayer from "@/components/AudioPlayer";
import HomeClientOverlay from "@/components/HomeClientOverlay";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#faf4ec] text-[#1f140e] pb-16">
      <AudioPlayer />
      <HeroSection />
      <HeroFeatureBox />
      <FeaturedSection />
      <GallerySection />
      <FestiveWorldSection />
      <LatestUpdatesSection />
      <BannerCTA />
      <HomeClientOverlay />
    </main>
  );
}
