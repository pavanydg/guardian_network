'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function AdminPanel() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="geofence" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="geofence">Geo-fence Data</TabsTrigger>
            <TabsTrigger value="guidelines">Safety Guidelines</TabsTrigger>
            <TabsTrigger value="feedback">User Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="geofence">
            <Card>
              <CardHeader>
                <CardTitle>Update Geo-fence Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input id="latitude" placeholder="Enter latitude" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input id="longitude" placeholder="Enter longitude" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="radius">Radius (meters)</Label>
                  <Input id="radius" placeholder="Enter radius" />
                </div>
                <Button className="w-full">Update Geo-fence</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="guidelines">
            <Card>
              <CardHeader>
                <CardTitle>Update Safety Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="Enter safety guidelines..." className="min-h-[200px]" />
                <Button className="w-full">Update Guidelines</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>User Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  {/* Sample feedback items */}
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="mb-4 pb-4 border-b last:border-b-0">
                      <h4 className="font-semibold">User {item}</h4>
                      <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

