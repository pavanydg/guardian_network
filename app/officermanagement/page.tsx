'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, MoreVertical, PhoneCall } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getOfficers } from '@/lib/actions'

export default function OfficerManagement() {
  const [officers] = useState([
    { id: 1, name: 'John Doe', status: 'Available', location: 'Basavangudi', avatar: '/placeholder-avatar.jpg', badgeNumber: '12345' },
    { id: 2, name: 'Jane Smith', status: 'On Duty', location: 'Hanumanthanagar', avatar: '/placeholder-avatar.jpg', badgeNumber: '67890' },
    { id: 3, name: 'Mike Johnson', status: 'Responding', location: 'Majestic', avatar: '/placeholder-avatar.jpg', badgeNumber: '24680' },
  ])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Officer Management</CardTitle>
        <Button variant="outline">Add Officer</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {officers.map((officer) => (
            <div key={officer.id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-md transition-all duration-200 hover:shadow-md">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={officer.avatar} alt={officer.name} />
                  <AvatarFallback>{officer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{officer.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="mr-1 h-3 w-3" />
                    {officer.location}
                  </div>
                  <div className="text-xs text-gray-400">Badge: {officer.badgeNumber}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    officer.status === 'Available'
                      ? 'default'
                      : officer.status === 'On Duty'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {officer.status}
                </Badge>
                <Button size="sm" variant="ghost">
                  <PhoneCall className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Assign Task</DropdownMenuItem>
                    <DropdownMenuItem>Change Status</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

