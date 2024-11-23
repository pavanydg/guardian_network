'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, AlertTriangle, ShieldAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function IncidentMap() {
  const [incidents] = useState([
    { id: 1, type: 'Harassment', lat: 40.7128, lng: -74.0060, severity: 'medium' },
    { id: 2, type: 'Theft', lat: 40.7282, lng: -73.9942, severity: 'high' },
    { id: 3, type: 'Assault', lat: 40.7589, lng: -73.9851, severity: 'critical' },
  ])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Real-Time Incident Map</CardTitle>
        <Button variant="outline">Filter</Button>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[600px] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Interactive map goes here</span>
          </div>
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110"
              style={{ left: `${incident.lng * 10}%`, top: `${incident.lat * 10}%` }}
            >
              {incident.severity === 'medium' && <MapPin className="text-yellow-500 h-8 w-8" />}
              {incident.severity === 'high' && <AlertTriangle className="text-orange-500 h-8 w-8" />}
              {incident.severity === 'critical' && <ShieldAlert className="text-red-500 h-8 w-8" />}
            </div>
          ))}
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
  )
}

