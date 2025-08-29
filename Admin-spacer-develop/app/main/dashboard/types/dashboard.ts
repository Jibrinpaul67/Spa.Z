import { type LucideIcon } from 'lucide-react'

export interface CardData {
  title: string
  value: string | number
  icon: LucideIcon
  color:string
}

export interface PaymentData {
  month: string
  present: number
  previous: number
}

export interface WeeklyEstimate {
  space: string
  hours: number
}

export interface Organization {
  id: number
  name: string
  email: string
  phone: string
  spaces: number
  bookings: number
}

export interface SpacePerformance {
  name: string
  rate: string
  value: number
  color: string
}

