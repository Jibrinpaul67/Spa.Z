"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { auditLogs } from "../../data/audit-logs"

export function AuditTab() {
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
    <div className="col-span-1">
      <p className="text-muted-foreground text-[0.85rem] leading-6">
      Configure and manage alerts, reminders, and announcements to keep users informed about bookings, updates, and important events.
      </p>
    </div>

    <div className="col-span-1 space-y-6 py-4">
      <ul className="space-y-6">
        {auditLogs.map((log) => (
          <li key={log.id} className="flex items-start gap-4">
            <Avatar className="h-10 w-10 bg-blue-50 border-0">
              <AvatarFallback className="bg-blue-50 text-sm">
                {log.userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm">{log.description}</p>
              <p className="text-xs text-muted-foreground">{log.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

