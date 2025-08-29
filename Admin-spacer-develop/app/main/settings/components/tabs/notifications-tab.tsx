"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

import { Switch } from "@/components/ui/switch"
import { NotificationSetting } from "../../types/notification"

import { defaultNotifications } from "../../data/notifications"



export function NotificationsTab() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(defaultNotifications)

  const handleToggle = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    )
  }

  const handleSave = () => {
    // Here you would typically save the notification settings to your backend
    console.log('Saving notification settings:', notifications)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
      <div className="col-span-1">
        <p className="text-muted-foreground text-[0.85rem] leading-6">
        Configure and manage alerts, reminders, and announcements to keep users informed about bookings, updates, and important events.
        </p>
      </div>

      <div className="col-span-1 border-none shadow-none w-full p-0">
        <div className="pt-0">
          <div className="space-y-6">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {notification.title}
                  </h4>
                  <p className="text-[0.83rem] text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <Switch
                  checked={notification.enabled}
                  onCheckedChange={() => handleToggle(notification.id)}
                  
                />
              </div>
            ))}
          </div>
          <Button className="mt-4" onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

     
    </div>
  )
}

