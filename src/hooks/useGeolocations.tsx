'use client'

import { useState, useEffect } from 'react';

type UserPosition = {
    lat: number;
    lon: number;
}

const useGeoLocation = () => {
    const [location, setLocation] = useState<UserPosition | null>(null);
    const [error, setError] = useState<string  | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState<string | null>();


    useEffect(() => {

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            setIsLoading(false);
            return;
        }

        const successHandler = (position: GeolocationPosition) => {

            const { latitude, longitude } = position.coords;
            setLocation({
                lat: latitude,
                lon: longitude
            });
            setIsLoading(false);
        };

        const errorHandler = (geoError: GeolocationPositionError) => {
            setError(geoError.message);
            setIsLoading(false);
        };

        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  useEffect(() => {
    if (location) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location?.lat}&lon=${location?.lon}`)
            .then(response => response.json())
            .then(data => {
                setCity(data.address.city);
            });
    }
  }, [location])

  return { location, city, error, isLoading };
};

export default useGeoLocation;
