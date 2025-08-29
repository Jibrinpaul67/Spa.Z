import { Card, CardContent } from "@/components/ui/card";
import { CardData } from "../types/dashboard";

interface CardDataProps {
  data: CardData[];
}

export function CardDataSection({ data }: CardDataProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {data.map((card, index) => (
        <Card key={index} className="col-span-1 bg-background shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <div
              className="rounded-md p-2"
              style={{ backgroundColor: `${card.color}1A` }} // 1A = 10% opacity in hex
            >
              <card.icon className="h-5 w-5" style={{ color: card.color }} />
            </div>
            <div className="space-y-0">
              <p className="text-[0.7rem] font-normal text-muted-foreground leading-none">
                {card.title}
              </p>
              <p className="text-[0.93rem] font-semibold text-[#233750]">
                {card.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
