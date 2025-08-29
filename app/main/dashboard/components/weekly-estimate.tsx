"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid 
} from "recharts"
import { WeeklyEstimate } from "../types/dashboard"

interface WeeklyEstimateProps {
  data: WeeklyEstimate[]
}

export function WeeklyEstimateChart({ data }: WeeklyEstimateProps) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className='text-sm text-muted-foreground'>Weekly Estimated Hour</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%" >
            <BarChart
              data={data}
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
                dataKey="space"
                scale="point"
                padding={{ left: 30, right: 10 }}
                tickLine={false}
                axisLine={false}  // Changed to true to show x-axis line
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
              
                cursor={{ fill: 'rgba(60, 7, 121, 0.1)' }}  // Light purple hover effect
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
                dataKey="hours"
                fill="#3C0779"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}