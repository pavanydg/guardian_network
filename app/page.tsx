import DashboardLayout from "@/components/DashboardLayout";
import IncidentMap from "@/components/IncidentMap";
import Navbar from "@/components/Navbar";
import mapView from "@/components/Map";
export default function Home() {

  return (
    <div>
      <IncidentMap apiKey="AIzaSyC7-yKW2oJ9W_-YM-nfAMpv-87FBZEQ0S0"/>
    </div>
  );
}
