import DashboardLayout from "@/components/DashboardLayout";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  
  return (
    <div>
      <IncidentMap apiKey={apiKey}/>
    </div>
  );
}
