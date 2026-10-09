"use client";

import { useState } from "react";
import { Badge, Box, Button, Flex, Group, Paper, Text } from "@mantine/core";
import { Eye, Heart, Music } from "lucide-react";
import { liveImmersionData, LiveChannel } from "@/data/liveImmersion";

interface BisarjanVideoPlayerProps {
  activeChannel: LiveChannel;
  channels: LiveChannel[];
  onSelectChannel: (channel: LiveChannel) => void;
}

export default function BisarjanVideoPlayer({
  activeChannel,
  channels,
  onSelectChannel,
}: BisarjanVideoPlayerProps) {
  const { activeStream } = liveImmersionData;
  const [pranamCount, setPranamCount] = useState(1200);

  return (
    <Box className="flex flex-col gap-5">
      {/* VIDEO PLAYER FRAME */}
      <Paper
        radius="xl"
        className="relative bg-sacred-wine border border-[var(--color-gold-hairline)] shadow-2xl overflow-hidden"
      >
        {/* Top Overlay Status Bar */}
        <Box className="absolute top-0 left-0 right-0 z-20 px-4 py-3 bg-gradient-to-b from-[var(--color-sacred-wine)]/90 via-[var(--color-sacred-wine)]/40 to-transparent flex items-center justify-between pointer-events-none">
          <Group gap="xs">
            <Badge
              color="red"
              size="sm"
              radius="xl"
              className="bg-liveRed text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm px-2.5 py-0.5"
            >
              🔴 {activeStream.liveBadgeText}
            </Badge>

            <Text size="xs" c="amber.1" fw={500} className="hidden sm:inline drop-shadow-xs">
              {activeChannel.camNumber}: {activeChannel.name}
            </Text>
          </Group>

          <Group gap={6} className="text-xs text-amber-200/90 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <Eye className="w-3.5 h-3.5 text-[var(--color-saffron-gold-bright)]" />
            <Text size="xs" fw={700} c="white">
              {activeStream.watchingCount}
            </Text>{" "}
            watching
          </Group>
        </Box>

        {/* Video Aspect Ratio Wrapper (16:9) */}
        <Box className="relative w-full aspect-video bg-black">
          <iframe
            className="w-full h-full object-cover"
            src={activeChannel.streamUrl}
            title={activeChannel.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>

        {/* Bottom Control & Reaction Bar */}
        <Box className="p-4 bg-[var(--color-sacred-wine-elevated)] border-t border-[var(--color-gold-hairline)] flex flex-wrap items-center justify-between gap-3">
          <Group gap="xs">
            <Box className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <Text size="xs" fw={600} className="text-[var(--color-alpona-ivory-luminous)]">
              {activeStream.audioQualityText}
            </Text>
          </Group>

          {/* Devotional Reaction Buttons */}
          <Group gap="xs">
            <Button
              size="xs"
              variant="subtle"
              radius="xl"
              onClick={() => setPranamCount((prev) => prev + 1)}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 transition active:scale-95 px-3 py-1.5"
              leftSection={<span>🪷</span>}
            >
              Pranam ({(pranamCount / 1000).toFixed(1)}k)
            </Button>

            <Button
              size="xs"
              variant="subtle"
              radius="xl"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 transition active:scale-95 px-3 py-1.5"
              leftSection={<Music className="w-3.5 h-3.5 text-saffronGoldBright" />}
            >
              Dhak Beats
            </Button>

            <Button
              size="xs"
              variant="light"
              radius="xl"
              className="bg-saffronGold/20 hover:bg-saffronGold/30 text-saffronGoldBright text-xs font-bold border border-saffronGold/40 transition active:scale-95 px-3 py-1.5"
              leftSection={<Heart className="w-3.5 h-3.5 text-liveRed fill-liveRed" />}
            >
              Joy Maa Jagadhatri
            </Button>
          </Group>
        </Box>
      </Paper>

      {/* MULTI-CHANNEL SWITCHER TABS */}
      <Paper p="md" radius="xl" className="bg-white border border-[var(--color-card-border)] shadow-xs">
        <Text size="11px" fw={700} c="var(--color-text-secondary)" className="uppercase tracking-wider mb-2.5">
          Select Live Broadcast Camera View
        </Text>

        <Box className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {channels.map((channel) => {
            const isSelected = activeChannel.id === channel.id;
            return (
              <Button
                key={channel.id}
                onClick={() => onSelectChannel(channel)}
                className={`h-auto p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                  isSelected
                    ? "bg-[var(--color-sacred-wine)] text-white border-[var(--color-saffron-gold)] shadow-xs"
                    : "bg-[var(--color-alpona-ivory)] hover:bg-amber-100/50 text-[var(--color-text-primary)] border-[var(--color-card-border)]"
                }`}
              >
                <Flex justify="space-between" align="center" w="100%">
                  <Text
                    size="10px"
                    fw={700}
                    className={isSelected ? "text-[var(--color-saffron-gold-bright)]" : "text-[var(--color-text-secondary)]"}
                  >
                    {channel.camNumber}
                  </Text>
                  <Box className={`w-2 h-2 rounded-full ${channel.statusColor}`} />
                </Flex>

                <Text
                  size="xs"
                  fw={700}
                  className={`mt-1.5 line-clamp-1 ${isSelected ? "text-white" : "text-[var(--color-text-primary)]"}`}
                >
                  {channel.name}
                </Text>

                <Text
                  size="10px"
                  className={isSelected ? "text-amber-200/80" : "text-[var(--color-text-secondary)]"}
                >
                  {channel.subTitle}
                </Text>
              </Button>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
