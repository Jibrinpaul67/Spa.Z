"use client"

import {
 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TimelineData } from "../../types/organization-dashboard"


interface UtilizationChartsProps {
  weekdaysData: TimelineData[]
  timeOfWeekData: TimelineData[]
}



export function UtilizationCharts({ weekdaysData, timeOfWeekData }: UtilizationChartsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Utilization by weekdays
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weekdaysData}
                margin={{
                  left: -25,
                  right: 0,
                  top: 5,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
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
                  dataKey="value"
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '5px',
                    fontSize: '0.7rem',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                />
                <defs>
                  <linearGradient id="gradientPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#FAE3FF"
                      stopOpacity={1}
                    />
                    <stop
                      offset="95%"
                      stopColor="#FAE3FF"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="value"
                  type="monotone"
                  fill="url(#gradientPresent)"
                  fillOpacity={0.4}
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Utilization by time of week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeOfWeekData}
                margin={{
                  top: 5,
                  right: 0,
                  left: -28,
                  bottom: 0,
                }}
                barSize={20}
              >
                <CartesianGrid 
                  vertical={false} 
                  strokeDasharray="0 0"
                  stroke="#ECE9F1"
                />
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 30, right: 10 }}
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 800]}
                  tick={{fontSize: 12}}
                  ticks={[0, 200, 400, 600, 800]}
                  fontSize={11}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(60, 7, 121, 0.1)' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '5px',
                    fontSize: '0.7rem',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                  formatter={(value: number) => [`${value} hours`, 'Hours']}
                  labelStyle={{ color: '#666', fontSize:'0.7rem' }}
                />
                <Bar
                  dataKey="value"
                  fill="#3C0779"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}