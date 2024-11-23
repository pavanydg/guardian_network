export interface Incident {
    id: number;
    type: string;
    lat: number;
    lng: number;
    severity: 'medium' | 'high' | 'critical';
    timestamp: string;
  }
  
  export interface MapMarker extends google.maps.Marker {
    infoWindow?: google.maps.InfoWindow;
  }
  