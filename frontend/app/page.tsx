
"use client";
import HeroSection from "@/components/hero/HeroSection";
import HeroFeatureBox from "@/components/hero/HeroFeatureBox";
import FeaturedSection from "@/components/Featured/FeaturedSection";
import GallerySection from "@/components/Gallery/GallerySection";
import FestiveWorldSection from "@/components/FestiveWorld/FestiveWorldSection";
import LatestUpdatesSection from "@/components/Updates/LatestUpdatesSection";
import BannerCTA from "@/components/Banner/BannerCTA";
import BottomFloatingBar from "@/components/BottomBar/BottomFloatingBar";
import SuggestPandalModal from "@/components/Suggest/SuggestPandalModal";
import AudioPlayer from "@/components/AudioPlayer";
import { useEffect, useRef } from "react";

export default function Home() {
 
  return (
    <main className="min-h-screen bg-[#faf4ec] text-[#1f140e] pb-16">
      <AudioPlayer />
      <HeroSection />
      <HeroFeatureBox />
      <FeaturedSection />
      <GallerySection />
      <FestiveWorldSection />
      <LatestUpdatesSection />
      <BannerCTA />
      <BottomFloatingBar />
      <SuggestPandalModal />
    </main>
  );
}
