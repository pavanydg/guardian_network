// IncidentMap.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';
import Script from 'next/script';

// Types
interface Incident {
  id: number;
  type: string;
  lat: number;
  lng: number;
  severity: 'medium' | 'high' | 'critical';
  timestamp: string;
}

interface IncidentMapProps {
  apiKey: string | undefined;
  initialIncidents?: Incident[];
}

const DEFAULT_INCIDENTS = [
  { id: 1, type: 'Harassment', lat: 40.7128, lng: -74.0060, severity: 'medium', timestamp: '2024-03-23 14:30' },
  { id: 2, type: 'Theft', lat: 40.7282, lng: -73.9942, severity: 'high', timestamp: '2024-03-23 15:45' },
  { id: 3, type: 'Assault', lat: 40.7589, lng: -73.9851, severity: 'critical', timestamp: '2024-03-23 16:20' },
];

const IncidentMap: React.FC<IncidentMapProps> = ({ 
  apiKey,
  initialIncidents = DEFAULT_INCIDENTS 
}) => {
  const [incidents] = useState(initialIncidents);
  const [filter, setFilter] = useState<'all' | Incident['severity']>('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [data,setData] = useState();

  const mapId = 'incident-map';

  const fetchData = async () => {
    try{
      const response = await fetch("https://sensors-api.onrender.com/stream/data")
      if(!response.ok){
        throw new Error("Failed to fetch data");
      }
      const dat = await response.json();
      setData(dat);
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {
    // Get user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
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
    if (!mapLoaded || !window.google) return;

    const map = new window.google.maps.Map(document.getElementById(mapId)!, {
      center: { lat: 40.7128, lng: -74.0060 },
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
          path: google.maps.SymbolPath.CIRCLE,
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
    
    const filteredIncidents = incidents.filter(
      incident => filter === 'all' || incident.severity === filter
    );

    filteredIncidents.forEach(incident => {
      const markerColor = {
        medium: '#EAB308',
        high: '#F97316',
        critical: '#EF4444'
      }[incident.severity];

      const marker = new google.maps.Marker({
        position: { lat: incident.lat, lng: incident.lng },
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#FFFFFF'
        }
      });

      const infoWindowContent = document.createElement('div');
      infoWindowContent.className = 'p-4';
      infoWindowContent.innerHTML = `
        <div style="min-width: 200px; padding: 8px">
          <h3 style="font-weight: bold; margin-bottom: 4px">${incident.type}</h3>
          <p style="font-size: 14px; margin: 4px 0">Severity: ${incident.severity}</p>
          <p style="font-size: 14px; margin: 4px 0">Time: ${incident.timestamp}</p>
          <div style="margin-top: 12px;">
            <button 
              id="navigate-btn-${incident.id}"
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
        // Close all open info windows
        markers.forEach(m => {
          // @ts-ignore
          if (m.infoWindow) m.infoWindow.close();
        });
        infoWindow.open(map, marker);

        // Add click listener to navigation button after info window is opened
        setTimeout(() => {
          const navigateBtn = document.getElementById(`navigate-btn-${incident.id}`);
          if (navigateBtn) {
            navigateBtn.addEventListener('click', () => {
              openDirections({ lat: incident.lat, lng: incident.lng });
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
  }, [mapLoaded, filter, incidents, userLocation]);

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
          <CardTitle className="text-2xl font-bold">Real-Time Incident Map</CardTitle>
          <div className="flex space-x-2">
            {(['all', 'medium', 'high', 'critical'] as const).map((severity) => (
              <Button
                key={severity}
                variant={filter === severity ? "default" : "outline"}
                onClick={() => setFilter(severity)}
                className={
                  severity === 'medium' ? 'text-yellow-600' :
                  severity === 'high' ? 'text-orange-600' :
                  severity === 'critical' ? 'text-red-600' :
                  ''
                }
              >
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </Button>
            ))}
          </div>
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
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <Badge variant="outline" className="flex items-center text-yellow-600">
                Medium
              </Badge>
              <Badge variant="outline" className="flex items-center text-orange-600">
                High
              </Badge>
              <Badge variant="outline" className="flex items-center text-red-600">
                Critical
              </Badge>
            </div>
            <Button variant="link">View List</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default IncidentMap;