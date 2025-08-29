"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PaymentData } from "../types/dashboard"

interface PaymentReportProps {
  data: PaymentData[]
}

const chartConfig = {
 
  previous: {
    label: "Previous",
    color: "#ECE9F1",
  },
  present: {
    label: "Present",
    color: "#F4BBFF",
  },
} satisfies ChartConfig

export function PaymentReport({ data }: PaymentReportProps) {
  return (
    <Card className="shadow-none w-full">
      <CardHeader className="flex flex-row items-center justify-between h-10 w-full">
        <div>
          <CardTitle className='text-sm text-muted-foreground'>Payment Report</CardTitle>
        </div>
        <Select defaultValue="2020">
          <SelectTrigger className="w-[70px] h-7 text-xs">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent position="popper" align="end" className="w-[60px]">
            <SelectItem className="text-xs" value="2020">2020</SelectItem>
            <SelectItem className="text-xs" value="2021">2021</SelectItem>
            <SelectItem className="text-xs" value="2022">2022</SelectItem>
            <SelectItem className="text-xs" value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="w-full">
        <ChartContainer className="h-[200px] w-full" config={chartConfig}>
          <AreaChart
          className="w-full"
            accessibilityLayer
            data={data}
            margin={{
              left: -25,
              right: 0,
              top: 5,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              fontSize={11}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              fontSize={11}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="gradientPresent" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.present.color}
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.present.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="gradientPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.previous.color}
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.previous.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="present"
              type="natural"
              fill="url(#gradientPresent)"
              fillOpacity={0.4}
              stroke={chartConfig.present.color}
              strokeWidth={2}
            />
            <Area
              dataKey="previous"
              type="natural"
              fill="url(#gradientPrevious)"
              fillOpacity={0.4}
              stroke={chartConfig.previous.color}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

