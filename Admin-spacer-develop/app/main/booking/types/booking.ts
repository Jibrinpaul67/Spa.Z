export interface Booking {
    id: string
    bookingId: string
    organizationName: string
    spaceName: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    status: "Past" | "Present" | "Upcoming" // Updated status type
    fullName: string
  }
  
  export interface BookingSummary {
    popularSpace: {
      name: string
      id: string
    }
    frequentUser: {
      name: string
      organization: string
    }
    commonDay: string
    commonDuration: {
      start: string
      end: string
    }
  }
  
  export interface FilterValues {
    organization?: string | null
    startDate?: string
    endDate?: string
    status?: "Past" | "Present" | "Upcoming" | null
  }
  
  