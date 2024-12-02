import axios from 'axios';

// Function to fetch station data
const fetchStations = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/get/station');
    console.log('Stations Data:', response.data); // Log the station data
    return response.data;
  } catch (error) {
    console.error('Error fetching stations:', error);
    return null;
  }
};

// Function to fetch bike data
const fetchBikeData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/get/bike_data');
    console.log('Bike Data:', response.data); // Log the bike data
    return response.data;
  } catch (error) {
    console.error('Error fetching bike data:', error);
    return null;
  }
};

// Example Usage:
const getData = async () => {
  const stations = await fetchStations();
  const bikes = await fetchBikeData();

  // Process the data or do something with it
  if (stations) {
    console.log(stations);
  }

  if (bikes) {
    console.log(bikes);
  }
};

getData();