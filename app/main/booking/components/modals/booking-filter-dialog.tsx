"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FilterValues } from "../../types/booking"
import { RefreshCw } from 'lucide-react'

interface BookingFilterDialogProps {
  isOpen: boolean
  onClose: () => void
  onFilter: (values: FilterValues) => void
  onReset: () => void
  organizationNames: string[]
}

export function BookingFilterDialog({
  isOpen,
  onClose,
  onFilter,
  onReset,
  organizationNames,
}: BookingFilterDialogProps) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Filter Bookings
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
            <Label>Date Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="startDate" className="sr-only">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={values.startDate || ""}
                  onChange={(e) =>
                    setValues({ ...values, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="sr-only">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={values.endDate || ""}
                  onChange={(e) =>
                    setValues({ ...values, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={values.status ?? "all"}
              onValueChange={(value) =>
                setValues({
                  ...values,
                  status: value === "all" ? null : value as "Past" | "Present" | "Upcoming",
                })
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Past">Past</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
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