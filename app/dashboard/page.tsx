'use client'

import { useState } from 'react'
import { Bell, Settings, LogOut, Menu, Map, AlertTriangle, BarChart2, MessageSquare, FileText, Users, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
// import IncidentMap from './IncidentMap'
// import AlertSystem from './AlertSystem'
// import AnalyticsPanel from './AnalyticsPanel'
// import CommunicationTools from './CommunicationTools'
// import CitizenReports from './CitizenReports'
// import OfficerManagement from './OfficerManagement'
// import AdminPanel from './AdminPanel'

// const menuItems = [
//   { name: 'Incident Map', icon: Map, component: IncidentMap },
//   { name: 'Alert System', icon: AlertTriangle, component: AlertSystem },
//   { name: 'Analytics', icon: BarChart2, component: AnalyticsPanel },
//   { name: 'Communication', icon: MessageSquare, component: CommunicationTools },
//   { name: 'Citizen Reports', icon: FileText, component: CitizenReports },
//   { name: 'Officer Management', icon: Users, component: OfficerManagement },
//   { name: 'Admin Panel', icon: ShieldCheck, component: AdminPanel },
// ]

export default function DashboardLayout() {
  const [activeComponent, setActiveComponent] = useState('Incident Map')

//   const ActiveComponent = menuItems.find(item => item.name === activeComponent)?.component || IncidentMap
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col flex-1">
                    <ScrollArea className="flex-1">
                      {menuItems.map((item) => (
                        <Button
                          key={item.name}
                          variant={activeComponent === item.name ? 'secondary' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => setActiveComponent(item.name)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Button>
                      ))}
                    </ScrollArea>
                  </nav>
                </SheetContent>
              </Sheet>
              <span className="font-bold text-xl text-gray-800 dark:text-white ml-2 lg:ml-0">Guardian Network</span>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  variant={activeComponent === item.name ? 'secondary' : 'ghost'}
                  onClick={() => setActiveComponent(item.name)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav> */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ActiveComponent />
      </main>
    </div>
  )
}

