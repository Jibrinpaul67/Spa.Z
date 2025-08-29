import { Space } from "../types/space"

export const spaces: Space[] = [
  {
    id: "01",
    spaceName: "Space 01",
    organizationName: "TAY Ltd",
    status: "Active",
    description: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis vitae ut velit pharetra amet. Porttitor pellentesque lectus cursus amet.",
    image: "/placeholder.svg?height=400&width=600",
    visibilityTags: ["Casual Users", "Owner", "System Admin"],
    busiestDay: "Saturday",
    inUse: true
  },
  {
    id: "02",
    spaceName: "Space 02",
    organizationName: "Abolanle Transport",
    status: "Inactive",
    description: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis vitae ut velit pharetra amet.",
    image: "/placeholder.svg?height=400&width=600",
    visibilityTags: ["Owner", "System Admin"],
    busiestDay: "Friday",
    inUse: false
  },
  {
    id: "03",
    spaceName: "Space 03",
    organizationName: "ABC Transport",
    status: "Inactive",
    description: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis vitae ut velit pharetra amet.",
    image: "/placeholder.svg?height=400&width=600",
    visibilityTags: ["Casual Users", "System Admin"],
    busiestDay: "Sunday",
    inUse: false
  },
  {
    id: "04",
    spaceName: "Space 04",
    organizationName: "GIG",
    status: "Active",
    description: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis vitae ut velit pharetra amet.",
    image: "/placeholder.svg?height=400&width=600",
    visibilityTags: ["Owner"],
    busiestDay: "Monday",
    inUse: true
  }
]

