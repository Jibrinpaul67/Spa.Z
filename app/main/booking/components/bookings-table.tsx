"use client"

import { useState } from "react"
import {  MoreHorizontal, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Booking, FilterValues } from "../types/booking"
import { BookingFilterDialog } from "./modals/booking-filter-dialog"
import { BookingDetailsSheet } from "./sheets/booking-details-sheet"

interface BookingsTableProps {
  data: Booking[]
}

export function BookingsTable({ data: initialData }: BookingsTableProps) {
  const [data] = useState(initialData)
  const [search, setSearch] = useState("")
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [filters, setFilters] = useState<FilterValues>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [organizationNames] = useState(() =>
    Array.from(new Set(data.map((booking) => booking.organizationName)))
  )

  const handleFilter = (values: FilterValues) => {
    setFilters(values)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  const filteredData = data.filter((booking) => {
    let matches = true

    if (search) {
      matches = matches && Object.values(booking).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filters.organization) {
      matches = matches && booking.organizationName === filters.organization
    }

    if (filters.startDate) {
      matches = matches && new Date(booking.startDate) >= new Date(filters.startDate)
    }

    if (filters.endDate) {
      matches = matches && new Date(booking.endDate) <= new Date(filters.endDate)
    }

    if (filters.status) {
      const today = new Date()
      const startDate = new Date(booking.startDate)
      const endDate = new Date(booking.endDate)

      switch (filters.status) {
        case "Past":
          matches = matches && endDate < today
          break
        case "Present":
          matches = matches && startDate <= today && endDate >= today
          break
        case "Upcoming":
          matches = matches && startDate > today
          break
      }
    }

    return matches
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800"
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Past":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Card className="w-full shadow-none">
        <CardContent className="py-3 px-3">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 justify-between w-full">
              <Input
                placeholder="Search bookings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
              <Button
               className="bg-[#FAF5FF] px-2 border border-[#5105A9]"
                variant="outline"
                size="icon"
                onClick={() => setFilterDialogOpen(true)}
              >
                <ListFilter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="hidden lg:table-cell w-auto text-[0.75rem] py-[0.4rem]">
                  S/N
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Booking ID
                </TableHead>
                <TableHead className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                  Organization name
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Space Name
                </TableHead>
                <TableHead className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                  Start Date
                </TableHead>
                <TableHead className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                  End Date
                </TableHead>
                <TableHead className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                  Status
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((booking, index) => (
                <TableRow
                  key={booking.id}
                  className={`
                    hover:bg-transparent 
                    border-b 
                    border-gray-100
                    ${
                      index % 2 === 0
                        ? "bg-[#FEFBFF] hover:bg-[#FEFBFF]"
                        : "bg-transparent hover:bg-transparent"
                    }
                  `}
                >
                  <TableCell className="hidden lg:table-cell font-medium text-[0.75rem] py-[0.4rem]">
                    {booking.id}
                  </TableCell>
                  <TableCell className="text-[0.75rem] py-[0.4rem]">
                    {booking.bookingId}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                    {booking.organizationName}
                  </TableCell>
                  <TableCell className="text-[0.75rem] py-[0.4rem]">
                    {booking.spaceName}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                    {booking.startDate}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                    {booking.endDate}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-[0.75rem] py-[0.4rem]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedBooking(booking)
                            setBookingDetailsOpen(true)
                          }}
                          className="text-xs"
                        >
                          View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <div className="mt-6 flex justify-end">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <BookingFilterDialog
        isOpen={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onFilter={handleFilter}
        onReset={resetFilters}
        organizationNames={organizationNames}
      />

      {selectedBooking && (
        <BookingDetailsSheet
          isOpen={bookingDetailsOpen}
          onClose={() => {
            setBookingDetailsOpen(false)
            setSelectedBooking(null)
          }}
          booking={selectedBooking}
        />
      )}
    </>
  )
}

