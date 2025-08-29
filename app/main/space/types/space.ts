export interface Space {
    id: string
    spaceName: string
    organizationName: string
    status: "Active" | "Inactive"
    description: string
    image: string
    visibilityTags: string[]
    busiestDay: string
    inUse: boolean
  }
  
  export interface FilterValues {
    organization?: string | null
    status?: "Active" | "Inactive" | null
  }
  
  