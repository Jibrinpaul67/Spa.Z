export interface SummaryCard {
    title: string
    value: string | number
    icon: string
  }
  
  export interface TimelineData {
    name: string
    value: number
  }
  
  export interface TopUser {
    id: string
    name: string
    booking: number
    hour: number
    trend: string
  }
  
  export interface TopSpace {
    id: string
    name: string
    booking: number
    hour: number
    trend: string
  }
  
  export interface DashboardData {
    summaryCards: {
      utilizations: number
      bookings: number
      users: number
      busiestDay: string
    }
    utilizationByWeekdays: TimelineData[]
    utilizationByTimeOfWeek: TimelineData[]
    topUsers: TopUser[]
    topSpaces: TopSpace[]
  }
  
  