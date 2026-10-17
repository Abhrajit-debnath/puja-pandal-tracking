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
  crowdLevelStatus?: string;
  totalVotesInLast5Min?: number;
  latitude?: number;
  longitude?: number;
}

interface LocationStore {
  coords: { lat: number; lng: number } | null;
  nearbyPandals: NearbyPandal[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;

  fetchNearbyPandals: () => Promise<void>;
  executeApiCall: (lat: number, lng: number) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
}

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
      const apiUrl = `/pandals/nearby/location?latitude=${lat}&longitude=${lng}`;
      const response = await apiClient.get(apiUrl);
      set({
        nearbyPandals: response.data || [],
        isLoading: false,
      });
    } catch (err: any) {
      console.error("❌ API Error:", err);
      set({
        error: "Failed to fetch nearby pandals.",
        isLoading: false,
      });
    }
  },

  fetchNearbyPandals: async () => {
    set({ isLoading: true, error: null, isModalOpen: true });

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      set({
        error: "Geolocation is not supported on this device.",
        isLoading: false,
        isModalOpen: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        set({ coords: userCoords });
        await get().executeApiCall(userCoords.lat, userCoords.lng);
      },
      async (err) => {
        console.warn("⚠️ Geolocation error:", err.message);
        set({
          error: "Please allow location access to find nearby pandals.",
          isLoading: false,
          isModalOpen: false,
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  },
}));   