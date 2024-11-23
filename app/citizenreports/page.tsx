'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Flag, MoreVertical, ThumbsUp, ThumbsDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function CitizenReports() {
  const [reports] = useState([
    { id: 1, type: 'Suspicious Activity', location: '789 Oak St', description: 'Unknown person loitering near the park', flagged: false, votes: 5, timestamp: '2 hours ago' },
    { id: 2, type: 'Noise Complaint', location: '101 Pine St', description: 'Loud music from neighboring apartment', flagged: true, votes: 3, timestamp: '4 hours ago' },
    { id: 3, type: 'Traffic Hazard', location: '202 Maple Ave', description: 'Large pothole in the middle of the road', flagged: false, votes: 8, timestamp: '1 day ago' },
  ])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Citizen Reports</CardTitle>
        <Button variant="outline">Add Report</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="flex flex-col space-y-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{report.type}</h3>
                <div className="flex items-center space-x-2">
                  {report.flagged && (
                    <Badge variant="destructive">
                      <Flag className="mr-1 h-3 w-3" />
                      Flagged
                    </Badge>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                      <DropdownMenuItem>Delete Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{report.location}</p>
              <p className="text-sm">{report.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{report.timestamp}</span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span>{report.votes}</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

