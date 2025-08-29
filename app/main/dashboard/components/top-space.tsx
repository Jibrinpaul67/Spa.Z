"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps } from "recharts"
import { SpacePerformance } from "../types/dashboard"

interface TopSpaceProps {
  data: SpacePerformance[]
}


// Define the type for the tooltip props
type CustomTooltipProps = TooltipProps<number, string> & {
  active?: boolean;
  payload?: {
    payload: SpacePerformance;
    value: number;
  }[];
}

// Custom tooltip component with proper typing
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-md">
        <p className="font-medium text-sm">{data.name}</p>
        <p className="text-xs text-muted-foreground">{data.rate}</p>
      </div>
    );
  }
  return null;
};


export function TopSpace({ data }: TopSpaceProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className='text-sm text-muted-foreground'>Top Performing Space</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip 
                content={<CustomTooltip />}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col space-y-1">
              <div className="flex items-center text-xs">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-[#27262c]">{item.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{item.rate}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

