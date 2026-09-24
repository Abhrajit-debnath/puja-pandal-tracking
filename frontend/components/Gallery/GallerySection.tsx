import NextImage from "next/image";
import { Box, Button, Text, Title, Badge } from "@mantine/core";
import { ArrowRight, Sparkles } from "lucide-react";

const GallerySection = () => {
  return (
    <Box component="section" id="gallery" className="  bg-[#faf4ec] overflow-hidden">
      <div className="max-w-(--container-max-width) mx-auto px-3 sm:px-6">
        
        {/* Slim Horizontal Banner Container (Flex Row on Mobile & Desktop) */}
        <Box className="relative bg-gradient-to-r from-[#fff9f2] via-[#fdf5ea] to-[#fef3c7] border border-[#e59b2c]/35 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-10 shadow-lg shadow-[#e59b2c]/8 overflow-hidden flex flex-row items-center justify-between gap-2 sm:gap-6 md:gap-8 group">
          
          {/* Subtle Ambient Radial Light Glows */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#f4b244]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#e59b2c]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Golden Lotus Line-Art Background Watermarks */}
          <div className="absolute top-2 left-2 opacity-15 pointer-events-none select-none text-3xl sm:text-5xl">
            🪷
          </div>
          <div className="absolute bottom-2 right-1/3 opacity-15 pointer-events-none select-none text-4xl sm:text-6xl">
            🪷
          </div>
          <div className="absolute top-3 right-4 opacity-20 pointer-events-none select-none text-2xl sm:text-4xl">
            🪷
          </div>

          {/* Left Element: Arch Portal Frame with Maa Jagadhatri Image */}
          <div className="relative z-10 flex items-center justify-center shrink-0">
            <div className="relative p-0.5 sm:p-1 rounded-t-full rounded-b-xl bg-gradient-to-tr from-[#f4b244] via-[#e59b2c] to-[#fbebb5] shadow-md shadow-[#e59b2c]/20">
              <div className="relative w-20 h-24 sm:w-32 sm:h-40 md:w-48 md:h-56 rounded-t-full rounded-b-lg border border-white overflow-hidden bg-amber-50">
                <NextImage
                  src="/assets/images/screen.png"
                  alt="Maa Jagadhatri"
                  fill
                  priority
                  sizes="(max-width: 640px) 80px, 192px"
                  className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Center Element: Devotional Copy & Pill CTA */}
          <div className="relative z-10 flex-1 text-left py-1 sm:py-2 px-1">
            
            {/* Mantine Badge */}
            <Badge
              leftSection={<Sparkles className="w-3 h-3 text-[#e59b2c]" />}
              variant="outline"
              color="yellow.8"
              radius="xl"
              className="bg-[#e59b2c]/12 border-[#e59b2c]/30 text-[#e59b2c] text-[10px] sm:text-xs font-bold uppercase font-sans mb-1 sm:mb-2"
            >
              Beautiful Moments
            </Badge>

            {/* Mantine Title */}
            <Title
              order={2}
              className="font-sans text-base sm:text-3xl md:text-4xl font-bold text-[#1f140e] tracking-tight drop-shadow-xs leading-tight"
            >
              Puja Gallery
            </Title>

            {/* Mantine Text */}
            <Text className="text-[11px] sm:text-xs md:text-sm text-[#7a6c60] mt-1 sm:mt-2 font-sans leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
              Relive the divine moments, vibrant pandals and the spirit of Jagadhatri Puja.
            </Text>

            {/* Mantine Button */}
            <Button
              component="a"
              href="#gallery"
              radius="xl"
              rightSection={<ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />}
              className="mt-2.5 sm:mt-5 bg-gradient-to-r from-[#f4b244] to-[#e59b2c] hover:from-[#e59b2c] hover:to-[#d97706] text-[#1c0508] font-bold text-[10px] sm:text-xs md:text-sm shadow-sm hover:shadow-md transition-all duration-200 font-sans group/btn border-none"
            >
              View Gallery
            </Button>

          </div>

          {/* Right Element: Photo Fan Stack on Right Side (Keeps Card Slim on Mobile!) */}
          <div className="relative z-10 w-24 h-24 sm:w-44 sm:h-36 md:w-56 md:h-48 shrink-0 flex items-center justify-center">
            
            {/* Top Photo Card (Rotated Right) */}
            <div className="absolute right-0 top-0 w-16 h-14 sm:w-28 sm:h-24 md:w-36 md:h-30 rounded-lg sm:rounded-xl overflow-hidden shadow-md border sm:border-2 border-white transform rotate-10 group-hover:rotate-14 transition-transform duration-300">
              <NextImage
                src="/assets/images/hero.png"
                alt="Pandal Night 1"
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>

            {/* Middle Photo Card (Rotated Left) */}
            <div className="absolute left-0 top-2 sm:top-4 w-16 h-14 sm:w-28 sm:h-24 md:w-36 md:h-30 rounded-lg sm:rounded-xl overflow-hidden shadow-lg border sm:border-2 border-white transform -rotate-8 group-hover:-rotate-12 transition-transform duration-300 z-10">
              <NextImage
                src="/assets/images/screen.png"
                alt="Pandal Night 2"
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>

            {/* Front Photo Card (Rotated Slight Right) */}
            <div className="absolute right-1 bottom-0 w-16 h-14 sm:w-28 sm:h-24 md:w-36 md:h-30 rounded-lg sm:rounded-xl overflow-hidden shadow-xl border sm:border-2 border-[#f4b244] transform rotate-3 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 z-20">
              <NextImage
                src="/assets/images/hero.png"
                alt="Pandal Night 3"
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>

          </div>

        </Box>

      </div>
    </Box>
  );
};

export default GallerySection;
