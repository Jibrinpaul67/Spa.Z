"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { UserProfile } from "../../types/settings"
import { PasswordChangeModal } from "../modals/password-change-modal"

interface ProfileTabProps {
  initialData: UserProfile
  onSave: (data: UserProfile) => void
}

export function ProfileTab({ initialData, onSave }: ProfileTabProps) {
  const [data, setData] = useState(initialData)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(data)
  }

  const handlePasswordChange = (newPassword: string) => {
    console.log("Password changed:", newPassword)
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-none">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <h2 className="text-[0.92rem] font-semibold text-purple-600">Personal Details</h2>
              <p className="text-[0.85rem] text-muted-foreground mt-2 leading-5">
                Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat
                quis vitae ut velit pharetra amet. Porttitor pellentesque lectus cursus
                amet.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="col-span-1 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Firstname</Label>
                  <Input
                    id="firstName"
                    value={data.firstName}
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Lastname</Label>
                  <Input
                    id="lastName"
                    value={data.lastName}
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div  className="col-span-1">
              <h2 className="text-[0.92rem] font-semibold text-purple-600">Password</h2>
              <p className="text-[0.85rem] leading-5 text-muted-foreground mt-2">
                Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat
                quis vitae ut velit pharetra amet.
              </p>
            </div>
            <div className="col-span-1 ">
              <Input
                type="password"
                value="************"
                disabled
                className="w-full "
              />

               <div className="flex justify-end mt-3"> 
                <Button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
              >
                Change Password
              </Button></div>
             
            </div>
          </div>
        </CardContent>
      </Card>

      <PasswordChangeModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </div>
  )
}

