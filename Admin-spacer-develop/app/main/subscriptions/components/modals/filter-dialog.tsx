"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
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
import { FilterValues } from "../../types/subscription"

interface FilterDialogProps {
  isOpen: boolean
  onClose: () => void
  onFilter: (values: FilterValues) => void
  onReset: () => void
  organizationNames: string[]
}

export function FilterDialog({ isOpen, onClose, onFilter, onReset, organizationNames }: FilterDialogProps) {
  const [values, setValues] = useState<FilterValues>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredValues: FilterValues = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== undefined && v !== "all")
    ) as FilterValues
    onFilter(filteredValues)
    onClose()
  }

  const handleReset = () => {
    setValues({})
    onReset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Subscriptions</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="organization">Organization</Label>
            <Select
              value={values.organization ?? "all"}
              onValueChange={(value) => setValues({ ...values, organization: value === "all" ? null : value })}
            >
              <SelectTrigger id="organization">
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {organizationNames.map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plan">Plan</Label>
            <Select
              value={values.plan ?? "all"}
              onValueChange={(value) => setValues({ ...values, plan: value === "all" ? null : value as "Premium" | "Free" })}
            >
              <SelectTrigger id="plan">
                <SelectValue placeholder="Select plan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nextBillingDate">Next Billing Date</Label>
            <Input
              id="nextBillingDate"
              type="date"
              value={values.nextBillingDate || ""}
              onChange={(e) => setValues({ ...values, nextBillingDate: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={values.status ?? "all"}
              onValueChange={(value) => setValues({ ...values, status: value === "all" ? null : value as "Pending" | "Successful" })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Successful">Successful</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
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