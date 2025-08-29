export interface User {
    id: string
    fullname: string
    email: string
    phone: string
    role: "Casual Users" | "System Admin" | "Owner" | "Booking Manager"
    organization: string
    isActive: boolean
    activities: Activity[]
  }
  
  export interface Activity {
    description: string
    timestamp: string
  }
  
  export interface FilterValues {
    organization?: string | null
    role?: "Casual Users" | "System Admin" | "Owner" | "Booking Manager" | null
  }
  
  