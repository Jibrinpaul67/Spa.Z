import { SummaryCard } from "./summary-card"
import { UtilizationCharts } from "./utilization-charts"
import { TopTables } from "./top-tables"
import { DashboardData } from "../../types/organization-dashboard"

interface OrganizationDashboardProps {
  data: DashboardData
}

export function OrganizationDashboard({ data }: OrganizationDashboardProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="UTILIZATIONS"
          value={data.summaryCards.utilizations}
          type="utilizations"
        />
        <SummaryCard
          title="BOOKINGS"
          value={data.summaryCards.bookings}
          type="bookings"
        />
        <SummaryCard
          title="USERS"
          value={data.summaryCards.users}
          type="users"
        />
        <SummaryCard
          title="BUSIEST DAY"
          value={data.summaryCards.busiestDay}
          type="busiestDay"
        />
      </div>

      <UtilizationCharts
        weekdaysData={data.utilizationByWeekdays}
        timeOfWeekData={data.utilizationByTimeOfWeek}
      />

      <TopTables
        users={data.topUsers}
        spaces={data.topSpaces}
      />
    </div>
  )
}

