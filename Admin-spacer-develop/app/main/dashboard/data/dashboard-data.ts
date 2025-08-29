import { Users, LayoutGrid, Calendar, PieChart } from 'lucide-react'
import { CardData, PaymentData, WeeklyEstimate, Organization, SpacePerformance } from "../types/dashboard"

export const cardData: CardData[] = [
  {
    title: "ORGANIZATIONS",
    value: "874",
    icon: Users,
    color: "#FF3838"
  },
  {
    title: "TOTAL SPACE LISTED",
    value: "243",
    icon: LayoutGrid,
    color: "#4886FF"
  },
  {
    title: "ACTIVE BOOKING",
    value: "434",
    icon: Calendar,
    color: "#3ED368"
  },
  {
    title: "UTILIZATION RATE",
    value: "25%",
    icon: PieChart,
    color:"#DE7AE7"
  }
]

export const paymentData: PaymentData[] = [
  { month: "Jan", previous: 450, present: 150 },
  { month: "Feb", previous: 123, present: 237 },
  { month: "Mar", previous: 80, present: 493 },
  { month: "Apr", previous: 650, present: 283 },
  { month: "May", previous: 453, present: 10 },
  { month: "Jun", previous: 56, present: 150 },
  { month: "Jul", previous: 340, present: 340 },
  { month: "Aug", previous: 230, present: 23 },
  { month: "Sep", previous: 120, present: 50 },
  { month: "Oct", previous: 230, present: 100 },
  { month: "Nov", previous: 40, present: 170 },
  { month: "Dec", previous: 150, present: 250 },
];


export const weeklyEstimates: WeeklyEstimate[] = [
  { space: "Mon", hours: 400 },
  { space: "Tue", hours: 200 },
  { space: "Wed", hours: 600 },
  { space: "Thur", hours: 750 },
  { space: "Fri", hours: 150 },
  { space: "Sat", hours: 680 },
  { space: "Sun", hours: 50 },
 
]

export const organizations: Organization[] = [
  {
    id: 1,
    name: "TAY Ltd",
    email: "tobyirikefe@gmail.com",
    phone: "08101831001",
    spaces: 350,
    bookings: 150
  },
  {
    id: 2,
    name: "Abolanle Transport",
    email: "abolanleyobam@gmail.com",
    phone: "08101831001",
    spaces: 120,
    bookings: 93
  },
  {
    id: 3,
    name: "ABC Transport",
    email: "kennethbaver@gmail.com",
    phone: "08101831001",
    spaces: 150,
    bookings: 50
  },
  {
    id: 4,
    name: "Flora",
    email: "kennethbaver@gmail.com",
    phone: "08101831001",
    spaces: 150,
    bookings: 50
  },
  {
    id: 5,
    name: "Shoprite",
    email: "kennethbaver@gmail.com",
    phone: "08101831001",
    spaces: 150,
    bookings: 50
  }
]

export const spacePerformance: SpacePerformance[] = [
  {
    name: "Melson Hall",
    rate: "200 hr/Week",
    value: 35,
    color: "#3B00ED"
  },
  {
    name: "Kaune Space",
    rate: "134 hr/Week",
    value: 28,
    color: "#D81B60"
  },
  {
    name: "Fakuai Mall",
    rate: "74 hr/Week",
    value: 20,
    color: "#9C27B0"
  },
  {
    name: "Jewe Space",
    rate: "34 hr/Week",
    value: 17,
    color: "#FF9800"
  }
]

