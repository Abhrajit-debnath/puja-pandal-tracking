"use client";

import { useState } from "react";
import { Badge, Box, Button, Flex, Paper, Text, TextInput, Title } from "@mantine/core";
import { MessageSquare, Send, ShieldAlert } from "lucide-react";
import { liveImmersionData, DevotionalComment } from "@/data/liveImmersion";

export default function BisarjanCommunityHelplines() {
  const { devotionalComments, emergencyHelplines } = liveImmersionData;
  const [comments, setComments] = useState<DevotionalComment[]>(devotionalComments.comments);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendComment = () => {
    if (!inputMessage.trim()) return;

    const newComment: DevotionalComment = {
      id: `c-${Date.now()}`,
      author: "You",
      initials: "ME",
      location: "Chandannagar",
      timeAgo: "Just now",
      message: inputMessage.trim(),
      avatarBg: "bg-[var(--color-saffron-gold)] text-[var(--color-sacred-wine)]",
    };

    setComments([newComment, ...comments]);
    setInputMessage("");
  };

  return (
    <Box className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      {/* COMMUNITY CHAT FEED (8 COLS) */}
      <Paper
        p="lg"
        radius="2xl"
        className="md:col-span-8 bg-white border border-[var(--color-card-border)] shadow-xs flex flex-col h-[420px]"
      >
        <Flex justify="space-between" align="center" className="pb-3 border-b border-[var(--color-card-border)] mb-4">
          <Flex align="center" gap="xs">
            <MessageSquare className="w-5 h-5 text-[var(--color-saffron-gold)]" />
            <Box>
              <Text fw={700} size="base" className="text-[var(--color-text-primary)]">
                {devotionalComments.title}
              </Text>
              <Text size="11px" c="var(--color-text-secondary)">
                {devotionalComments.subtitle}
              </Text>
            </Box>
          </Flex>

          <Badge color="green" radius="xl" size="xs" className="bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1">
            {devotionalComments.realtimeSyncBadge}
          </Badge>
        </Flex>

        {/* Chat Stream Messages (Scrollable) */}
        <Box className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {comments.map((cmt) => (
            <Box
              key={cmt.id}
              className="p-3 rounded-2xl bg-[var(--color-alpona-ivory)] border border-[var(--color-card-border)] flex items-start gap-3"
            >
              <Box
                className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${cmt.avatarBg}`}
              >
                {cmt.initials}
              </Box>

              <Box>
                <Flex align="center" gap="xs">
                  <Text size="xs" fw={700} className="text-[var(--color-text-primary)]">
                    {cmt.author}
                  </Text>
                  <Text size="10px" c="var(--color-text-secondary)">
                    {cmt.location} • {cmt.timeAgo}
                  </Text>
                </Flex>

                <Text size="xs" className="text-[var(--color-text-primary)] mt-1">
                  {cmt.message}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Chat Input Field */}
        <Flex align="center" gap="xs" className="pt-3 border-t border-[var(--color-card-border)] mt-2">
          <TextInput
            placeholder="Type your message or Pranam..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
            radius="xl"
            size="xs"
            className="flex-1"
            styles={{
              input: {
                backgroundColor: "var(--color-alpona-ivory)",
                borderColor: "var(--color-card-border)",
                color: "var(--color-text-primary)",
              },
            }}
          />
          <Button
            radius="xl"
            size="xs"
            onClick={handleSendComment}
            className="bg-[var(--color-saffron-gold)] hover:bg-[var(--color-saffron-gold-bright)] text-[var(--color-sacred-wine)] font-bold transition"
            rightSection={<Send className="w-3 h-3 text-[var(--color-sacred-wine)]" />}
          >
            Send
          </Button>
        </Flex>
      </Paper>

      {/* FAQS & HELPLINE (4 COLS) */}
      <Paper
        p="lg"
        radius="2xl"
        className="md:col-span-4 bg-[var(--color-sacred-wine)] text-white border border-[var(--color-gold-hairline)] shadow-md flex flex-col justify-between h-[420px]"
      >
        <Box>
          <Flex align="center" gap={6} className="text-[var(--color-saffron-gold-bright)] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4 text-[var(--color-saffron-gold-bright)]" />
            {emergencyHelplines.headerTag}
          </Flex>

          <Title order={3} className=" text-xl font-bold text-white mb-4">
            {emergencyHelplines.title}
          </Title>

          <Box className="space-y-3 text-xs">
            {emergencyHelplines.helplines.map((hp) => (
              <Box
                key={hp.id}
                className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between"
              >
                <Box>
                  <Text size="10px" className="text-amber-200/80">
                    {hp.title}
                  </Text>
                  <Text size="sm" fw={700} className="text-white">
                    {hp.phone}
                  </Text>
                </Box>
                <Badge
                  radius="sm"
                  size="xs"
                  className={`font-bold text-[10px] px-2 py-1 ${hp.badgeBg}`}
                >
                  {hp.badgeText}
                </Badge>
              </Box>
            ))}
          </Box>
        </Box>

        <Text size="11px" className="pt-3 border-t border-[var(--color-gold-hairline)] text-amber-200/70 text-center">
          {emergencyHelplines.footerText}
        </Text>
      </Paper>
    </Box>
  );
}
