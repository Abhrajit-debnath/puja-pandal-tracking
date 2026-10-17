"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Text } from "@mantine/core";
import dynamic from "next/dynamic";
import JagadhatriLoader from "@/components/loaders/JagadhartiLoader";

const BottomFloatingBar = dynamic(
  () => import("@/components/BottomBar/BottomFloatingBar"),
  { ssr: false }
);
const SuggestPandalModal = dynamic(
  () => import("@/components/Suggest/SuggestPandalModal"),
  { ssr: false }
);

export default function HomeClientOverlay() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = useCallback(
    (targetRoute: string) => {
      if (isLoading) return;

      setIsLoading(true);

      setTimeout(() => {
        router.push(targetRoute);
        setTimeout(() => setIsLoading(false), 400);
      }, 4000);
    },
    [isLoading, router]
  );

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-999999 flex items-center justify-center bg-sacred-wine-elevated backdrop-blur-md">
          <div className="flex flex-col items-center justify-center gap-4">
            <Text c="saffronGold.1" fw="700">
              Entering Live Immersion
            </Text>
            <JagadhatriLoader />
          </div>
        </div>
      )}

      <BottomFloatingBar handleLoading={handleLoading} />
      <SuggestPandalModal />
    </>
  );
}
