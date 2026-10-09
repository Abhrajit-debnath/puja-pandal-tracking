"use client";

import { motion } from "motion/react";
import { Badge, Paper, Text, Title } from "@mantine/core";
import { MapPin } from "lucide-react";
import { liveImmersionData } from "@/data/liveImmersion";

interface BisarjanHeaderProps {
  onOpenMap?: () => void;
}

export default function BisarjanHeader({ onOpenMap }: BisarjanHeaderProps) {
  const { header } = liveImmersionData;

  return (
    <header className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="light"
              color="red"
              size="sm"
              radius="xl"
              className="bg-liveRed/10 border border-liveRed/30 text-liveRed font-bold uppercase tracking-wider px-3 py-1"
              leftSection={
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-liveRed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-liveRed"></span>
                </span>
              }
            >
              {header.officialBadge}
            </Badge>

            <Text size="xs" c="var(--color-text-secondary)" fw={600}>
              • {header.locationTag}
            </Text>
          </div>

          <Title
            order={1}
            className=" text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight"
          >
            {header.title}{" "}
            <Text component="span" inherit className="text-saffronGold block sm:inline">
              {header.year}
            </Text>
          </Title>

          <Text size="sm" className="sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-2xl">
            {header.subtitle}
          </Text>
        </motion.div>

        {/* Live Strand Density Badge */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <Paper
            p="sm"
            radius="lg"
            className="bg-white border border-[var(--color-card-border)] shadow-xs flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-saffronGold flex items-center justify-center text-xl shrink-0">
              <MapPin className="w-5 h-5 text-[var(--color-saffron-gold)]" />
            </div>
            <div>
              <Text size="xs" c="var(--color-text-secondary)" fw={500}>
                {header.strandDensity.label}
              </Text>
              <Text size="xs" fw={700} className="text-liveRed flex items-center gap-1">
                <span> {header.strandDensity.status}</span>
                <Text component="span" size="10px" c="var(--color-text-secondary)" fw={500}>
                  ({header.strandDensity.estWait})
                </Text>
              </Text>
            </div>
          </Paper>
        </motion.div> */}
      </div>
    </header>
  );
}
