"use client";

import { motion } from "motion/react";
import { Badge, Box, Flex, Group, Paper, Progress, Text, Title } from "@mantine/core";
import { liveImmersionData } from "@/data/liveImmersion";

export default function BisarjanRouteMap() {
  const { routeMilestones } = liveImmersionData;

  return (
    <Paper
      p={{ base: "lg", sm: "xl" }}
      radius="2xl"
      className="bg-white border border-[var(--color-card-border)] shadow-xs"
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "flex-start", sm: "center" }}
        justify="space-between"
        gap="md"
        mb="lg"
      >
        <Box>
          <Text size="xs" fw={700} className="text-[var(--color-saffron-gold)] uppercase tracking-wider">
            {routeMilestones.sectionTagline}
          </Text>
          <Title order={2} className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mt-1">
            {routeMilestones.sectionTitle}
          </Title>
        </Box>

        <Group gap="xs">
          <Badge color="green" radius="xl" size="md" className="bg-emerald-100 text-emerald-800 text-xs font-bold">
            Route Open
          </Badge>
          <Badge color="amber" radius="xl" size="md" className="bg-amber-100 text-amber-800 text-xs font-bold">
            Traffic Diverted
          </Badge>
        </Group>
      </Flex>

      {/* Route Milestones Progress Bar */}
      <Box className="relative py-4">
        <Progress
          value={75}
          size="sm"
          radius="xl"
          className="bg-gray-200"
          color="var(--color-saffron-gold)"
        />

        <Box className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {routeMilestones.checkpoints.map((cp, idx) => (
            <motion.div
              key={cp.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <Paper
                p="md"
                radius="xl"
                className={
                  cp.isHead
                    ? "bg-[var(--color-sacred-wine)] text-white border border-[var(--color-saffron-gold)]"
                    : "bg-[var(--color-alpona-ivory)] border border-[var(--color-card-border)]"
                }
              >
                <Text
                  size="10px"
                  fw={700}
                  className={cp.isHead ? "text-[var(--color-saffron-gold-bright)] uppercase" : "text-[var(--color-text-secondary)] uppercase"}
                >
                  CheckPoint {cp.stepNumber} {cp.isHead ? "(Head)" : ""}
                </Text>

                <Text
                  size="sm"
                  fw={700}
                  className={`mt-1 ${cp.isHead ? "text-white" : "text-[var(--color-text-primary)]"}`}
                >
                  {cp.name}
                </Text>

                <Text size="xs" fw={600} className={`mt-0.5 ${cp.statusColor}`}>
                  {cp.statusText}
                </Text>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
