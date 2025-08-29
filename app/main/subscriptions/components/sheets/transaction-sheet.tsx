"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Subscription } from "../../types/subscription"

interface TransactionSheetProps {
  isOpen: boolean
  onClose: () => void
  subscription: Subscription
}

export function TransactionSheet({ isOpen, onClose, subscription }: TransactionSheetProps) {
  return (
    <Sheet  open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Transaction Receipt</SheetTitle>
          <SheetDescription>
            Subscription details for {subscription.organizationName}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Plan Type</h4>
            <p className="text-sm text-muted-foreground">{subscription.planType}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Start Date</h4>
            <p className="text-sm text-muted-foreground">{subscription.startDate}</p>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Next Billing Date</h4>
            <p className="text-sm text-muted-foreground">{subscription.nextBillingDate}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Status</h4>
            <p className={`text-sm ${
              subscription.status === "Successful" ? "text-green-600" : "text-red-600"
            }`}>
              {subscription.status}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Button  onClick={() => {
            // Handle payment confirmation
            console.log("Confirming payment for", subscription.organizationName)
            onClose()
          }}>
            Confirm Payment
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

