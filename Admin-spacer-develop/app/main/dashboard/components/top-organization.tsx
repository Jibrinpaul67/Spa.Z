import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Organization } from "../types/dashboard"
  
  interface TopOrganizationProps {
    data: Organization[]
  }
  
  export function TopOrganization({ data }: TopOrganizationProps) {
    return (
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle  className='text-sm text-muted-foreground'>Top Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent ">
                <TableHead className="w-auto text-[0.75rem]   py-[0.65rem]">S/N</TableHead>
                <TableHead  className="text-[0.75rem]  py-[0.65rem]">Organization</TableHead>
                <TableHead className="text-center text-[0.75rem]  py-[0.65rem]">No of Space</TableHead>
                <TableHead className="text-center text-[0.75rem]   py-[0.65rem]">Booking</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((org, index) => (
                <TableRow key={org.id} className={`
                  hover:bg-transparent 
                  border-b 
                  border-gray-100
                 
                  ${index % 2 === 0 ? 'bg-[#FEFBFF] hover:bg-[#FEFBFF]' : 'bg-transparent hover:bg-transparent'}
                `}>
                  <TableCell className="font-medium text-[0.75rem] py-[0.65rem]">{org.id}</TableCell>
                  <TableCell className="text-[0.75rem] py-[0.65rem]">{org.name}</TableCell>
                  <TableCell className="text-center text-[0.75rem] py-[0.65rem]">{org.spaces}</TableCell>
                  <TableCell className="text-center text-[0.75rem] py-[0.65rem]">{org.bookings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  
  