"use client";

import { useState } from "react";
import { Home, Landmark, Radio, Images, User, Loader2 } from "lucide-react";
import { useLocationStore } from "@/store/useLocationStore";
import Link from 'next/link'
const navItems = [
  { id: "home", label: "Home", icon: Home, href: "#" },
  { id: "suggest", label: "Suggest", icon: Landmark, href: "#" },
  { id: "live", label: "Live", icon: Radio, href: "/live/immersion", isHero: true },
  { id: "gallery", label: "Gallery", icon: Images, href: "#gallery" },
  { id: "profile", label: "Profile", icon: User, href: "#profile" },
];


type BottomFloatingBarProps = {
  handleLoading: (targetRoute: string) => void;
};
const BottomFloatingBar = ({handleLoading}: BottomFloatingBarProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const { fetchNearbyPandals, isLoading } = useLocationStore();

  const handleTabClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    setActiveTab(item.id);

    if (item.id === "suggest") {

      fetchNearbyPandals();
    }
  };




  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
      {/* Floating Glass Bar Container */}
      <div className="bg-white/90 backdrop-blur-md border border-[#f0e5d3] rounded-full px-4 py-2.5 shadow-xl shadow-[#2a0910]/10 flex items-center justify-between relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          // Hero Center Button (Live)
          if (item.isHero) {
            return (
              <button
                key={item.id}
               
                onClick={()=>handleLoading("/live/immersion")}
                className="flex flex-col items-center justify-center relative -top-7 cursor-pointer group"
              >
                {/* Red Circular Button */}
                <div className="w-12 h-12 rounded-full bg-live-red text-white flex items-center justify-center shadow-lg shadow-[#dc2626]/40 group-hover:scale-105 transition-transform duration-200 border border-white relative z-10">
                  <div className="absolute rounded-full bg-[#dc2626]/20 h-12 w-12 animate-ping pointer-events-none" />
                  <Icon className="w-5 h-5 animate-pulse" strokeWidth={2.2} />
                </div>

                {/* Label */}
                <span className="text-sm font-bold text-live-red mt-1 tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          }

          // Standard Navigation Tabs
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleTabClick(e, item)}
              className={`flex flex-col items-center justify-center px-2 py-1 cursor-pointer transition-colors duration-200 group ${isActive ? "text-saffron-gold" : "text-[#7a6c60] hover:text-[#1f140e]"
                }`}
            >
              {item.id === "suggest" && isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-saffron-gold" />
              ) : (
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-saffron-gold" : "text-[#7a6c60] group-hover:text-[#1f140e]"
                    }`}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
              )}
              <span
                className={`text-[11px] mt-0.5 tracking-tight font-sans ${isActive ? "font-bold text-saffron-gold" : "font-medium text-[#7a6c60]"
                  }`}
              >
                {item.id === "suggest" && isLoading ? "Locating..." : item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BottomFloatingBar;
