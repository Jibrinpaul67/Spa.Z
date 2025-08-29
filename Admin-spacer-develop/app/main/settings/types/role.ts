export interface Permission {
    id: string
    name: string
    module: string
    description: string
  }
  
  export interface Role {
    id: string
    title: string
    permissions: string[] // Array of permission IDs
  }
  
  export interface RoleFormData {
    title: string
    permissions: string[]
  }
  
  