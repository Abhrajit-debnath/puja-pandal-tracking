"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/app/config/apiClient/apiClient";

// Chandannagar Fallback Coordinates
const CHANDANNAGAR_COORDS = { lat: 22.8671, lng: 88.3674 };

export default function LocationTracker() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {

    if (!("geolocation" in navigator)) {
      console.warn("Geolocation not supported. Falling back to Chandannagar coords.");
      setCoords(CHANDANNAGAR_COORDS);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("📍 Immediate Location acquired:", position.coords.latitude, position.coords.longitude);
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("⚠️ Geolocation error/permission denied:", error.message, "-> Using fallback coords.");
        setCoords(CHANDANNAGAR_COORDS);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

  
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log("🔄 Position updated:", position.coords.latitude, position.coords.longitude);
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Watch position error:", error.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);


  useEffect(() => {
    if (!coords) return;

    const sendLocationToServer = async () => {
      try {
        const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "8000";
        const apiUrl = `http://localhost:${backendPort}/api/v1/pandals/nearby/location?latitude=${coords.lat}&longitude=${coords.lng}`;
        
        console.log("🚀 Sending request to Network:", apiUrl);
        const response = await apiClient.get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 20 }, 
        });
        console.log("✅ Response from server:", response);
      } catch (error) {
        console.error("❌ Failed to fetch nearby pandals:", error);
      }
    };

    sendLocationToServer();
  }, [coords]);

  return null;
}