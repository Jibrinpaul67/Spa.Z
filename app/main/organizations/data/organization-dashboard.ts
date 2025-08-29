import { DashboardData } from "../types/organization-dashboard"

export const dashboardData: DashboardData = {
  summaryCards: {
    utilizations: 874,
    bookings: 243,
    users: 434,
    busiestDay: "SUN"
  },
  utilizationByWeekdays: [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 180 },
    { name: "March", value: 150 },
    { name: "April", value: 140 },
    { name: "May", value: 220 },
    { name: "June", value: 320 },
    { name: "July", value: 310 },
    { name: "Aug", value: 320 },
    { name: "Sept", value: 350 },
    { name: "Oct", value: 280 },
    { name: "Nov", value: 800 },
    { name: "Dec", value: 220 }
  ],
  utilizationByTimeOfWeek: [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 200 },
    { name: "Wed", value: 600 },
    { name: "Thurs", value: 800 },
    { name: "Fri", value: 150 },
    { name: "Sat", value: 600 },
    { name: "Sun", value: 300 }
  ],
  topUsers: [
    { id: "01", name: "Charles John", booking: 9, hour: 50, trend: "50 %" },
    { id: "02", name: "Segun Sule", booking: 9, hour: 20, trend: "43 %" },
    { id: "03", name: "Kanneth Bent", booking: 9, hour: 50, trend: "50 %" }
  ],
  topSpaces: [
    { id: "01", name: "Novare Hall", booking: 9, hour: 50, trend: "50 %" },
    { id: "02", name: "Lady Kwali Hall", booking: 9, hour: 20, trend: "43 %" },
    { id: "03", name: "Mestro Hall", booking: 9, hour: 50, trend: "50 %" }
  ]
}

