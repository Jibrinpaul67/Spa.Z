"use client"

import { useState } from "react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Role, RoleFormData } from "../../types/role"
import { permissions } from "../../data/permissions"

interface RoleFormSheetProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: RoleFormData) => void
  initialData?: Role
  title: string
}

export function RoleFormSheet({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: RoleFormSheetProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    title: initialData?.title || "",
    permissions: initialData?.permissions || []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="overflow-y-scroll" >
        <SheetHeader className="flex-row justify-between items-center mb-6">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">
              Role Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter Role Title"
              required
            />
          </div>
          <div className="space-y-4">
            <Label className="text-base">
              Assign Permission <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-4">
              {permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm">{permission.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {permission.description}
                    </div>
                  </div>
                  <Switch
                    checked={formData.permissions.includes(permission.id)}
                    onCheckedChange={() => togglePermission(permission.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" >
            Save Role
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

