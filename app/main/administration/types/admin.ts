export interface Admin {
    id: string
    fullName: string
    email: string
    phone: string
    role: "Super Admin" | "Admin"
    status: "Active" | "Inactive"
  }
  
  export interface AdminFormData {
    fullName: string
    email: string
    phone: string
    role: "Super Admin" | "Admin"
  }
  
  