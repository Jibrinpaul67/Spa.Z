import { Permission } from "../types/role"

export const permissions: Permission[] = [
  {
    id: "view-dashboard",
    name: "View Dashboard",
    module: "dashboard",
    description: "View Dashboard"
  },
  {
    id: "manage-organization",
    name: "View Organization and manage organization",
    module: "organization",
    description: "organization module"
  },
  {
    id: "view-payments",
    name: "View Organization payment history and confirm payment",
    module: "organization",
    description: "organization module"
  },
  {
    id: "generate-reports",
    name: "Generate reports",
    module: "reports",
    description: "modules"
  },
  {
    id: "manage-space",
    name: "View and manage space",
    module: "space",
    description: "space module"
  },
  {
    id: "manage-users",
    name: "Activates and deactivate users",
    module: "user",
    description: "user management module"
  }
]

