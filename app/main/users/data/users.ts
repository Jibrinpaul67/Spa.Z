import { User } from "../types/user"

export const users: User[] = [
  {
    id: "01",
    fullname: "David Samuel",
    email: "tobuyinlafella@gmail.com",
    phone: "08101831001",
    role: "Casual Users",
    organization: "TAY Ltd",
    isActive: true,
    activities: [
      {
        description: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis",
        timestamp: "June 24, 2024 02:40pm"
      },
      {
        description: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis",
        timestamp: "June 24, 2024 02:40pm"
      },
      {
        description: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis",
        timestamp: "June 24, 2024 02:40pm"
      }
    ]
  },
  {
    id: "02",
    fullname: "Smith Ben",
    email: "abolanleyobam@gmail.com",
    phone: "08101831001",
    role: "System Admin",
    organization: "Abolanle Transport",
    isActive: true,
    activities: []
  },
  {
    id: "03",
    fullname: "Daniel Thompson",
    email: "samuelkbuyers@gmail.com",
    phone: "08101831001",
    role: "Owner",
    organization: "ABC Transport",
    isActive: true,
    activities: []
  },
  {
    id: "04",
    fullname: "Adeola Damilola",
    email: "felixchukwu@gmail.com",
    phone: "08101831001",
    role: "Booking Manager",
    organization: "GIG",
    isActive: false,
    activities: []
  },
  {
    id: "05",
    fullname: "Cole Princess",
    email: "ginabyusufdarjuma@gmail.com",
    phone: "08101831001",
    role: "Booking Manager",
    organization: "Geruba Ltd",
    isActive: true,
    activities: []
  }
]

