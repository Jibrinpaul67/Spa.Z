"use client"


import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { User } from "../../types/user"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface UserDetailsSheetProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export function UserDetailsSheet({ isOpen, onClose, user }: UserDetailsSheetProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="flex-row justify-between items-center mb-6">
          <SheetTitle>User Details</SheetTitle>
        
        </SheetHeader>
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 text-2xl">
              <AvatarFallback>{getInitials(user.fullname)}</AvatarFallback>
            </Avatar>
            {user.isActive && (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">Active Users</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-600">Personal Details</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg font-semibold">{user.fullname}</p>
                  <p className="text-sm text-muted-foreground">Fullname</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{user.email}</p>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{user.phone}</p>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{user.role}</p>
                  <p className="text-sm text-muted-foreground">Tag</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-600">Activities Log</h3>
              <div className="mt-4 space-y-4">
                {user.activities.map((activity, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-purple-600">{activity.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

