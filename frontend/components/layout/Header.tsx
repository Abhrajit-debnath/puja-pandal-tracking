"use client";

import NextImage from "next/image";
import { homeData } from "@/data/home";
import { motion } from "motion/react";
import TopFloatingUserCountBar from "./TopFloatingUserCountBar";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 w-full px-4 py-4 z-50">
      <div className="max-w-(--container-max-width) mx-auto flex items-center justify-between">
        
        {/* Animated Brand Logo & Text */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          {/* Logo Icon Container with Golden Glow & Rotation Hover */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1, rotate: 8 }}
            className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#f4b244]/20 via-[#1c0508] to-[#e59b2c]/30 p-1.5 border border-[#f4b244]/40 shadow-[0_0_15px_rgba(244,178,68,0.25)] group-hover:shadow-[0_0_22px_rgba(244,178,68,0.55)] transition-all duration-300 flex items-center justify-center"
          >
            <NextImage 
              src={homeData.hero.logo} 
              alt="Jagadhatri Logo" 
              width={36} 
              height={36} 
              priority 
              className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            />
          </motion.div>

          {/* Animated Logo Text Column */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, filter: "blur(6px)", y: 5 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-1.5 leading-none"
            >
              <span className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight bg-gradient-to-r from-[#fffbf5] via-amber-100 to-[#f4b244] bg-clip-text text-transparent drop-shadow-xs">
                Jagadhatri
              </span>
            </motion.div>

            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[11px] font-semibold text-[#f4b244] tracking-wider uppercase mt-0.5 flex items-center gap-1 opacity-90"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f4b244] animate-pulse" />
              Parikrama
            </motion.span>
          </div>
        </motion.div>

        {/* Live Devotees Count Badge */}
        <div className="flex items-center">
          <TopFloatingUserCountBar />
        </div>

      </div>
    </header>
  );
};

export default Header;