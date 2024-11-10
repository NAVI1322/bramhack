import React, { useEffect } from "react";

interface LiveLocationProps {
  onLocationUpdate: (location: { lat: number; lng: number }) => void;
}

const LiveLocation: React.FC<LiveLocationProps> = ({ onLocationUpdate }) => {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const liveLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        onLocationUpdate(liveLocation);
      },
      (error) => {
        console.error("Error fetching live location:", error);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [onLocationUpdate]);

  return null; // This component does not render anything visually
};

export default LiveLocation;