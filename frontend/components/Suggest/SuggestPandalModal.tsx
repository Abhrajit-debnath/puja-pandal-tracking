"use client";

import { useState } from "react";
import { Modal, Text, Title, Button, Loader, Badge, Card } from "@mantine/core";
import { useLocationStore } from "@/store/useLocationStore";
import { MapPin, Navigation, Sparkles, Navigation2, CheckCircle2, Users, ChevronDown, ChevronUp } from "lucide-react";
import NextImage from "next/image";
import { apiClient } from "@/app/config/apiClient/apiClient";

const BACKEND_PORT = process.env.NEXT_PUBLIC_BACKEND_PORT || "8000";

const SuggestPandalModal = () => {
  const { isModalOpen, closeModal, nearbyPandals, isLoading, error, coords, fetchNearbyPandals } =
    useLocationStore();

  const [expandedPandalId, setExpandedPandalId] = useState<string | null>(null);
  const [submittingPandalId, setSubmittingPandalId] = useState<string | null>(null);
  const [reportedStatus, setReportedStatus] = useState<Record<string, string>>({});

  const handleReportCrowd = async (pandalId: string, level: "CALM" | "BUSY" | "PACKED") => {
    try {
      setSubmittingPandalId(pandalId);
      const url = `http://localhost:${BACKEND_PORT}/api/v1/pandals/${pandalId}/checkins`;

      await apiClient.post(url, { crowdLevel: level });

      setReportedStatus((prev) => ({ ...prev, [pandalId]: level }));
    } catch (err) {
      console.error("Failed to submit checkin:", err);
    } finally {
      setSubmittingPandalId(null);
    }
  };

  return (
    <Modal
      opened={isModalOpen}
      onClose={closeModal}
      title={
        <div className="flex items-center gap-2">
          <span className="text-xl">🪷</span>
          <div>
            <Title order={4} className="font-sans font-bold text-[#1f140e] leading-tight">
              Recommended Pandals for You
            </Title>
            <Text className="text-[11px] text-[#7a6c60] font-sans">
              Closest & least crowded pandals nearby
            </Text>
          </div>
        </div>
      }
      centered
      radius="2xl"
      size="lg"
      padding="lg"
      overlayProps={{ blur: 5, opacity: 0.5 }}
      classNames={{
        header: "bg-[#fffbf5] border-b border-[#f0e5d3] px-6 py-4",
        body: "bg-[#faf4ec] p-4 sm:p-6",
        content: "rounded-3xl border border-[#f0e5d3] overflow-hidden shadow-2xl",
      }}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Loader color="yellow.7" size="lg" type="dots" />
          <Text className="mt-4 font-sans font-bold text-sm text-[#1f140e]">
            Finding nearest pandals...
          </Text>
          <Text className="text-xs text-[#7a6c60] mt-1 font-sans">
            Calculating live distance & crowd telemetry
          </Text>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="text-center py-8">
          <Text className="text-xs text-[#dc2626] font-medium font-sans mb-3">{error}</Text>
          <Button
            variant="light"
            color="red"
            radius="xl"
            onClick={() => fetchNearbyPandals()}
          >
            Retry Location Search
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && nearbyPandals.length === 0 && (
        <div className="text-center py-8 px-4">
          <div className="w-14 h-14 rounded-full bg-amber-100/80 text-[#e59b2c] flex items-center justify-center mx-auto mb-3">
            <Navigation className="w-7 h-7" />
          </div>
          <Text className="font-sans font-bold text-base text-[#1f140e]">
            No pandals found within 1km
          </Text>
          <Text className="text-xs text-[#7a6c60] mt-1 max-w-xs mx-auto font-sans">
            We couldn't find registered pandals near lat: {coords?.lat?.toFixed(4) || "22.8671"}, lng:{" "}
            {coords?.lng?.toFixed(4) || "88.3674"}.
          </Text>
        </div>
      )}

      {/* Pandal Cards List */}
      {!isLoading && nearbyPandals.length > 0 && (
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          <div className="flex items-center justify-between text-xs text-[#7a6c60] font-medium mb-1 px-1">
            <div className="flex items-center gap-1 text-[#e59b2c] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Recommendation</span>
            </div>
            <Badge color="yellow" radius="xl" size="xs">
              {nearbyPandals.length} Nearby
            </Badge>
          </div>

          {nearbyPandals.map((pandal, idx) => {
            const isExpanded = expandedPandalId === pandal.id;
            const currentReported = reportedStatus[pandal.id];

            return (
              <Card
                key={pandal.id || idx}
                radius="xl"
                withBorder
                padding="md"
                className="bg-white border-[#f0e5d3] overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col gap-3"
              >
                {/* Upper Section: Image & Info */}
                <div className="flex flex-row items-start gap-3.5">
                  {/* Image Thumbnail */}
                  <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-2xl overflow-hidden bg-amber-50 shrink-0 border border-[#f0e5d3]">
                    <NextImage
                      src={pandal.bannerImageUrl || "/assets/images/screen.png"}
                      alt={pandal.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />

                    {/* Distance Badge on Image */}
                    {pandal.distanceInMeters !== undefined && (
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/75 backdrop-blur-xs text-white px-1.5 py-0.5 rounded-md text-[9px] font-bold text-center">
                        📍 {Math.round(pandal.distanceInMeters)}m away
                      </div>
                    )}
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <Text className="font-sans font-bold text-sm sm:text-base text-[#1f140e] line-clamp-1">
                        {pandal.name}
                      </Text>
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-xs text-[#7a6c60]">
                      <MapPin className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                      <Text component="span" className="text-xs text-[#7a6c60]">
                        {pandal.locality || "Chandannagar"}
                      </Text>
                    </div>

                    {pandal.theme && (
                      <Text className="text-[11px] text-[#e59b2c] font-semibold mt-1 line-clamp-1">
                        🪷 Theme: {pandal.theme}
                      </Text>
                    )}

                    {pandal.description && (
                      <Text className="text-[11px] text-[#7a6c60] mt-0.5 line-clamp-2">
                        {pandal.description}
                      </Text>
                    )}
                  </div>
                </div>

                {/* Lower Action Row */}
                <div className="flex items-center justify-between pt-2.5 border-t border-[#f0e5d3]/70 gap-2">
                  {/* Toggle Report Crowd Button */}
                  <Button
                    size="xs"
                    radius="xl"
                    variant="light"
                    color="yellow"
                    leftSection={<Users className="w-3.5 h-3.5" />}
                    rightSection={
                      isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )
                    }
                    onClick={() => setExpandedPandalId(isExpanded ? null : pandal.id)}
                    className="font-sans text-[11px] font-bold bg-amber-50 text-[#e65100] border border-amber-200/80 hover:bg-amber-100"
                  >
                    Report Crowd
                  </Button>

                  {/* Directions Button */}
                  <Button
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      coords
                        ? `https://www.google.com/maps/dir/?api=1&destination=${pandal.latitude || coords.lat},${pandal.longitude || coords.lng}`
                        : "#"
                    }
                    size="xs"
                    radius="xl"
                    variant="filled"
                    leftSection={<Navigation2 className="w-3.5 h-3.5" />}
                    className="bg-[#f4b244] hover:bg-[#e59b2c] text-[#1c0508] font-bold text-[11px] font-sans border-none shadow-xs"
                  >
                    Directions
                  </Button>
                </div>

                {/* Expanded Crowd Checkin Options */}
                {isExpanded && (
                  <div className="pt-3 pb-2 px-2 bg-[#fffbf5] rounded-xl border border-[#f0e5d3] mt-1 transition-all">
                    <Text className="text-[11px] font-bold text-[#1f140e] mb-2 text-center font-sans">
                      How crowded is this pandal right now?
                    </Text>

                    {currentReported ? (
                      <div className="flex items-center justify-center gap-1.5 py-2 text-emerald-700 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Submitted as {currentReported}! Live crowd updated.</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {/* CALM / Low */}
                        <button
                          type="button"
                          disabled={submittingPandalId === pandal.id}
                          onClick={() => handleReportCrowd(pandal.id, "CALM")}
                          className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 transition cursor-pointer group"
                        >
                          <span className="text-base mb-0.5">🟢</span>
                          <span className="text-[11px] font-bold">Calm</span>
                          <span className="text-[9px] text-emerald-600">Low Wait</span>
                        </button>

                        {/* BUSY / Moderate */}
                        <button
                          type="button"
                          disabled={submittingPandalId === pandal.id}
                          onClick={() => handleReportCrowd(pandal.id, "BUSY")}
                          className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 transition cursor-pointer group"
                        >
                          <span className="text-base mb-0.5">🟡</span>
                          <span className="text-[11px] font-bold">Busy</span>
                          <span className="text-[9px] text-amber-600">Moderate</span>
                        </button>

                        {/* PACKED / Heavy */}
                        <button
                          type="button"
                          disabled={submittingPandalId === pandal.id}
                          onClick={() => handleReportCrowd(pandal.id, "PACKED")}
                          className="flex flex-col items-center justify-center p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 transition cursor-pointer group"
                        >
                          <span className="text-base mb-0.5">🔴</span>
                          <span className="text-[11px] font-bold">Packed</span>
                          <span className="text-[9px] text-rose-600">Heavy Wait</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </Modal>
  );
};

export default SuggestPandalModal;
