import { create } from "zustand";
import { apiClient } from "@/app/config/apiClient/apiClient";

export interface NearbyPandal {
  id: string;
  name: string;
  locality?: string;
  distanceInMeters?: number;
  theme?: string;
  description?: string;
  bannerImageUrl?: string;
  imageUrls?: string[];
  crowdLevel?: string;
  latitude?: number;
  longitude?: number;
}

interface LocationStore {
  coords: { lat: number; lng: number } | null;
  nearbyPandals: NearbyPandal[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;

  // Actions
  fetchNearbyPandals: () => Promise<void>;
  executeApiCall: (lat: number, lng: number) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
}
const CHANDANNAGAR_COORDS = { lat: 12.345, lng: 56.784 };
const BACKEND_PORT = process.env.NEXT_PUBLIC_BACKEND_PORT || "8000";

export const useLocationStore = create<LocationStore>((set, get) => ({
  coords: null,
  nearbyPandals: [],
  isLoading: false,
  error: null,
  isModalOpen: false,

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  executeApiCall: async (lat: number, lng: number) => {
    try {
      const apiUrl = `http://localhost:${BACKEND_PORT}/api/v1/pandals/nearby/location?latitude=${CHANDANNAGAR_COORDS.lat}&longitude=${CHANDANNAGAR_COORDS.lng}`;
      console.log("🚀 LocationStore API Request:", apiUrl);

      const response = await apiClient.get(apiUrl);
      console.log("✅ LocationStore API Response:", response);

      set({
        nearbyPandals: response.data || [],
        isLoading: false,
      });
    } catch (err: any) {
      console.error("❌ LocationStore API Error:", err);
      set({
        error: "Failed to fetch nearby pandals.",
        isLoading: false,
      });
    }
  },

  fetchNearbyPandals: async () => {
    set({ isLoading: true, error: null, isModalOpen: true });

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      console.warn("Geolocation not supported. Falling back to Chandannagar coords.");
      set({ coords: CHANDANNAGAR_COORDS });
      await get().executeApiCall(CHANDANNAGAR_COORDS.lat, CHANDANNAGAR_COORDS.lng);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("📍 Acquired user coords:", userCoords);
        set({ coords: userCoords });
        await get().executeApiCall(userCoords.lat, userCoords.lng);
      },
      async (err) => {
        console.warn("⚠️ Geolocation denied/timeout. Using Chandannagar fallback coords.");
        set({ coords: CHANDANNAGAR_COORDS });
        await get().executeApiCall(CHANDANNAGAR_COORDS.lat, CHANDANNAGAR_COORDS.lng);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  },
}));
