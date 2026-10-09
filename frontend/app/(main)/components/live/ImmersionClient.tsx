"use client";

import { useState } from "react";
import { liveImmersionData, LiveChannel } from "@/data/liveImmersion";
import BisarjanHeader from "./BisarjanHeader";
import BisarjanVideoPlayer from "./BisarjanVideoPlayer";
import BisarjanQueueSidebar from "./BisarjanQueueSidebar";
import BisarjanRouteMap from "./BisarjanRouteMap";
import BisarjanCommunityHelplines from "./BisarjanCommunityHelplines";

const ImmersionClient = () => {
  const { channels, immersionQueue } = liveImmersionData;
  const [activeChannel, setActiveChannel] = useState<LiveChannel>(channels[0]);

  return (
    <div className="w-full bg-alponaIvory text-[#1f140e] py-6 sm:py-8 px-4 sm:px-6 md:px-8 min-h-screen">
      <div className="max-w-[1240px] mx-auto space-y-8 sm:space-y-10">
        {/* HERO SECTION HEADER */}
        <BisarjanHeader />

        {/* MAIN RESPONSIVE GRID: LEFT PLAYER + RIGHT SIDEBAR QUEUE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: VIDEO PLAYER + CHANNEL SWITCHER (8 COLS ON DESKTOP) */}
          <div className="lg:col-span-8 w-full">
            <BisarjanVideoPlayer
              activeChannel={activeChannel}
              channels={channels}
              onSelectChannel={setActiveChannel}
            />
          </div>

          {/* RIGHT COLUMN: LIVE IMMERSION QUEUE & STRAND ROUTE TRACKER (4 COLS ON DESKTOP) */}
          <div className="lg:col-span-4 w-full">
            <BisarjanQueueSidebar
              queueItems={immersionQueue.items}
              totalCount={immersionQueue.totalPandalsCount}
            />
          </div>
        </div>

        {/* LOWER SECTION 1: INTERACTIVE STRAND ROAD IMMERSION MAP & SCHEDULE */}
        <div className="w-full">
          <BisarjanRouteMap />
        </div>

        {/* LOWER SECTION 2: LIVE COMMUNITY CHAT & EMERGENCY HELPLINES */}
        <div className="w-full">
          <BisarjanCommunityHelplines />
        </div>
      </div>
    </div>
  );
};

export default ImmersionClient;
