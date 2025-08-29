import { Booking, BookingSummary } from "../types/booking"

export const bookingSummary: BookingSummary = {
  popularSpace: {
    name: "Space 01",
    id: "SP001"
  },
  frequentUser: {
    name: "David Samuel",
    organization: "TAY LTD"
  },
  commonDay: "Monday",
  commonDuration: {
    start: "2:00pm",
    end: "3:00pm"
  }
}

export const bookings: Booking[] = [
  {
    id: "01",
    bookingId: "DB004",
    organizationName: "TAY Ltd",
    spaceName: "Space 01",
    startDate: "23-09-2024",
    endDate: "23-10-2024",
    startTime: "03:40 AM",
    endTime: "07:40 PM",
    status: "Upcoming", // Updated status
    fullName: "David Samuel"
  },
  {
    id: "02",
    bookingId: "DB007",
    organizationName: "Abolanle Transport",
    spaceName: "Space 02",
    startDate: "13-09-2024",
    endDate: "13-10-2024",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    status: "Present", // Updated status
    fullName: "John Doe"
  },
  {
    id: "03",
    bookingId: "DB010",
    organizationName: "ABC Transport",
    spaceName: "Space 03",
    startDate: "23-08-2024",
    endDate: "23-09-2024",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    status: "Past", // Updated status
    fullName: "Jane Smith"
  }
  ,
  {
    id: "04",
    bookingId: "DB004",
    organizationName: "TAY Ltd",
    spaceName: "Space 01",
    startDate: "23-09-2024",
    endDate: "23-10-2024",
    startTime: "03:40 AM",
    endTime: "07:40 PM",
    status: "Upcoming", // Updated status
    fullName: "David Samuel"
  },
]

