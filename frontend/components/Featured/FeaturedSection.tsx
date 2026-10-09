"use client";

import { homeData } from "@/data/home";
import FeaturedCard from "./FeaturedCard";
import { Box, Title, Text, Button } from "@mantine/core";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { BannerAnimator } from "@/app/animators/Banner.animator";

const FeaturedSection = () => {
  return (
    <Box component="section" id="pandals" className="py-12 sm:py-16 bg-[#faf4ec]">
      <div className="max-w-(--container-max-width) mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <motion.div 
          initial={BannerAnimator.ScrollHeaderReveal.initials}
          whileInView={BannerAnimator.ScrollHeaderReveal.animate}
          viewport={{ once: true, amount: 0.3 }}
          transition={BannerAnimator.ScrollHeaderReveal.transition}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm">🪷</span>
              <Text component="span" className="text-xs sm:text-sm font-bold tracking-wide text-[#e59b2c] uppercase font-sans">
                Featured Pandal
              </Text>
            </div>

            <Title order={2} className="font-sans text-2xl sm:text-3xl font-bold text-[#1f140e] tracking-tight">
              Top Pandals to Visit
            </Title>

            <Text className="text-xs sm:text-sm text-[#7a6c60] mt-1 max-w-xl font-sans">
              Experience the grandeur, artistry and devotion of Jagadhatri Puja at the most popular pandals.
            </Text>
          </div>

          <Button
            component="a"
            href="#pandals"
            variant="subtle"
            rightSection={<ArrowRight className="w-4 h-4" />}
            className="text-xs sm:text-sm font-bold text-[#dc2626] hover:bg-transparent hover:text-[#b91c1c] transition p-0 cursor-pointer self-start sm:self-auto shrink-0 font-sans"
          >
            View All
          </Button>
        </motion.div>

        {/* Pandals Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeData.featuredPandals.map((pandal, idx) => (
            <motion.div
              key={pandal.id}
              initial={BannerAnimator.ScrollCardItemReveal.initials}
              whileInView={BannerAnimator.ScrollCardItemReveal.animate}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                ...BannerAnimator.ScrollCardItemReveal.transition,
                delay: idx * 0.12,
              }}
            >
              <FeaturedCard pandal={pandal} />
            </motion.div>
          ))}
        </div>

      </div>
    </Box>
  );
};

export default FeaturedSection;
