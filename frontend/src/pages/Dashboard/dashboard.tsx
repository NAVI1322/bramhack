import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer, Autocomplete } from "@react-google-maps/api";
import userIcon from "@/assets/svg/userIcon.png";
import evHubIcon from "@/assets/svg/evHubIcon.png";
import Navbar from "./NavBar";
import LiveLocation from "./components/livelocatoin";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

const RoutePlanner: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [userAddress, setUserAddress] = useState<string>(""); // Store user address
  const [startLocation, setStartLocation] = useState<any>("My Location");
  const [nearestHubs, setNearestHubs] = useState<{ name: string; distance: number; id: number; address: string }[]>([]);
  const [selectedHub, setSelectedHub] = useState<number | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [autocompleteStart, setAutocompleteStart] = useState<any>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [stations, setStations] = useState<any[]>([]);
  const [bikes, setBikes] = useState<any[]>([]);

  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
    libraries,
  });

  const router = useNavigate()

  // Fetch stations and bikes data using Axios
  const fetchStationsAndBikes = async () => {
    try {
      const stationResponse = await axios.get("http://localhost:3000/api/v1/get/station");
      const bikeResponse = await axios.get("http://localhost:3000/api/v1/get/bike_data");

      setStations(stationResponse.data);
      setBikes(bikeResponse.data);

      // Add address to stations using Google Maps Geocoder
      const geocoder = new google.maps.Geocoder();

      const stationsWithAddress = await Promise.all(
        stationResponse.data.map(async (station: any) => {
          const latLng = new google.maps.LatLng(station.location.latitude, station.location.longitude);
          const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode({ location: latLng }, (results, status) => {
              if (status === "OK" && results) {
                resolve(results);
              } else {
                resolve([]); // Return empty array if no results
              }
            });
          });

          const address = results.length > 0 ? results[0]?.formatted_address : "Address not available";
          return { ...station, address };
        })
      );

      setStations(stationsWithAddress);

    } catch (error) {
      console.error("Error fetching stations or bikes:", error);
    }
  };

  useEffect(() => {
    fetchStationsAndBikes();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          // Use Geocoder to fetch user address based on coordinates
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: latLng }, (results: any, status) => {
            if (status === "OK" && results[0]) {
              setUserAddress(results[0].formatted_address); // Set the user address
              setStartLocation(results[0].formatted_address); // Set the start location to the address
            } else {
              console.error("Geocoder failed due to: " + status);
            }
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
    if (userLocation) {
      const calculateDistances = stations.map((station) => ({
        name: station.name,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          station.location.latitude,
          station.location.longitude
        ),
        id: station.id,
        address: station.address, // Add address to the nearest hubs
      }));

      setNearestHubs(calculateDistances.sort((a, b) => a.distance - b.distance));
    }
  }, [userLocation, stations]);

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

  const getBikesAtSelectedHub = (selectedHubId: number) => {
    const filteredBikes = bikes.filter((bike) => bike.station.id === selectedHubId);
    return filteredBikes;
  };

  return isLoaded ? (
    <div className="flex flex-col h-screen">
      <Navbar />
      <LiveLocation onLocationUpdate={setUserLocation} />
      <div className={`flex h-full`}>
        {/* Map */}
        <div className="flex-1 h-[60%] md:h-full">
        <GoogleMap
  mapContainerStyle={{ width: "100%", height: "100%" }}
  center={userLocation || { lat: 43.72403555255983, lng: -79.71831315768694 }}
  zoom={12}
  options={{
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "administrative",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "landscape",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  }}
>
  {/* Station Markers */}
  {stations.map((station, i) => (
    <MarkerF
      key={i}
      position={{ lat: station.location.latitude, lng: station.location.longitude }}
      icon={{
        url: evHubIcon, // Your custom station icon
        scaledSize: new window.google.maps.Size(30, 30),
      }}
    />
  ))}

  {/* User Location Marker */}
  {userLocation && (
    <MarkerF
      position={userLocation}
      icon={{
        url: userIcon, // Your custom user icon
        scaledSize: new window.google.maps.Size(30, 30),
      }}
    />
  )}

  {/* Directions Renderer */}
  {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
</GoogleMap>
        </div>

        {/* Sidebar/Form */}
        <div className="w-full md:w-[450px] h-full p-4 bg-gray-100 dark:bg-gray-800">
          <div className="space-y-4">
            {/* Start Location */}
            <div>
              <label className="block text-sm font-medium:bg-gray-700 dark:text-gray-300">
                Start Location
              </label>
              <Autocomplete
                onLoad={(autocomplete) => setAutocompleteStart(autocomplete)}
                onPlaceChanged={handleAutocompleteStartChange}
              >
                <input
                  type="text"
                  placeholder="Type your location or select My Location"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none bg-white  focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={userAddress || startLocation}
                  readOnly
                />
              </Autocomplete>
              <div className="mt-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setStartLocation(userAddress)}
                >
                  Use My Location
                </button>
              </div>
            </div>

            {/* Nearest Hub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nearest Hub Stations
              </label>
              <select
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-white  focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={selectedHub || ""}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value, 10);
                  setSelectedHub(selectedId);
                  const selectedStation = stations.find(
                    (station) => station.id === selectedId
                  );
                  if (userLocation && selectedStation) {
                    calculateRoute(userLocation, {
                      lat: selectedStation.location.latitude,
                      lng: selectedStation.location.longitude,
                    });
                  }
                }}
              >
                <option value="">Select a hub</option>
                {nearestHubs.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.address}
                  </option>
                ))}
              </select>
            </div>

            {/* Available Bikes at the selected hub */}
            {selectedHub && (
              <div className="space-y-4 overflow-y-scroll scroll-thin md:max-h-[500px] border-t border-gray-300 dark:border-gray-600 pt-4">
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">
                  Available Bikes at {selectedHub}:
                </h3>
                {getBikesAtSelectedHub(selectedHub).map((bike, i) => (
                  <div
                    key={i}
                    className="p-6 cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                 onClick={()=>{router(`/bike-rent/${bike.id}`)}}  >
                    <div className="flex items-center space-x-4">
                      {/* Bike Icon or Image */}
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center text-white">
                        <span className="text-xl">{bike.name[0]}</span> {/* First letter as icon */}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{bike.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Available: {bike.isAvailable ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      {/* Bike Details */}
                      <div className="flex justify-between text-gray-500 dark:text-gray-300 text-sm">
                        <span>{bike.station?.name}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      {/* Bike Price or Additional Info */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Price: $12.00</span>
                      </div>
                    </div>
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


