import { useCallback, useState } from 'react';
import { Coordinates } from '../types';

export const useTrackLocation = () => {
  const [location, setLocation] = useState<Coordinates>();
  const [isLoading, setIsLoading] = useState(false);
  const [locationErrorMsg, setLocationErrorMsg] = useState('');

  const handleSuccess: PositionCallback = useCallback((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocation({ lat: latitude, lng: longitude });
    setIsLoading(false);
    setLocationErrorMsg('');
  }, []);

  const handleError: PositionErrorCallback = useCallback(() => {
    setIsLoading(false);
    setLocationErrorMsg('Unable to retrieve your location');
  }, []);

  const handleTrackLocation = useCallback(() => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      setIsLoading(false);
      setLocationErrorMsg('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
  }, [handleSuccess, handleError]);

  return { isLoading, location, locationErrorMsg, handleTrackLocation };
};
