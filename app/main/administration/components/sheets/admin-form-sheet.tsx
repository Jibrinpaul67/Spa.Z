"use client"

import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { RotatingLines } from "react-loader-spinner"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Admin, AdminFormData } from "../../types/admin"

import "react-toastify/dist/ReactToastify.css"
import api from "@/app/utils/api"

interface AdminFormSheetProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AdminFormData) => void
  initialData?: Admin
  title: string
}

const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

export function AdminFormSheet({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: AdminFormSheetProps) {
  const [formData, setFormData] = useState<AdminFormData>({
    fullName: initialData?.fullName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    role: initialData?.role || "Admin"
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post("/admin/invite", {
        email: formData.email,
        name: formData.fullName,
        phoneNumber: formData.phone,
        role: formData.role,
        frontendUrl: "https://admin-spacer.vercel.app/newinvite" // Hardcoded frontend URL
      })

      if (response.data.success) {
        toast.success("Admin invited successfully!")
        onSubmit(formData)
        onClose()
      } else {
        toast.error(response.data.message || "Failed to invite admin")
      }
    } catch (error) {
      console.error("Error inviting admin:", error)
      toast.error("An error occurred while inviting the admin")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="flex-row justify-between items-center mb-6">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: "Super Admin" | "Admin") =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={isLoading} className="w-auto">
            {isLoading ? (
              <>
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />
                <span className="ml-2">processing...</span>
              </>
            ) : (
              "Invite Admin"
            )}
          </Button>
        </form>
      </SheetContent>
      <ToastContainer />
    </Sheet>
  )
}

