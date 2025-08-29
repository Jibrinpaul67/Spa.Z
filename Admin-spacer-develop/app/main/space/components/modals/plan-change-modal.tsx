"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PlanChangeModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isUpgrade: boolean
  organizationName: string
}

export function PlanChangeModal({
  isOpen,
  onClose,
  onConfirm,
  isUpgrade,
  organizationName,
}: PlanChangeModalProps) {
  const action = isUpgrade ? "upgrade" : "downgrade"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm {action}</DialogTitle>
          <DialogDescription>
            Are you sure you want to {action} the subscription for {organizationName}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm {action}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

