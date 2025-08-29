import { Role } from "../types/role"

export const roles: Role[] = [
  {
    id: "super-admin",
    title: "Super Admin",
    permissions: [
      "view-dashboard",
      "manage-organization",
      "view-payments",
      "generate-reports",
      "manage-space",
      "manage-users"
    ]
  },
  {
    id: "admin",
    title: "Admin",
    permissions: [
      "view-dashboard",
      "manage-organization",
      "view-payments",
      "generate-reports",
      "manage-space",
      "manage-users"
    ]
  }
]

