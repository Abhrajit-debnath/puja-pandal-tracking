import { Box, Title, Text, Button } from "@mantine/core";
import { ArrowRight } from "lucide-react";

const BannerCTA = () => {
  return (
    <Box component="section" className="py-12 sm:py-16 bg-[#faf4ec]">
      <div className="max-w-(--container-max-width) mx-auto px-4 sm:px-6">
        
        <div className="relative bg-[#1c0508] text-white rounded-3xl p-6 sm:p-10 border border-[#f4b244]/30 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        

          {/* Center Title & Tagline */}
          <div className="text-center md:text-left flex-1">
            <Title order={2} className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Be a part of the Celebration
            </Title>
            <Text className="text-xs sm:text-sm text-amber-100/80 font-sans mt-1 tracking-wide">
              Explore • Visit • Feel the Divine
            </Text>
          </div>

          {/* Right CTA Button */}
          <Button
            component="a"
            href="#pandals"
            radius="xl"
            rightSection={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            className="px-7 py-3 rounded-full bg-[#f4b244] hover:bg-[#e59b2c] text-[#1c0508] font-bold text-xs sm:text-sm shadow-md transition duration-200 shrink-0 cursor-pointer group font-sans border-none h-auto"
          >
            Explore Pandals
          </Button>

        </div>

      </div>
    </Box>
  );
};

export default BannerCTA;
