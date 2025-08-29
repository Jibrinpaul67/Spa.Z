import { Calendar, Users, BookMarked, Building2 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface SummaryCardProps {
  title: string
  value: string | number
  type: "utilizations" | "bookings" | "users" | "busiestDay"
}

export function SummaryCard({ title, value, type }: SummaryCardProps) {
  const getIcon = () => {
    switch (type) {
      case "utilizations":
        return <Building2 className="h-4 w-4 text-red-500" />
      case "bookings":
        return <BookMarked className="h-4 w-4 text-blue-500" />
      case "users":
        return <Users className="h-4 w-4 text-green-500" />
      case "busiestDay":
        return <Calendar className="h-4 w-4 text-purple-500" />
    }
  }

  return (
    <Card className="shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            {getIcon()}
          </div>
          <div>
            <p className="text-[0.7rem] text-muted-foreground uppercase">{title}</p>
            <p className="text-[0.95rem] font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

