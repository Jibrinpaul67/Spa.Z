"use client"


import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { Booking } from "../../types/booking"

interface BookingDetailsSheetProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking
}

export function BookingDetailsSheet({
  isOpen,
  onClose,
  booking,
}: BookingDetailsSheetProps) {
  const details = [
    { label: "Booking ID", value: booking.bookingId },
    { label: "Organization Name", value: booking.organizationName },
    { label: "Full Name", value: booking.fullName },
    { label: "Status", value: booking.status },
    { label: "Start Date", value: booking.startDate },
    { label: "End Date", value: booking.endDate },
    { label: "Start Time", value: booking.startTime },
    { label: "End Time", value: booking.endTime },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="flex-row justify-between items-center mb-6">
          <SheetTitle>Booking Details</SheetTitle>
        
        </SheetHeader>
        <div className="space-y-6">
          {details.map((detail, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm text-muted-foreground">{detail.label}</p>
              <p className="text-base font-medium">{detail.value}</p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

