"use client"

import { useState } from "react"
import { ListFilter, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
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
import { Space, FilterValues } from "../types/space"
import { SpaceFilterDialog } from "./modals/space-filter-dialog"
import { SpaceDetailsSheet } from "./sheets/space-details-sheet"
import { ConfirmModal } from "./modals/confirm-modal"

interface SpacesTableProps {
  data: Space[]
}

export function SpacesTable({ data: initialData }: SpacesTableProps) {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState("")
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [spaceDetailsOpen, setSpaceDetailsOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [confirmAction, setConfirmAction] = useState<{
    title: string
    description: string
    action: () => void
  } | null>(null)
  const [filters, setFilters] = useState<FilterValues>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [organizationNames] = useState(() =>
    Array.from(new Set(data.map((space) => space.organizationName)))
  )

  const handleFilter = (values: FilterValues) => {
    setFilters(values)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  const handleStatusChange = (space: Space) => {
    const newStatus = space.status === "Active" ? "Inactive" : "Active"
    const action = space.status === "Active" ? "deactivate" : "activate"

    setSelectedSpace(space)
    setConfirmAction({
      title: `Confirm ${action}`,
      description: `Are you sure you want to ${action} ${space.spaceName}?`,
      action: () => {
        setData((prev) =>
          prev.map((s) =>
            s.id === space.id ? { ...s, status: newStatus } : s
          )
        )
        setConfirmModalOpen(false)
        setSelectedSpace(null)
      },
    })
    setConfirmModalOpen(true)
  }

  const handleDelete = (space: Space) => {
    setSelectedSpace(space)
    setConfirmAction({
      title: "Confirm delete",
      description: `Are you sure you want to delete ${space.spaceName}?`,
      action: () => {
        setData((prev) => prev.filter((s) => s.id !== space.id))
        setConfirmModalOpen(false)
        setSelectedSpace(null)
      },
    })
    setConfirmModalOpen(true)
  }

  const filteredData = data.filter((space) => {
    let matches = true

    if (search) {
      matches = matches && Object.values(space).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filters.organization) {
      matches = matches && space.organizationName === filters.organization
    }

    if (filters.status) {
      matches = matches && space.status === filters.status
    }

    return matches
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>
      <Card className="w-full shadow-none">
        <CardContent className="py-3 px-3">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 w-full justify-between">
              <Input
                placeholder="Search spaces"
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
                <TableHead className="w-auto text-[0.75rem] py-[0.4rem]">
                  S/N
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Space Name
                </TableHead>
                <TableHead className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">
                  Organization name
                </TableHead>
                <TableHead className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">
                  Status
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((space, index) => (
                <TableRow
                  key={space.id}
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
                  <TableCell className="font-medium text-[0.75rem] py-[0.4rem]">
                    {space.id}
                  </TableCell>
                  <TableCell className="text-[0.75rem] py-[0.4rem]">
                    {space.spaceName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">
                    {space.organizationName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        space.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {space.status}
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
                            setSelectedSpace(space)
                            setSpaceDetailsOpen(true)
                          }}
                           className="text-xs"
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                         onClick={() => handleStatusChange(space)}  className="text-xs">
                          {space.status === "Active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(space)}  className="text-xs">
                          Delete
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

      <SpaceFilterDialog
        isOpen={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onFilter={handleFilter}
        onReset={resetFilters}
        organizationNames={organizationNames}
      />

      {selectedSpace && (
        <>
          <SpaceDetailsSheet
            isOpen={spaceDetailsOpen}
            onClose={() => {
              setSpaceDetailsOpen(false)
              setSelectedSpace(null)
            }}
            space={selectedSpace}
          />

          {confirmAction && (
            <ConfirmModal
              isOpen={confirmModalOpen}
              onClose={() => {
                setConfirmModalOpen(false)
                setSelectedSpace(null)
                setConfirmAction(null)
              }}
              onConfirm={confirmAction.action}
              title={confirmAction.title}
              description={confirmAction.description}
            />
          )}
        </>
      )}
    </>
  )
}

