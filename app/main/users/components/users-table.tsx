"use client"

import { useState } from "react"
import { ListFilter , MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
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
import { User, FilterValues } from "../types/user"
import { UserFilterDialog } from "./modals/user-filter-dialog"
import { UserDetailsSheet } from "./sheets/user-details-sheet"
import { ConfirmActionModal } from "./modals/confirm-action-modal"

interface UsersTableProps {
  data: User[]
}

export function UsersTable({ data: initialData }: UsersTableProps) {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState("")
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [userDetailsOpen, setUserDetailsOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [confirmAction, setConfirmAction] = useState<{
    title: string
    description: string
    action: () => void
  } | null>(null)
  const [filters, setFilters] = useState<FilterValues>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [organizationNames] = useState(() =>
    Array.from(new Set(data.map((user) => user.organization)))
  )

  const handleFilter = (values: FilterValues) => {
    setFilters(values)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  const handleResetPassword = (user: User) => {
    setSelectedUser(user)
    setConfirmAction({
      title: "Reset Password",
      description: `Are you sure you want to reset ${user.fullname}'s password?`,
      action: () => {
        // Handle password reset logic here
        console.log(`Resetting password for ${user.fullname}`)
        setConfirmModalOpen(false)
        setSelectedUser(null)
      },
    })
    setConfirmModalOpen(true)
  }

  const handleSuspendUser = (user: User) => {
    setSelectedUser(user)
    setConfirmAction({
      title: "Suspend User",
      description: `Are you sure you want to suspend ${user.fullname}?`,
      action: () => {
        setData((prev) =>
          prev.map((u) =>
            u.id === user.id ? { ...u, isActive: false } : u
          )
        )
        setConfirmModalOpen(false)
        setSelectedUser(null)
      },
    })
    setConfirmModalOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setConfirmAction({
      title: "Delete User",
      description: `Are you sure you want to delete ${user.fullname}?`,
      action: () => {
        setData((prev) => prev.filter((u) => u.id !== user.id))
        setConfirmModalOpen(false)
        setSelectedUser(null)
      },
    })
    setConfirmModalOpen(true)
  }

  const filteredData = data.filter((user) => {
    let matches = true

    if (search) {
      matches = matches && Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filters.organization) {
      matches = matches && user.organization === filters.organization
    }

    if (filters.role) {
      matches = matches && user.role === filters.role
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
          <div className="flex items-center gap-4 mb-4 w-full">
            <div className="flex items-center justify-between gap-2 w-full">
              <Input
                placeholder="Search users..."
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
                  Fullname
                </TableHead>
                <TableHead className="hidden md:table-cell  text-[0.75rem] py-[0.4rem]">
                  Email
                </TableHead>
                <TableHead className="hidden md:table-cell  text-[0.75rem] py-[0.4rem]">
                  Phone
                </TableHead>
                <TableHead className="hidden md:table-cell  text-[0.75rem] py-[0.4rem]">
                  Role
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((user, index) => (
                <TableRow
                  key={user.id}
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
                    {user.id}
                  </TableCell>
                  <TableCell className="text-[0.75rem] py-[0.4rem]">
                    {user.fullname}
                  </TableCell>
                  <TableCell className="hidden md:table-cell  text-[0.75rem] py-[0.4rem]">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell  text-[0.75rem] py-[0.4rem]">
                    {user.phone}
                  </TableCell>
                  <TableCell className="hidden md:table-cell  text-[0.75rem] py-[0.4rem]">
                    {user.role}
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
                            setSelectedUser(user)
                            setUserDetailsOpen(true)
                          }}
                           className="text-xs"
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(user)}  className="text-xs">
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSuspendUser(user)}  className="text-xs">
                          Suspend User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteUser(user)}  className="text-xs">
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

      <UserFilterDialog
        isOpen={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onFilter={handleFilter}
        onReset={resetFilters}
        organizationNames={organizationNames}
      />

      {selectedUser && (
        <>
          <UserDetailsSheet
            isOpen={userDetailsOpen}
            onClose={() => {
              setUserDetailsOpen(false)
              setSelectedUser(null)
            }}
            user={selectedUser}
          />

          {confirmAction && (
            <ConfirmActionModal
              isOpen={confirmModalOpen}
              onClose={() => {
                setConfirmModalOpen(false)
                setSelectedUser(null)
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

