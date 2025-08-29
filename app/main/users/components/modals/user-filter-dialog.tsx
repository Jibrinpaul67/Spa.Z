"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FilterValues } from "../../types/user"
import { RefreshCw } from 'lucide-react'

interface UserFilterDialogProps {
  isOpen: boolean
  onClose: () => void
  onFilter: (values: FilterValues) => void
  onReset: () => void
  organizationNames: string[]
}

export function UserFilterDialog({
  isOpen,
  onClose,
  onFilter,
  onReset,
  organizationNames,
}: UserFilterDialogProps) {
  const [values, setValues] = useState<FilterValues>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== "all")
    ) as FilterValues
    onFilter(filteredValues)
    onClose()
  }

  const handleReset = () => {
    setValues({})
    onReset()
  }

  const roles = ["Casual Users", "System Admin", "Owner", "Booking Manager"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Filter Users
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="h-8 w-8"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="organization">Organization</Label>
            <Select
              value={values.organization ?? "all"}
              onValueChange={(value) =>
                setValues({ ...values, organization: value === "all" ? null : value })
              }
            >
              <SelectTrigger id="organization">
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {organizationNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={values.role ?? "all"}
              onValueChange={(value) =>
                setValues({
                  ...values,
                  role: value === "all" ? null : value as "Casual Users" | "System Admin" | "Owner" | "Booking Manager",
                })
              }
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Apply Filters</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}