import NextImage from "next/image";
import { Card, Text, Badge } from "@mantine/core";
import { MapPin, Users, ArrowRight } from "lucide-react";

export type PandalItem = {
  id: string;
  name: string;
  location: string;
  visitorCount: string;
  badge?: string | null;
  badgeType?: "popular" | "live" | string | null;
  image: string;
  href: string;
};

type FeaturedCardProps = {
  pandal: PandalItem;
};

const FeaturedCard = ({ pandal }: FeaturedCardProps) => {
  return (
    <Card
      radius="xl"
      withBorder
      padding={0}
      className="bg-white border-[#f0e5d3] overflow-hidden shadow-xs hover:shadow-md transition duration-200 group flex flex-col h-full cursor-pointer"
    >
      {/* Image Container with Mantine Badges */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-gray-100">
        <NextImage
          src={pandal.image.startsWith("/") ? pandal.image : `/${pandal.image}`}
          alt={pandal.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge Overlay */}
        {pandal.badge && (
          <div className="absolute top-3 left-3 z-10">
            {pandal.badgeType === "live" ? (
              <Badge
                color="red"
                radius="xl"
                size="sm"
                leftSection={<span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                className="font-bold bg-[#dc2626] text-white"
              >
                {pandal.badge}
              </Badge>
            ) : (
              <Badge
                color="yellow"
                radius="xl"
                size="sm"
                className="font-bold bg-[#f4b244] text-[#1c0508]"
              >
                {pandal.badge}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Card Details with Mantine Text */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <Text className="font-sans font-bold text-base text-[#1f140e] line-clamp-1 group-hover:text-[#e59b2c] transition-colors">
            {pandal.name}
          </Text>

          <div className="flex items-center gap-1 mt-1 text-[#7a6c60] text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
            <Text component="span" className="text-xs text-[#7a6c60]">
              {pandal.location}
            </Text>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#f0e5d3]/60">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#e65100]">
            <Users className="w-4 h-4" />
            <Text component="span" className="text-xs font-bold text-[#e65100]">
              {pandal.visitorCount}
            </Text>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#f5efe6] group-hover:bg-[#f4b244] text-[#1f140e] flex items-center justify-center transition duration-200">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedCard;
