"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "motion/react";
import { Box, Title, Text, Button } from "@mantine/core";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const bannerSlides = [
  {
    id: "1",
    title: "Be a part of the Celebration",
    subtitle: "Explore • Visit • Feel the Divine",
    ctaLabel: "Explore Pandals",
    ctaHref: "#pandals",
  },
  {
    id: "2",
    title: "Chandannagar Jagadhatri Parikrama",
    subtitle: "150+ Illuminated Pandals & Heritage Shobhajatra",
    ctaLabel: "View Map Route",
    ctaHref: "#map",
  },
  {
    id: "3",
    title: "Live Crowd Status Telemetry",
    subtitle: "Real-time updates on pandal wait times & crowd levels",
    ctaLabel: "Nearest Pandals",
    ctaHref: "#suggest",
  },
];

const BannerCTA = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Box component="section" className="py-12 sm:py-16 bg-[#faf4ec]">
      <div className="max-w-(--container-max-width) mx-auto px-4 sm:px-6">
        
        {/* Outer Banner Card matching existing styles exactly */}
        <div className="relative bg-[#1c0508] text-white rounded-3xl border border-[#f4b244]/30 shadow-xl overflow-hidden">
          
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {bannerSlides.map((slide, idx) => {
                const isActive = selectedIndex === idx;

                return (
                  <div
                    key={slide.id}
                    className="flex-[0_0_100%] min-w-0 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
                  >
                    {/* Animated Text Content */}
                    <div className="text-center md:text-left flex-1 min-w-0">
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Title order={2} className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight">
                              {slide.title}
                            </Title>
                            <Text className="text-xs sm:text-sm text-amber-100/80 font-sans mt-1 tracking-wide">
                              {slide.subtitle}
                            </Text>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right CTA Button */}
                    <Button
                      component="a"
                      href={slide.ctaHref}
                      radius="xl"
                      rightSection={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                      className="px-7 py-3 rounded-full bg-[#f4b244] hover:bg-[#e59b2c] text-[#1c0508] font-bold text-xs sm:text-sm shadow-md transition duration-200 shrink-0 cursor-pointer group font-sans border-none h-auto"
                    >
                      {slide.ctaLabel}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subtle Navigation Dots */}
          <div className="absolute bottom-2.5 left-0 right-0 z-20 flex items-center justify-center gap-1.5">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  selectedIndex === idx
                    ? "w-5 h-1.5 bg-[#f4b244]"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </Box>
  );
};

export default BannerCTA;
