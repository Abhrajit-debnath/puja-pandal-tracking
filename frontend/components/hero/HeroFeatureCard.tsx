"use client";

import { MapPin, Video, Users, Image as ImageIcon, Loader2 } from "lucide-react";
import { useLocationStore } from "@/store/useLocationStore";

type HeroFeatureCardProps = {
  card: {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
  };
  className?: string;
};

const HeroFeatureCard = ({ card, className = "" }: HeroFeatureCardProps) => {
  const { fetchNearbyPandals, isLoading } = useLocationStore();

  const getIconTheme = (id: string) => {
    switch (id) {
      case "nearest":
        return { Icon: MapPin, bg: "bg-[#fde8e8]", color: "text-[#e53935]" };
      case "live":
        return { Icon: Video, bg: "bg-[#e0f2f1]", color: "text-[#00897b]" };
      case "crowd":
        return { Icon: Users, bg: "bg-[#fff3e0]", color: "text-[#f57c00]" };
      case "gallery":
        return { Icon: ImageIcon, bg: "bg-[#f3e5f5]", color: "text-[#8e24aa]" };
      default:
        return { Icon: MapPin, bg: "bg-gray-100", color: "text-gray-700" };
    }
  };

  const { Icon, bg, color } = getIconTheme(card.id);
  const titleParts = card.title.split(" ");
  const isNearestCard = card.id === "nearest";

  const handleClick = (e: React.MouseEvent) => {
    if (isNearestCard) {
      e.preventDefault();
      fetchNearbyPandals(); 
    }
  };

  return (
    <a
      href={card.href}
      onClick={handleClick}
      className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl hover:bg-black/3 transition duration-200 cursor-pointer group ${className}`}
    >
      {/* Icon Circle */}
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 ${bg} group-hover:scale-105 transition-transform duration-200 shadow-xs`}
      >
        {isNearestCard && isLoading ? (
          <Loader2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#e53935] animate-spin" />
        ) : (
          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${color}`} strokeWidth={2.2} />
        )}
      </div>

      {/* Card Title */}
      <div className="mb-1">
        <h3 className="text-[#1f140e] font-sans text-sm sm:text-base font-bold leading-tight">
          {titleParts[0]}
        </h3>
        {titleParts.length > 1 && (
          <h3 className="text-[#1f140e] font-sans text-sm sm:text-base font-bold leading-tight">
            {titleParts.slice(1).join(" ")}
          </h3>
        )}
      </div>

      {/* Card Subtitle */}
      <p className="text-[#7a6c60] font-sans text-[11px] sm:text-xs leading-snug max-w-[140px] mt-0.5">
        {isNearestCard && isLoading ? "Locating pandals..." : card.description}
      </p>
    </a>
  );
};

export default HeroFeatureCard;