export interface Subscription {
    id: string
    organizationName: string
    planType: "Premium" | "Free"
    startDate: string
   
    nextBillingDate: string
    status: "Pending" | "Successful"
    selected?: boolean
  }
  
  export interface FilterValues {
    organization?: string | null;
    plan?: "Premium" | "Free" | null;
    nextBillingDate?: string;
    status?: "Pending" | "Successful" | null;
  }
  
  
  
  