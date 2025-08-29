"use client"


import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { OrganizationDashboard } from "../dashboard/organization-dashboard"
import { dashboardData } from "../../data/organization-dashboard"

interface OrganizationDashboardSheetProps {
  isOpen: boolean
  onClose: () => void
  organizationName: string
}

export function OrganizationDashboardSheet({
  isOpen,
  onClose,
  organizationName,
}: OrganizationDashboardSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose} >
      <SheetContent className="w-full max-w-[100%] sm:max-w-[100%]  md:max-w-[100%] overflow-y-auto bg-[#F9F9F9]">
        <SheetHeader className="flex-row justify-between items-center mb-6">
          <SheetTitle>{organizationName} Dashboard</SheetTitle>
         
        </SheetHeader>
        <OrganizationDashboard data={dashboardData} />
      </SheetContent>
    </Sheet>
  )
}

