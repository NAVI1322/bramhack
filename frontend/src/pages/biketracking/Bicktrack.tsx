// import React, { useEffect, useState } from "react";
// import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000"); // Replace with your backend URL

// const libraries = ["places", "geometry"]; // Google Maps API libraries

// const BikeTracker: React.FC = () => {
//   const [bikeData, setBikeData] = useState<any[]>([]); // Array of bike locations
//   const [selectedBike, setSelectedBike] = useState<string | null>(null); // Currently selected bike
//   const [center, setCenter] = useState({ lat: 43.7, lng: -79.4 }); // Map center

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
//     libraries,
//   });

//   useEffect(() => {
//     // Listen for initial bike data
//     socket.on("bike-data", (data) => {
//       setBikeData(data);
//     });

//     // Listen for bike updates
//     socket.on("bike-updated", (updatedBike) => {
//       setBikeData((prevData) =>
//         prevData.map((bike) =>
//           bike[0] === updatedBike.bikeId ? [updatedBike.bikeId, updatedBike] : bike
//         )
//       );
//     });

//     return () => {
//       socket.off("bike-data");
//       socket.off("bike-updated");
//     };
//   }, []);

//   const handleBikeUnlock = (bikeId: string) => {
//     socket.emit("unlock-bike", { bikeId });
//   };

//   const handleBikeLocationUpdate = (bikeId: string, lat: number, lng: number) => {
//     socket.emit("update-bike-location", { bikeId, lat, lng });
//   };

//   const handleBikeLock = (bikeId: string) => {
//     socket.emit("lock-bike", { bikeId, imageProof: "proof_image_url" });
//   };

//   return isLoaded ? (
//     <div className="flex flex-col h-screen">
//       <h1 className="text-center text-2xl font-bold mb-4">Bike Tracker</h1>
//       <div className="flex flex-row">
//         <div className="w-1/3 h-full p-4 bg-gray-100 overflow-auto">
//           <h2 className="font-bold mb-2">Available Bikes</h2>
//           {bikeData.map(([bikeId, bike]: any) => (
//             <div
//               key={bikeId}
//               className={`p-4 mb-2 rounded border ${
//                 bike.isLocked ? "bg-red-200" : "bg-green-200"
//               }`}
//             >
//               <p>
//                 <strong>Bike ID:</strong> {bikeId}
//               </p>
//               <p>
//                 <strong>Location:</strong> {bike.lat.toFixed(4)}, {bike.lng.toFixed(4)}
//               </p>
//               <p>
//                 <strong>Status:</strong> {bike.isLocked ? "Locked" : "Unlocked"}
//               </p>
//               <button
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={() =>
//                   bike.isLocked
//                     ? handleBikeUnlock(bikeId)
//                     : handleBikeLock(bikeId)
//                 }
//               >
//                 {bike.isLocked ? "Unlock" : "Lock"}
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="flex-1 h-screen">
//           <GoogleMap
//             mapContainerStyle={{ width: "100%", height: "100%" }}
//             center={center}
//             zoom={13}
//             options={{
//               disableDefaultUI: true,
//               zoomControl: true,
//             }}
//           >
//             {bikeData.map(([bikeId, bike]: any) => (
//               <MarkerF
//                 key={bikeId}
//                 position={{ lat: bike.lat, lng: bike.lng }}
//                 onClick={() => setSelectedBike(bikeId)}
//                 icon={{
//                   url: bike.isLocked
//                     ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
//                     : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
//                 }}
//               />
//             ))}
//           </GoogleMap>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// };

// export default BikeTracker;