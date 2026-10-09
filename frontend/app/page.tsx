
"use client";
import HeroSection from "@/components/hero/HeroSection";
import HeroFeatureBox from "@/components/hero/HeroFeatureBox";
import FeaturedSection from "@/components/Featured/FeaturedSection";
import dynamic from "next/dynamic";
import JagadhatriLoader from "@/components/loaders/JagadhartiLoader";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Text } from "@mantine/core";
const GallerySection = dynamic(() => import("@/components/Gallery/GallerySection"))
const FestiveWorldSection = dynamic(() => import("@/components/FestiveWorld/FestiveWorldSection"))
const LatestUpdatesSection = dynamic(() => import("@/components/Updates/LatestUpdatesSection"))
const BannerCTA = dynamic(() => import("@/components/Banner/BannerCTA"))
const BottomFloatingBar = dynamic(() => import("@/components/BottomBar/BottomFloatingBar"))
const SuggestPandalModal = dynamic(() => import("@/components/Suggest/SuggestPandalModal"))
const AudioPlayer = dynamic(() => import("@/components/AudioPlayer"))


export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);



  const handleLoading = useCallback((targetRoute: string) => {
    if (isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      router.push(targetRoute);
      setTimeout(() => setIsLoading(false), 400);
    }, 4000);
  }, [isLoading, router]);

  return (
    <main className="min-h-screen relative bg-[#faf4ec] text-[#1f140e] pb-16">
      <AudioPlayer />

      {
        isLoading && <div className="fixed  inset-0 z-999999 flex items-center justify-center bg-sacred-wine-elevated backdrop-blur-md ">
          <div className="flex flex-col items-center justify-center gap-4">
            <Text c="saffronGold.1" fw="700" >Entering Live Immersion</Text>
            <JagadhatriLoader />
          </div>
        </div>
      }
      <HeroSection />
      <HeroFeatureBox />
      <FeaturedSection />
      <GallerySection />
      <FestiveWorldSection />
      <LatestUpdatesSection />
      <BannerCTA />
      <BottomFloatingBar handleLoading={handleLoading} />
      <SuggestPandalModal />
    </main>
  );
}
