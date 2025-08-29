"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings } from "./types/settings"
import { ProfileTab } from "./components/tabs/profile-tab"
import { BookingsTab } from "./components/tabs/bookings-tab"
import { RolesTab } from "./components/tabs/roles-tab"
import { NotificationsTab } from "./components/tabs/notifications-tab"
import { AuditTab } from "./components/tabs/audit-tab"
import { User, CalendarCheck, Shield, Bell, FileText } from "lucide-react";

const defaultSettings: Settings = {
  profile: {
    firstName: "Olayimika",
    lastName: "Oluwasegun",
    email: "oluwasegunyinka.samuel@gmail.com",
    phone: "+2348101831001",
  },
  booking: {
    minimumNotice: 7,
    cancellationPolicy: "",
    paymentMethods: {
      creditCard: true,
      bankTransfer: false,
    },
  },
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  const handleProfileSave = (profileData: Settings["profile"]) => {
    setSettings({ ...settings, profile: profileData })
  }

  const handleBookingSave = (bookingData: Settings["booking"]) => {
    setSettings({ ...settings, booking: bookingData })
  }

  return (
    <div className="w-full mx-auto py-3">
      <Tabs defaultValue="profile" className="space-y-4 bg-[#FFFFFF] p-4 rounded-md shadow-sm">
        <div className="overflow-x-auto w-full">
        <TabsList className="inline-flex text-[0.8rem]">
  <TabsTrigger value="profile">
    <User className="mr-0 sm:mr-1 h-4 w-4" /> <span className="hidden sm:block">Profile</span>
  </TabsTrigger>
  <TabsTrigger value="bookings">
    <CalendarCheck className="mr-0 sm:mr-1 h-4 w-4" /> <span className="hidden sm:block">Bookings</span>
  </TabsTrigger>
  <TabsTrigger value="roles">
    <Shield className="mr-0 sm:mr-1 h-4 w-4" /> <span className="hidden sm:block">Roles & Permission</span>
  </TabsTrigger>
  <TabsTrigger value="notification">
    <Bell className="mr-0 sm:mr-1 h-4 w-4" /> <span className="hidden sm:block">Notification</span>
  </TabsTrigger>
  <TabsTrigger value="audit">
    <FileText className="mr-0 sm:mr-1 h-4 w-4" /> <span className="hidden sm:block">Audit-log</span>
  </TabsTrigger>
</TabsList>
        </div>
        <TabsContent value="profile">
          <ProfileTab
            initialData={settings.profile}
            onSave={handleProfileSave}
          />
        </TabsContent>
        <TabsContent value="bookings">
          <BookingsTab
            initialData={settings.booking}
            onSave={handleBookingSave}
          />
        </TabsContent>
        <TabsContent value="roles">
          <RolesTab />
        </TabsContent>
        <TabsContent value="notification">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="audit">
          <AuditTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

