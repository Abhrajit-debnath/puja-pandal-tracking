"use client";

import { useCallback, useEffect, useState } from "react";
import NextImage from "next/image";
import Header from "../layout/Header";
import { homeData } from "@/data/home";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BannerAnimator } from "@/app/animators/Banner.animator";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const heroSlides = [
  {
    id: "slide-1",
    eyebrow: homeData.hero.eyebrow,
    titleLine1: homeData.hero.titleLine1,
    titleLine2: homeData.hero.titleLine2,
    titleHighlight: homeData.hero.titleHighlight,
    description: homeData.hero.description,
    ctaLabel: homeData.hero.cta.label,
    ctaHref: homeData.hero.cta.href,
    bgImage: "/assets/images/hero.png",
  },
  {
    id: "slide-2",
    eyebrow: "🪷 Grand Shobhajatra & Lights",
    titleLine1: "World Famous",
    titleLine2: "Illumination Craft",
    titleHighlight: "Chandannagar Strand Road",
    description: "Witness spectacular 3D light stories, traditional dhak performances, and grand immersion parades.",
    ctaLabel: "View Immersion Route",
    ctaHref: "#route",
    bgImage: "/assets/images/hero.png",
  },
  {
    id: "slide-3",
    eyebrow: "📍 Smart Parikrama Guide",
    titleLine1: "Real-time Crowd",
    titleLine2: "Telemetry and Live",
    titleHighlight: "Pandal Recommendations",
    description: "Check live crowd wait times, find nearest pandals within 1km, and navigate Chandannagar hassle-free.",
    ctaLabel: "Find Nearest Pandals",
    ctaHref: "#suggest",
    bgImage: "/assets/images/hero.png",
  },
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
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

  const currentSlide = heroSlides[selectedIndex] || heroSlides[0];

  return (
    <div className="relative w-full  bg-[#1c0508] overflow-hidden text-white pt-24 pb-32 md:pb-40 lg:pb-48">


      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={BannerAnimator.HeroImageAnimator.initials}
            animate={BannerAnimator.HeroImageAnimator.animate}
            exit={{ opacity: 0 }}
            transition={BannerAnimator.HeroImageAnimator.transition}
            className="w-full h-full relative"
          >
            <NextImage
              src={currentSlide.bgImage}
              alt={currentSlide.titleHighlight}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[65%_center] md:object-right opacity-90"
            />
          </motion.div>
        </AnimatePresence>

        {/* Left Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c0508] via-[#1c0508]/85 to-transparent w-full md:w-3/4 lg:w-2/3 pointer-events-none z-1" />

        {/* Top & Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c0508]/90 via-transparent to-[#1c0508] pointer-events-none z-1" />
      </div>

      {/* Top Header Nav */}
      <Header />

      {/* 🪷 Animated Decorative Dhak (Festive Rhythm Float & Sway) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -12, 0],
          rotate: [-2, 3, -2],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5 },
          scale: { duration: 0.8, delay: 0.5 },
          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute right-6 sm:right-16 md:right-28 bottom-20 sm:bottom-24 z-20 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 pointer-events-none select-none drop-shadow-[0_15px_30px_rgba(244,178,68,0.3)]"
      >
        <NextImage
          src="/assets/decoration/banner/dhak.png"
          alt="Festive Dhak"
          fill
          priority
          sizes="(max-width: 768px) 112px, 176px"
          className="object-contain"
        />
      </motion.div>

      {/* Embla Viewport for Foreground Text Content */}
      <div className="relative z-10 overflow-hidden w-full" ref={emblaRef}>
        <div className="flex w-full">
          {heroSlides.map((slide, idx) => {
            const isActive = selectedIndex === idx;

            return (
              <div
                key={slide.id}
                className="flex-[0_0_100%] min-w-0 relative w-full"
              >
                <div className="max-w-(--container-max-width) mx-auto px-6 sm:px-8 lg:px-0">
                  <div className="max-w-4xl flex flex-col items-start pt-6 sm:pt-10  justify-center">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={slide.id}
                          className="flex flex-col items-start"
                        >
                          {/* Eyebrow Bengali Shloka */}
                          <motion.div
                            initial={BannerAnimator.BannerEyebrowAnimator.initials}
                            animate={BannerAnimator.BannerEyebrowAnimator.animate}
                            transition={BannerAnimator.BannerEyebrowAnimator.transition}
                            className="flex items-center gap-2 mb-3"
                          >
                            <span className="text-saffron-gold-bright text-xs sm:text-sm font-semibold tracking-wider uppercase font-sans">
                              {slide.eyebrow}
                            </span>
                          </motion.div>

                          {/* Main Headline */}
                          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight">
                            <motion.span
                              initial={BannerAnimator.BannerHeadlineAnimator.initials}
                              animate={BannerAnimator.BannerHeadlineAnimator.animate}
                              transition={BannerAnimator.BannerHeadlineAnimator.transition}
                              className="block text-white"
                            >
                              {slide.titleLine1}
                            </motion.span>
                            <motion.span
                              initial={BannerAnimator.BannerHeadlineAnimator.initials}
                              animate={BannerAnimator.BannerHeadlineAnimator.animate}
                              transition={BannerAnimator.BannerHeadlineAnimator.transition}
                              className="block text-white"
                            >
                              {slide.titleLine2}
                            </motion.span>
                            <motion.span
                              initial={BannerAnimator.BannerHeadlineAnimator.initials}
                              animate={BannerAnimator.BannerHeadlineAnimator.animate}
                              transition={BannerAnimator.BannerHeadlineAnimator.transition}
                              className="block text-saffron-gold-bright drop-shadow-md mt-1"
                            >
                              {slide.titleHighlight}
                            </motion.span>
                          </h1>

                          {/* Subtitle Description */}
                          <motion.p
                            initial={BannerAnimator.BannerDescriptionAnimator.initials}
                            animate={BannerAnimator.BannerDescriptionAnimator.animate}
                            transition={BannerAnimator.BannerDescriptionAnimator.transition}
                            className="mt-4 sm:mt-5 text-sm sm:text-base text-amber-100/85 font-sans leading-relaxed max-w-md"
                          >
                            {slide.description}
                          </motion.p>

                          {/* CTA Button */}
                          <motion.a
                            initial={BannerAnimator.BannerCTAButtonAnimator.initials}
                            animate={BannerAnimator.BannerCTAButtonAnimator.animate}
                            transition={BannerAnimator.BannerCTAButtonAnimator.transition}
                            whileHover={BannerAnimator.BannerCTAButtonAnimator.whileHover}
                            whileTap={BannerAnimator.BannerCTAButtonAnimator.whileTap}
                            href={slide.ctaHref}
                            className="mt-6 sm:mt-8 px-7 py-3.5 rounded-full bg-[#f4b244] hover:bg-[#e59b2c] text-[#1c0508] font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition duration-200 flex items-center gap-2 group cursor-pointer font-sans"
                          >
                            <span>{slide.ctaLabel}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </motion.a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prev / Next Navigation Arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white items-center justify-center border border-white/20 transition cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white items-center justify-center border border-white/20 transition cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Dot Indicators */}
      {/* <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-30 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollTo(idx)}
            aria-label={`Go to hero slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              selectedIndex === idx
                ? "w-8 h-2 bg-[#f4b244]"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div> */}

      {/* Organic Bottom Wave Shape */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-20 lg:h-28 object-cover text-[#faf4ec]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120H1440V60C1280 20 1100 100 900 40C700 -20 540 80 360 40C180 0 80 60 0 120Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
