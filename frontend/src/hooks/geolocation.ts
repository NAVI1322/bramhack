export const getAddressFromLatLng = async (latitude: number, longitude: number) => {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(latitude, longitude);
  
    try {
      const response = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results) {
            resolve(results);
          } else {
            reject('Geocode was not successful for the following reason: ' + status);
          }
        });
      });
  
      // Returning the formatted address from the results
      return response[0]?.formatted_address || 'Address not found';
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address not available';
    }
  };