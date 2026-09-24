import NextImage from "next/image";
import { homeData } from "@/data/home";
import { Box, Title, Text, Button, Badge, Card } from "@mantine/core";
import { Calendar, ArrowRight, Play } from "lucide-react";

const LatestUpdatesSection = () => {
  return (
    <Box component="section" className=" bg-[#faf4ec]">
      <div className="max-w-(--container-max-width) mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm">🪷</span>
              <Text component="span" className="text-xs sm:text-sm font-bold tracking-wide text-[#e59b2c] uppercase font-sans">
                Latest Updates
              </Text>
            </div>

            <Title order={2} className="font-sans text-2xl sm:text-3xl font-bold text-[#1f140e] tracking-tight">
              News, events and everything about Jagadhatri Puja
            </Title>
          </div>

          <Button
            component="a"
            href="#updates"
            variant="subtle"
            rightSection={<ArrowRight className="w-4 h-4" />}
            className="text-xs sm:text-sm font-bold text-[#dc2626] hover:bg-transparent hover:text-[#b91c1c] transition p-0 cursor-pointer self-start sm:self-auto shrink-0 font-sans"
          >
            View All
          </Button>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeData.latestUpdates.map((item) => {
            const getBadgeProps = (cat: string) => {
              if (cat === "Event") return { color: "red", className: "bg-[#ffebee] text-[#dc2626]" };
              if (cat === "Update") return { color: "orange", className: "bg-[#fff3e0] text-[#e65100]" };
              return { color: "violet", className: "bg-[#f3e5f5] text-[#8e24aa]" };
            };

            const badgeProps = getBadgeProps(item.category);

            return (
              <Card
                key={item.id}
                component="a"
                href={item.href}
                radius="xl"
                withBorder
                padding="md"
                className="bg-white border-[#f0e5d3] flex flex-row items-center gap-4 shadow-xs hover:shadow-md transition duration-200 group cursor-pointer"
              >
                {/* Image Thumbnail with Overlay Play Icon */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <NextImage
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-xs">
                      <Play className="w-3 h-3 text-[#dc2626] fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex-1 min-w-0">
                  <Badge
                    radius="xl"
                    size="xs"
                    className={`font-bold uppercase tracking-wider font-sans mb-1 ${badgeProps.className}`}
                  >
                    {item.category}
                  </Badge>

                  <Text className="font-sans font-bold text-xs sm:text-sm text-[#1f140e] line-clamp-2 leading-snug group-hover:text-[#e59b2c] transition-colors">
                    {item.title}
                  </Text>

                  <div className="flex items-center gap-1 mt-2 text-[11px] font-sans font-medium text-[#7a6c60]">
                    <Calendar className="w-3 h-3" />
                    <Text component="span" className="text-[11px] text-[#7a6c60]">
                      {item.date}
                    </Text>
                  </div>
                </div>

                {/* Circular Arrow Button */}
                <div className="w-7 h-7 rounded-full bg-[#f5efe6] group-hover:bg-[#f4b244] text-[#1f140e] flex items-center justify-center transition duration-200 shrink-0 self-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </Box>
  );
};

export default LatestUpdatesSection;
