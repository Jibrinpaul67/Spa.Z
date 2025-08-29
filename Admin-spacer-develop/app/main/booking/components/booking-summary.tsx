import type { BookingSummary } from "../types/booking"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Calendar, Clock, User } from 'lucide-react'

interface BookingSummaryProps {
  data: BookingSummary
}

export function BookingSummary({ data }: BookingSummaryProps) {
  const summaryCards = [
    {
      title: "Popular space",
      value: data.popularSpace.name,
      icon: Building2,
      iconColor: "#FF3838"
    },
    {
      title: "Most frequent user",
      value: data.frequentUser.name,
      // subtext: data.frequentUser.organization,
      icon: User,
      iconColor: "#4886FF"
    },
    {
      title: "Most common day",
      value: data.commonDay,
      icon: Calendar,
      iconColor: "#3ED368"
    },
    {
      title: "Most common duration",
      value: `${data.commonDuration.start} - ${data.commonDuration.end}`,
      icon: Clock,
      iconColor: "#DE7AE7"
    }
  ]

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card, index) => (
        <Card key={index}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-md p-2 `}  style={{ backgroundColor: `${card.iconColor}1A` }}>
              <card.icon className={`h-5 w-5 `} style={{ color: card.iconColor }} />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">{card.title}</p>
              <p className="text-[0.8rem] font-semibold">{card.value}</p>
              {/* {card.subtext && (
                <p className="text-sm text-muted-foreground">{card.subtext}</p>
              )} */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

