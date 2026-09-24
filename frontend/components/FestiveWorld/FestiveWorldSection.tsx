import NextImage from "next/image";
import { homeData } from "@/data/home";
import { Box, Title, Text, Button, Card } from "@mantine/core";
import { Play, ArrowRight } from "lucide-react";

const FestiveWorldSection = () => {
  return (
    <Box component="section" className="py-12 sm:py-16 bg-[#faf4ec]">
      <div className="max-w-(--container-max-width) mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm">🪷</span>
              <Text component="span" className="text-xs sm:text-sm font-bold tracking-wide text-[#e59b2c] uppercase font-sans">
                Explore the Festive World
              </Text>
            </div>

            <Title order={2} className="font-sans text-2xl sm:text-3xl font-bold text-[#1f140e] tracking-tight">
              Relive the moments, feel the vibes
            </Title>
          </div>

          <Button
            component="a"
            href="#gallery"
            variant="subtle"
            rightSection={<ArrowRight className="w-4 h-4" />}
            className="text-xs sm:text-sm font-bold text-[#dc2626] hover:bg-transparent hover:text-[#b91c1c] transition p-0 cursor-pointer self-start sm:self-auto shrink-0 font-sans"
          >
            View All
          </Button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeData.festiveWorld.map((item) => (
            <Card
              key={item.id}
              radius="xl"
              withBorder
              padding={0}
              className="bg-white border-[#f0e5d3] overflow-hidden shadow-xs hover:shadow-md transition duration-200 group flex flex-col cursor-pointer"
            >
              {/* Thumbnail Container with Glass Play Button Overlay */}
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-gray-100">
                <NextImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Dark Tint & Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/95 text-[#dc2626] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-5 h-5 fill-current ml-0.5 text-[#dc2626]" />
                  </div>
                </div>
              </div>

              {/* Card Title & Subtitle */}
              <div className="p-4 flex items-center justify-between bg-white">
                <div>
                  <Text className="font-sans font-bold text-base text-[#1f140e] group-hover:text-[#e59b2c] transition-colors">
                    {item.title}
                  </Text>
                  <Text className="text-[#7a6c60] text-xs font-sans font-medium mt-0.5">
                    {item.caption}
                  </Text>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#f5efe6] group-hover:bg-[#f4b244] text-[#1f140e] flex items-center justify-center transition duration-200 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </Box>
  );
};

export default FestiveWorldSection;
