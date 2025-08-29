export interface Organization {
  id: string
  organizationName: string
  fullName: string
  email: string
  phone: string
  address: string
  status: "active" | "inactive"
  selected?: boolean
}


  