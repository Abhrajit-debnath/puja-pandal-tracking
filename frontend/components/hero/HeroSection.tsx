import NextImage from "next/image";
import Header from "../layout/Header";
import { homeData } from "@/data/home";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative w-full bg-[#1c0508] overflow-hidden text-white pt-24 pb-32 md:pb-40 lg:pb-48">
      {/* Top Header Nav */}
      <Header />

      {/* Main Hero Background Image (hero.png) */}
      <div className="absolute inset-0 z-0">
        <NextImage
          src="/assets/images/hero.png"
          alt="Maa Jagadhatri Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] md:object-right opacity-95"
        />

        {/* Left Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c0508] via-[#1c0508]/85 to-transparent w-full md:w-3/4 lg:w-2/3" />
        
        {/* Top & Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c0508]/90 via-transparent to-[#1c0508]" />
      </div>

      {/* Main Hero Content Area */}
      <div className="max-w-(--container-max-width) mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-xl flex flex-col items-start pt-6 sm:pt-10">
          
          {/* Eyebrow Bengali Shloka */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-saffron-gold-bright text-xs sm:text-sm font-semibold tracking-wider uppercase font-sans">
              {homeData.hero.eyebrow}
            </span>
          </div>

          {/* Main Headline (Sans font) */}
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight">
            <span className="block text-white">{homeData.hero.titleLine1}</span>
            <span className="block text-white">{homeData.hero.titleLine2}</span>
            <span className="block text-saffron-gold-bright drop-shadow-md mt-1">
              {homeData.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-amber-100/85 font-sans leading-relaxed max-w-md">
            {homeData.hero.description}
          </p>

          {/* CTA Button */}
          <a
            href={homeData.hero.cta.href}
            className="mt-6 sm:mt-8 px-7 py-3.5 rounded-full bg-[#f4b244] hover:bg-[#e59b2c] text-[#1c0508] font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition duration-200 flex items-center gap-2 group cursor-pointer font-sans"
          >
            <span>{homeData.hero.cta.label}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

        </div>
      </div>

      {/* Decorative Calligraphy on Right Side */}
      <div className="hidden md:flex absolute right-12 bottom-28 z-10 flex-col items-center pointer-events-none select-none">
     
        <div className="flex items-center gap-2 mt-1 text-[#f4b244]/80">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#f4b244]" />
          <span className="text-xs">🪷</span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#f4b244]" />
        </div>
      </div>

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
