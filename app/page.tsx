import DashboardLayout from "@/components/DashboardLayout";
import IncidentMap from "@/components/IncidentMap";
import Navbar from "@/components/Navbar";
import mapView from "@/components/Map";
export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  
  return (
    <div>
      <IncidentMap apiKey={apiKey}/>
    </div>
  );
}
