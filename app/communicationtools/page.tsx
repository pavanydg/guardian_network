'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, User, UserCircle2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function CommunicationTools() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Officer', content: 'Hello, is everything okay?', timestamp: '10:30 AM' },
    { id: 2, sender: 'Citizen', content: 'Yes, I just wanted to report a suspicious vehicle.', timestamp: '10:32 AM' },
    { id: 3, sender: 'Officer', content: 'Can you describe the vehicle?', timestamp: '10:33 AM' },
  ])

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'Officer', content: message, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
      setMessage('')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Communication Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start space-x-2 mb-4
${msg.sender === 'Officer' ? 'justify-end' : ''}`}>
              {msg.sender === 'Citizen' && <User className="mt-1 h-6 w-6 text-gray-400" />}
              <div className={`rounded-lg p-3 ${msg.sender === 'Officer' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs text-gray-400 mt-1 block">{msg.timestamp}</span>
              </div>
              {msg.sender === 'Officer' && <UserCircle2 className="mt-1 h-6 w-6 text-blue-500" />}
            </div>
          ))}
        </ScrollArea>
        <div className="flex space-x-2 mt-4">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

