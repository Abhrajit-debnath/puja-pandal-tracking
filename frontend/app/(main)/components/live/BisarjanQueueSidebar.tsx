"use client";

import { motion } from "motion/react";
import { Badge, Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Navigation } from "lucide-react";
import { liveImmersionData, ImmersionQueueItem } from "@/data/liveImmersion";

interface BisarjanQueueSidebarProps {
  queueItems: ImmersionQueueItem[];
  totalCount: number;
}

export default function BisarjanQueueSidebar({
  queueItems,
  totalCount,
}: BisarjanQueueSidebarProps) {
  const { routeGpsStatus } = liveImmersionData;

  return (
    <Box className="flex flex-col gap-5">
      {/* CARD 1: LIVE IMMERSION ORDER QUEUE */}
      <Paper
        p="lg"
        radius="xl"
        className="bg-white border border-[var(--color-card-border)] shadow-xs flex flex-col h-[400px]"
      >
        <Flex justify="space-between" align="center" className="pb-3 border-b border-[var(--color-card-border)] mb-3">
          <Box>
            <Text fw={700} size="base" className="text-[var(--color-text-primary)]">
              Live Immersion Queue
            </Text>
            <Text size="11px" c="var(--color-text-secondary)">
              Realtime Rani Ghat sequence feed
            </Text>
          </Box>
          <Badge
            variant="light"
            size="md"
            radius="xl"
            className="bg-amber-100 text-[var(--color-saffron-gold)] text-[11px] font-bold"
          >
            {totalCount} Pandals
          </Badge>
        </Flex>

        {/* Queue Timeline List (Scrollable) */}
        <Box className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
          {queueItems.map((item, index) => {
            const isImmersing = item.status === "IMMERSING";
            const isNext = item.status === "NEXT";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Box
                  className={`p-3.5 rounded-2xl flex items-start gap-3 transition ${
                    isImmersing
                      ? "bg-[var(--color-sacred-wine)] text-white border border-[var(--color-gold-hairline)]"
                      : "bg-[var(--color-alpona-ivory)] border border-[var(--color-card-border)] hover:border-saffronGold/40"
                  }`}
                >
                  <Box
                    className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                      isImmersing
                        ? "bg-[var(--color-saffron-gold)] text-[var(--color-sacred-wine)]"
                        : isNext
                        ? "bg-amber-200/80 text-[var(--color-text-primary)]"
                        : "bg-gray-100 text-[var(--color-text-secondary)]"
                    }`}
                  >
                    #{item.queueNumber}
                  </Box>

                  <Box className="flex-1 min-w-0">
                    <Flex justify="space-between" align="center">
                      <Text
                        size="10px"
                        fw={700}
                        className={`uppercase tracking-wider ${
                          isImmersing
                            ? "text-[var(--color-saffron-gold-bright)]"
                            : isNext
                            ? "text-[var(--color-saffron-gold)]"
                            : "text-[var(--color-text-secondary)]"
                        }`}
                      >
                        {item.statusText}
                      </Text>

                      {isImmersing ? (
                        <Badge
                          size="xs"
                          color="red"
                          radius="sm"
                          className="bg-liveRed text-white font-bold animate-pulse text-[9px] px-1.5"
                        >
                          IMMERSING
                        </Badge>
                      ) : (
                        <Text size="10px" c="var(--color-text-secondary)" fw={500}>
                          {item.eta}
                        </Text>
                      )}
                    </Flex>

                    <Text
                      size="sm"
                      fw={700}
                      className={`line-clamp-1 mt-0.5 ${
                        isImmersing ? "text-white" : "text-[var(--color-text-primary)]"
                      }`}
                    >
                      {item.pandalName}
                    </Text>

                    <Text
                      size="11px"
                      className={`mt-0.5 ${
                        isImmersing ? "text-amber-100/80" : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {item.description}
                    </Text>
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </Paper>

      {/* CARD 2: STRAND ROAD GPS ROUTE STATUS */}
      <Paper
        p="lg"
        radius="xl"
        className="bg-[var(--color-sacred-wine)] text-white border border-[var(--color-gold-hairline)] shadow-lg flex flex-col justify-between min-h-[160px]"
      >
        <Box>
          <Flex justify="space-between" align="center" mb={6}>
            <Text size="10px" fw={700} className="text-[var(--color-saffron-gold-bright)] uppercase tracking-wider">
              {routeGpsStatus.tagline}
            </Text>
            <Text size="xs" className="text-amber-200/80" fw={500}>
              {routeGpsStatus.circuitName}
            </Text>
          </Flex>

          <Text size="base" fw={700} className="text-white">
            {routeGpsStatus.title}
          </Text>

          <Text size="xs" className="text-amber-100/80 mt-1">
            {routeGpsStatus.description}
          </Text>
        </Box>

        <Flex justify="space-between" align="center" className="mt-4 pt-3 border-t border-[var(--color-gold-hairline)]">
          <Text size="xs" className="text-amber-200/90" fw={500}>
            {routeGpsStatus.activeStatus}
          </Text>

          <Button
            size="xs"
            radius="xl"
            className="bg-[var(--color-saffron-gold)] hover:bg-[var(--color-saffron-gold-bright)] text-[var(--color-sacred-wine)] font-bold text-xs transition shadow-sm"
            leftSection={<Navigation className="w-3 h-3 text-[var(--color-sacred-wine)]" />}
          >
            {routeGpsStatus.ctaText}
          </Button>
        </Flex>
      </Paper>
    </Box>
  );
}
