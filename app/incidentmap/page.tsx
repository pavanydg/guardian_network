"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Script from 'next/script';

interface LocationData {
  latitude: number;
  longitude: number;
}

interface SensorData {
  name: string;
  gender: string;
  blood_group: string;
  bluetoothName: string;
  wifiName: string;
  location: LocationData;
}

interface IncidentMapProps {
  apiKey: string | undefined;
}

const IncidentMap: React.FC<IncidentMapProps> = ({ apiKey }) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  
  const mapId = 'incident-map';

  const fetchData = async () => {
    try {
      const response = await fetch("https://sensors-api.onrender.com/stream/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const newData = await response.json();
      setData(newData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch sensor data");
    }
  };

  useEffect(() => {
    fetchData();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Error getting user location:", error);
        }
      );
    }
  }, []);

  const openDirections = (destination: google.maps.LatLngLiteral) => {
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : 'current-location';
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination.lat},${destination.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (!mapLoaded || !window.google || !data.length) return;

    const map = new window.google.maps.Map(document.getElementById(mapId)!, {
      center: data[0]?.location ? 
        { lat: data[0].location.latitude, lng: data[0].location.longitude } : 
        { lat: 12.9716, lng: 77.5946 },
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    });

    // Add user's location marker if available
    if (userLocation) {
      new google.maps.Marker({
        position: userLocation,
        map: map,
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 8,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#FFFFFF'
        },
        title: 'Your Location'
      });
    }

    // Clear existing markers
    const markers: google.maps.Marker[] = [];
    
    data.forEach((item, index) => {
      if (!item.location) return;

      const marker = new google.maps.Marker({
        position: { 
          lat: item.location.latitude, 
          lng: item.location.longitude 
        },
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: 'red',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#FFFFFF'
        }
      });

      const infoWindowContent = document.createElement('div');
      infoWindowContent.className = 'p-4';
      infoWindowContent.innerHTML = `
        <div style="min-width: 200px; padding: 8px">
          <h3 style="font-weight: bold; margin-bottom: 4px">${item.name}</h3>
          <p style="font-size: 14px; margin: 4px 0">Gender: ${item.gender}</p>
          <p style="font-size: 14px; margin: 4px 0">Blood Group: ${item.blood_group}</p>
          <p style="font-size: 14px; margin: 4px 0">Bluetooth: ${item.bluetoothName}</p>
          <p style="font-size: 14px; margin: 4px 0">WiFi: ${item.wifiName}</p>
          <div style="margin-top: 12px;">
            <button 
              id="navigate-btn-${index}"
              style="
                display: flex;
                align-items: center;
                gap: 8px;
                background-color: #2563eb;
                color: white;
                padding: 6px 12px;
                border-radius: 6px;
                border: none;
                cursor: pointer;
                font-size: 14px;
              "
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 11l19-9-9 19-2-8-8-2z"></path>
              </svg>
              Navigate
            </button>
          </div>
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });

      marker.addListener('click', () => {
        markers.forEach(m => {
          // @ts-ignore
          if (m.infoWindow) m.infoWindow.close();
        });
        infoWindow.open(map, marker);

        setTimeout(() => {
          const navigateBtn = document.getElementById(`navigate-btn-${index}`);
          if (navigateBtn) {
            navigateBtn.addEventListener('click', () => {
              openDirections({ 
                lat: item.location.latitude, 
                lng: item.location.longitude 
              });
            });
          }
        }, 100);
      });

      // @ts-ignore
      marker.infoWindow = infoWindow;
      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => {
        marker.setMap(null);
        // @ts-ignore
        if (marker.infoWindow) marker.infoWindow.close();
      });
    };
  }, [mapLoaded, data, userLocation]);

  const handleMapError = () => {
    setError('Failed to load Google Maps. Please check your API key and try again.');
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        onLoad={() => setMapLoaded(true)}
        onError={handleMapError}
      />
      
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Real-Time Sensor Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] rounded-md overflow-hidden">
            {!mapLoaded ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-500">Loading map...</span>
              </div>
            ) : (
              <div id={mapId} className="w-full h-full" />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default IncidentMap;