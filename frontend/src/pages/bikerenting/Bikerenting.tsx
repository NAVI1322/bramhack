  import React, { useState, useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
  import userIcon from "@/assets/svg/userIcon.png";
  import evHubIcon from "@/assets/svg/evHubIcon.png";
  import axios from "axios";
import Navbar from "./NavBar";
import { Toast } from "@/components/majorComponents/toast";


  const libraries: ("places" | "geometry")[] = ["places", "geometry"];

  const BikeRentingPage: React.FC = () => {
    const { bikeId } = useParams<{ bikeId: string }>();
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedBike, setSelectedBike] = useState<any>(null);
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [stations, setStations] = useState<any[]>([]);
    const [selectedStation, setSelectedStation] = useState<any>(null);
    const [billing, setBilling] = useState<{ distanceKm: number; cost: number } | null>(null);

    

    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    

    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: key,
      libraries,
    });

    useEffect(() => {
      axios.get(`http://localhost:3000/api/v1/get/bike/${bikeId}`).then(response => {
        setSelectedBike(response.data);
      }).catch(error => console.error("Error fetching bike:", error));

      axios.get("http://localhost:3000/api/v1/get/station").then(response => {
        const geocoder = new google.maps.Geocoder();
        Promise.all(response.data.map((station: any) => {
          return new Promise(resolve => {
            const latLng = { lat: station.location.latitude, lng: station.location.longitude };
            geocoder.geocode({ location: latLng }, (results, status) => {
              if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
                station.address = results[0].formatted_address;
              } else {
                station.address = "Address not found";
              }
              resolve(station);
            });
          });
        })).then(updatedStations => {
          setStations(updatedStations);
        });
      }).catch(error => console.error("Error fetching stations:", error));

      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => console.error("Error fetching user location:", error)
      );
    }, [bikeId]);

    const router = useNavigate();

    function handlerent(){

      const key = localStorage.getItem("token");

      if(!key){
        router("/login")
        Toast("Error","Login first to book a ride");
      }



    }

    const calculateRoute = async (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
      if (!isLoaded) return;

      const directionsService = new google.maps.DirectionsService();
      directionsService.route({
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result:any, status) => {
        if (status === google.maps.DirectionsStatus.OK && result.routes[0]) {
          setDirectionsResponse(result);
          const distance = result.routes[0].legs[0].distance.value / 1000; // Convert meters to kilometers
          setBilling({ distanceKm: distance, cost: distance * 0.50 });
        }
      });
    };

    useEffect(() => {
      if (selectedBike && userLocation && selectedStation) {
        calculateRoute(userLocation, {
          lat: selectedStation.location.latitude,
          lng: selectedStation.location.longitude
        });
      }
    }, [selectedBike, userLocation, selectedStation]);

    return isLoaded ? (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex h-full">
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
        stylers: [{ visibility: "off" }],
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
          <div className="w-full md:w-[450px] h-full p-6 bg-gray-100 dark:bg-gray-800">
            <div className="space-y-6">
              {selectedBike && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Bike Details</h3>
                  <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedBike.name}</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Battery: 75%</p>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">Status: {selectedBike.isAvailable ? "Available" : "Not Available"}</p>
                      </div>
                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Select Destination Station</h3>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      onChange={(e) => {
                        const station = stations.find(s => s.id === parseInt(e.target.value, 10));
                        setSelectedStation(station);
                      }}
                    >
                      <option value="">Select a station</option>
                      {stations.map((station) => (
                        <option key={station.id} value={station.id}>{station.name} - {station.address}</option>
                      ))}
                    </select>
                    {selectedStation && (
                      <div className="mt-2 text-gray-700 dark:text-gray-300">
                        <p>Destination: {selectedStation.name}</p>
                        <p>Address: {selectedStation.address}</p>
                      </div>
                    )}
                    <button
                      className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600 transition duration-300"
                      onClick={handlerent}
                    >
                      Rent Now
                    </button>
                  </div>
                  {billing && (
  <div className="mt-4 p-4 bg-white rounded-xl shadow-lg text-gray-800">
    <h4 className="text-xl font-semibold text-blue-500">Billing Summary</h4>
    <p className="text-lg mt-2">
      <span className="font-medium">Total Distance:</span> {billing.distanceKm.toFixed(2)} km
    </p>
    <p className="text-lg">
      <span className="font-medium">Total Cost:</span> ${billing.cost.toFixed(2)}
    </p>
  </div>
)}
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

  export default BikeRentingPage;