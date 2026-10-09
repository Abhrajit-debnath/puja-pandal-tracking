"use client";

import { useState } from "react";
import { Box, Container } from "@mantine/core";
import { liveImmersionData, LiveChannel } from "@/data/liveImmersion";
import BisarjanHeader from "./BisarjanHeader";
import BisarjanVideoPlayer from "./BisarjanVideoPlayer";
import BisarjanQueueSidebar from "./BisarjanQueueSidebar";
import BisarjanRouteMap from "./BisarjanRouteMap";
import BisarjanCommunityHelplines from "./BisarjanCommunityHelplines";

export default function BisarjanLiveSection() {
  const { channels, immersionQueue } = liveImmersionData;
  const [activeChannel, setActiveChannel] = useState<LiveChannel>(channels[0]);

  return (
    <Box component="main" className="min-h-screen bg-[var(--color-alpona-ivory)] text-[var(--color-text-primary)] py-8 px-4 sm:px-6">
      <Container size="var(--container-max-width)" className="space-y-10 px-0">
        {/* HERO SECTION HEADER */}
        <BisarjanHeader />

        {/* MAIN GRID: LEFT PLAYER + RIGHT SIDEBAR QUEUE */}
        <Box className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: VIDEO PLAYER + CHANNEL SWITCHER (8 COLS) */}
          <Box className="lg:col-span-8">
            <BisarjanVideoPlayer
              activeChannel={activeChannel}
              channels={channels}
              onSelectChannel={setActiveChannel}
            />
          </Box>

          {/* RIGHT COLUMN: LIVE IMMERSION QUEUE & STRAND ROUTE TRACKER (4 COLS) */}
          <Box className="lg:col-span-4">
            <BisarjanQueueSidebar
              queueItems={immersionQueue.items}
              totalCount={immersionQueue.totalPandalsCount}
            />
          </Box>
        </Box>

        {/* LOWER SECTION 1: INTERACTIVE STRAND ROAD IMMERSION MAP & SCHEDULE */}
        <BisarjanRouteMap />

        {/* LOWER SECTION 2: LIVE COMMUNITY CHAT & EMERGENCY HELPLINES */}
        <BisarjanCommunityHelplines />
      </Container>
    </Box>
  );
}
