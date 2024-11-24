"use client"
import { Bell, Settings, LogOut, Menu, Map, AlertTriangle, BarChart2, MessageSquare, FileText, Users, ShieldCheck } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import IncidentMap from './IncidentMap'
import AlertSystem from './AlertSystem'
import AnalyticsPanel from './AnalyticsPanel'
import CommunicationTools from './CommunicationTools'
import CitizenReports from './CitizenReports'
import OfficerManagement from './OfficerManagement'
import AdminPanel from './AdminPanel'
import { Button } from './ui/button'
import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const menuItems = [
    { name: 'Alert System', icon: AlertTriangle, url: "alertsystem", component: AlertSystem },
    { name: 'Analytics', icon: BarChart2, url: "analyticspanel", component: AnalyticsPanel },
    { name: 'Communication', icon: MessageSquare, url: "communicationtools", component: CommunicationTools },
    { name: 'Citizen Reports', icon: FileText, url: "citizenreports", component: CitizenReports },
    { name: 'Officer Management', icon: Users, url: "officermanagement", component: OfficerManagement },
    { name: 'Admin Panel', icon: ShieldCheck, url: "adminpanel", component: AdminPanel },
  ]
  const [activeComponent, setActiveComponent] = useState('Incident Map')

  const ActiveComponent = menuItems.find(item => item.name === activeComponent)?.component || IncidentMap

  return <div className='py-2'>
    <div className='lg:hidden'>
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
                <Link key={item.url} href={`/${item.url}`} className=''>
                  <div className='flex items-center '>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </ScrollArea>
          </nav>
        </SheetContent>
      </Sheet>
      <Link href="/" className="font-bold text-xl text-gray-800 dark:text-white ml-2 lg:ml-0">Guardian Network</Link>
    </div>
    {/* <div className="hidden lg:flex lg:items-center lg:space-x-4"> */}
    <div className='hidden lg:flex lg:justify-center lg:gap-6'>
      <Link href="/" className="font-bold text-xl text-gray-800 dark:text-white ml-2 lg:ml-0">Guardian Network</Link>
      {menuItems.map((item) => (
        <Link key={item.url} href={`/${item.url}`} className='flex justify-center items-center'>
          <item.icon className="mr-2 h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </div>
  </div>
};

export default Navbar;
