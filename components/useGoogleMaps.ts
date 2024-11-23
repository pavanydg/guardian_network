import { useEffect, useRef, useState, useCallback } from 'react';

interface UseGoogleMapsReturn {
  isLoading: boolean;
  loadError: Error | null;
  map: google.maps.Map | null;
  mapRef: React.RefObject<HTMLDivElement>;
}

export const useGoogleMaps = (
  apiKey: string,
  center: google.maps.LatLngLiteral,
  zoom: number
): UseGoogleMapsReturn => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<Error | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapRef.current) return;

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
      setMap(mapInstance);
    } catch (error) {
      setLoadError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [center, zoom]);

  useEffect(() => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key='AIzaSyC7-yKW2oJ9W_-YM-nfAMpv-87FBZEQ0S0'`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    script.onerror = () => {
      setLoadError(new Error('Failed to load Google Maps script'));
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, initializeMap]);

  return { isLoading, loadError, map, mapRef };
};