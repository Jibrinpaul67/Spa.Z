import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { TopUser, TopSpace } from "../../types/organization-dashboard"
  
  interface TopTablesProps {
    users: TopUser[]
    spaces: TopSpace[]
  }
  
  export function TopTables({ users, spaces }: TopTablesProps) {
    return (
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 w-full">
        <Card className="shadow-none w-full col-span-1">
          <CardHeader>
            <CardTitle>Top Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Booking</TableHead>
                  <TableHead className="hidden md:table-cell">Hour</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.booking}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.hour}</TableCell>
                    <TableCell>{user.trend}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
  
        <Card className="shadow-none col-span-1">
          <CardHeader>
            <CardTitle>Top Space</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Space Name</TableHead>
                  <TableHead  className="hidden md:table-cell">Booking</TableHead>
                  <TableHead  className="hidden md:table-cell">Hour</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {spaces.map((space) => (
                  <TableRow key={space.id}>
                    <TableCell>{space.id}</TableCell>
                    <TableCell>{space.name}</TableCell>
                    <TableCell  className="hidden md:table-cell">{space.booking}</TableCell>
                    <TableCell  className="hidden md:table-cell">{space.hour}</TableCell>
                    <TableCell>{space.trend}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  