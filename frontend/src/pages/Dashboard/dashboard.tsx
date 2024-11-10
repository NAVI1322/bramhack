import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import userIcon from "@/assets/svg/userIcon.png";
import evHubIcon from "@/assets/svg/evHubIcon.png";
import Navbar from "./NavBar";
import LiveLocation from "./components/livelocatoin";

const predefinedEVStations = [
  { name: "Station 1", lat: 43.69084318904449, lng: -79.75499153673132 },
  { name: "Station 2", lat: 43.6955172362235, lng: -79.750072376801 },
  { name: "Station 3", lat: 43.7022981448845, lng: -79.74292285026856 },
  { name: "Station 4", lat: 43.67834202501027, lng: -79.7498977842494 },
];

const bikeOptions = [
  { name: "EV Bike 1", description: "Eco-friendly and fast", price: "$10.00" },
  { name: "EV Bike 2", description: "Comfortable ride", price: "$12.00" },
  { name: "EV Bike 3", description: "High speed and range", price: "$15.00" },
  { name: "EV Bike 4", description: "City commuting", price: "$11.00" },
  { name: "EV Bike 5", description: "Stylish design", price: "$13.00" },
];

const libraries: ("places" | "geometry")[] = ["places", "geometry"]; // Constant libraries for performance

const RoutePlanner: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [startLocation, setStartLocation] = useState<string | { lat: number; lng: number }>("My Location");
  const [nearestHubs, setNearestHubs] = useState<{ name: string; distance: number }[]>([]);
  const [selectedHub, setSelectedHub] = useState<string | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );
  const [autocompleteStart, setAutocompleteStart] = useState<any>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMapPopup, setShowMapPopup] = useState<boolean>(false);

  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching user location:", error);
        }
      );
    }

    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", updateIsMobile);
    updateIsMobile();

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    const location: any =
      typeof startLocation === "string" && startLocation === "My Location"
        ? userLocation
        : startLocation;

    if (!location) return;

    const calculateDistances = predefinedEVStations.map((station) => ({
      name: station.name,
      distance: calculateDistance(location.lat, location.lng, station.lat, station.lng),
    }));

    setNearestHubs(calculateDistances.sort((a, b) => a.distance - b.distance));
  }, [userLocation, startLocation]);

  useEffect(() => {
    if (
      (typeof startLocation === "string" && startLocation === "My Location" && userLocation) ||
      (typeof startLocation !== "string" && startLocation) &&
      selectedHub
    ) {
      const location =
        typeof startLocation === "string" ? userLocation : startLocation;
      const selectedStation = predefinedEVStations.find((station) => station.name === selectedHub);
      if (location && selectedStation) {
        calculateRoute(location, { lat: selectedStation.lat, lng: selectedStation.lng });
      }
    }
  }, [startLocation, selectedHub]);

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateRoute = async (
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ) => {
    if (!isLoaded) return;

    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(result);
  };

  const handleAutocompleteStartChange = () => {
    const place = autocompleteStart.getPlace();
    if (place.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setStartLocation(location);
    }
  };

  return isLoaded ? (
    <div className="flex flex-col h-screen">
      <Navbar />
      <LiveLocation onLocationUpdate={setUserLocation} />
      <div className={`flex ${isMobile ? "flex-col" : "flex-row-reverse"} h-full`}>
        {/* Map */}
        {isMobile && !showMapPopup && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded w-full mb-4 md:hidden"
            onClick={() => setShowMapPopup(true)}
          >
            Show Map
          </button>
        )}

        <div
          className={`flex-1 h-[60%] md:h-full ${
            isMobile && showMapPopup ? "fixed inset-x-0 bottom-0 top-[20%] bg-white z-50" : "hidden md:block"
          }`}
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={userLocation || { lat: 43.72403555255983, lng: -79.71831315768694 }}
            zoom={12}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            {predefinedEVStations.map((station, i) => (
              <MarkerF
                key={i}
                position={{ lat: station.lat, lng: station.lng }}
                icon={{
                  url: evHubIcon,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ))}
            {userLocation && (
              <MarkerF
                position={userLocation}
                icon={{
                  url: userIcon,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            )}
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
          {isMobile && (
            <button
              className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowMapPopup(false)}
            >
              Close Map
            </button>
          )}
        </div>

        {/* Sidebar/Form */}
        <div className="w-full md:w-[450px] h-full p-4 bg-gray-100 dark:bg-gray-800">
          <div className="space-y-4">
            {/* Start Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Location
              </label>
              <Autocomplete
                onLoad={(autocomplete) => setAutocompleteStart(autocomplete)}
                onPlaceChanged={handleAutocompleteStartChange}
              >
                <input
                  type="text"
                  placeholder="Type your location or select My Location"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </Autocomplete>
              <div className="mt-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setStartLocation("My Location")}
                >
                  Use My Location
                </button>
              </div>
            </div>

            {/* Select Hub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nearest Hub Stations
              </label>
              <select
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={selectedHub || ""}
                onChange={(e) => setSelectedHub(e.target.value)}
              >
                <option value="">Select a hub</option>
                {nearestHubs.map((hub) => (
                  <option key={hub.name} value={hub.name}>
                    {hub.name} ({hub.distance.toFixed(2)} km)
                  </option>
                ))}
              </select>
            </div>

            {/* Available Bikes */}
            {selectedHub && (
              <div className="space-y-4 overflow-y-scroll scroll-thin md:max-h-[500px] border-t border-gray-300 dark:border-gray-600 pt-4">
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">
                  Available Bikes at {selectedHub}:
                </h3>
                {bikeOptions.map((bike, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow"
                  >
                    <h4 className="font-bold">{bike.name}</h4>
                    <p>{bike.description}</p>
                    <p className="font-bold">{bike.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default RoutePlanner;