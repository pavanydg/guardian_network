'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2, ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AlertSystem() {
  const [alerts] = useState([
    { id: 1, type: 'SOS', location: '123 Main St', description: 'Robbery in progress', acknowledged: false, timestamp: '2 min ago' },
    { id: 2, type: 'Harassment', location: '456 Elm St', description: 'Verbal altercation', acknowledged: true, timestamp: '15 min ago' },
    { id: 3, type: 'Suspicious Activity', location: '789 Oak St', description: 'Unknown person loitering', acknowledged: false, timestamp: '32 min ago' },
  ])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Alert System</CardTitle>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-md transition-all duration-200 hover:shadow-md">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{alert.type}</h3>
                  <Badge variant={alert.acknowledged ? 'secondary' : 'destructive'}>
                    {alert.acknowledged ? 'Acknowledged' : 'New'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{alert.location}</p>
                <p className="text-sm">{alert.description}</p>
                <p className="text-xs text-gray-400">{alert.timestamp}</p>
              </div>
              {alert.acknowledged ? (
                <CheckCircle2 className="text-green-500 h-6 w-6" />
              ) : (
                <Button size="sm" className="whitespace-nowrap">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Acknowledge
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

