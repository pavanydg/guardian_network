import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGoogleMaps } from './useGoogleMaps';
import { MapMarker, Incident } from '@/lib/types';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

interface IncidentMapProps {
  initialIncidents?: Incident[];
}

const IncidentMap: React.FC<IncidentMapProps> = ({ 
    initialIncidents = [
      { id: 1, type: 'Harassment', lat: 40.7128, lng: -74.0060, severity: 'medium', timestamp: '2024-03-23 14:30' },
      { id: 2, type: 'Theft', lat: 40.7282, lng: -73.9942, severity: 'high', timestamp: '2024-03-23 15:45' },
      { id: 3, type: 'Assault', lat: 40.7589, lng: -73.9851, severity: 'critical', timestamp: '2024-03-23 16:20' },
    ]
  }) => {
    const [incidents] = useState<Incident[]>(initialIncidents);
    const [markers, setMarkers] = useState<MapMarker[]>([]);
    const [filter, setFilter] = useState<'all' | Incident['severity']>('all');
  
    const { isLoading, loadError, map, mapRef } = useGoogleMaps(
      GOOGLE_MAPS_API_KEY,
      { lat: 40.7128, lng: -74.0060 }, // NYC coordinates
      13
    );
  
    const getMarkerColor = (severity: Incident['severity']): string => {
      const colors = {
        medium: '#EAB308',
        high: '#F97316',
        critical: '#EF4444'
      };
      return colors[severity];
    };
  
    useEffect(() => {
      if (!map) return;
  
      // Clear existing markers
      markers.forEach(marker => {
        marker.infoWindow?.close();
        marker.setMap(null);
      });
  
      const filteredIncidents = incidents.filter(
        incident => filter === 'all' || incident.severity === filter
      );
  
      const newMarkers = filteredIncidents.map(incident => {
        const marker = new google.maps.Marker({
          position: { lat: incident.lat, lng: incident.lng },
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getMarkerColor(incident.severity),
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF'
          }
        }) as MapMarker;
  
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold">${incident.type}</h3>
              <p class="text-sm">Severity: ${incident.severity}</p>
              <p class="text-sm">Time: ${incident.timestamp}</p>
            </div>
          `
        });
  
        marker.infoWindow = infoWindow;
        marker.addListener('click', () => {
          markers.forEach(m => m.infoWindow?.close());
          infoWindow.open(map, marker);
        });
  
        return marker;
      });
  
      setMarkers(newMarkers);
  
      // Cleanup function
      return () => {
        newMarkers.forEach(marker => {
          marker.infoWindow?.close();
          marker.setMap(null);
        });
      };
    }, [map, filter, incidents]);
  
    if (loadError) {
      return (
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="text-red-500">Error loading Google Maps: {loadError.message}</div>
          </CardContent>
        </Card>
      );
    }
  
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Real-Time Incident Map</CardTitle>
          <div className="flex space-x-2">
            {(['all', 'medium', 'high', 'critical'] as const).map((severity) => (
              <Button
                key={severity}
                variant={filter === severity ? "default" : "outline"}
                onClick={() => setFilter(severity)}
              >
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] rounded-md overflow-hidden">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-500">Loading map...</span>
              </div>
            ) : (
              <div ref={mapRef} className="w-full h-full" />
            )}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <Badge variant="outline" className="flex items-center">
                <MapPin className="mr-1 h-3 w-3 text-yellow-500" />
                Medium
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <AlertTriangle className="mr-1 h-3 w-3 text-orange-500" />
                High
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <ShieldAlert className="mr-1 h-3 w-3 text-red-500" />
                Critical
              </Badge>
            </div>
            <Button variant="link">View List</Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default IncidentMap;
  
  