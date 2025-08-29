"use client"

import { useState, useEffect } from "react"

import { MailCheck, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
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
import { Checkbox } from "@/components/ui/checkbox"
import { Organization } from "../types/organization"
import { MessageModal } from "./modals/message-modal"
import { ConfirmModal } from "./modals/confirm-modal"
import { OrganizationDashboardSheet } from "./sheets/organization-dashboard-sheet"

interface OrganizationsTableProps {
  data: Organization[]
}

export function OrganizationsTable({ data: initialData }: OrganizationsTableProps) {

  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)
  const [confirmAction, setConfirmAction] = useState<{
    title: string
    description: string
    action: () => void
  } | null>(null)
  const [selectAll, setSelectAll] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)

  const itemsPerPage = 10
  const filteredData = data.filter((org) =>
    Object.values(org).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)
  const selectedOrganizations = data.filter((org) => org.selected)

  useEffect(() => {
    setData(prevData => prevData.map(org => ({ ...org, selected: selectAll })))
  }, [selectAll])

  const handleCheckboxChange = (id: string) => {
    setData(prevData =>
      prevData.map(org =>
        org.id === id ? { ...org, selected: !org.selected } : org
      )
    )
  }

  const handleStatusChange = (org: Organization) => {
    const newStatus = org.status === "active" ? "inactive" : "active"
    setSelectedOrg(org)
    setConfirmAction({
      title: `${org.status === "active" ? "Deactivate" : "Activate"} Organization`,
      description: `Are you sure you want to ${org.status === "active" ? "deactivate" : "activate"} ${org.organizationName}?`,
      action: () => {
        setData((prev) =>
          prev.map((item) =>
            item.id === org.id ? { ...item, status: newStatus } : item
          )
        )
        setConfirmModalOpen(false)
      },
    })
    setConfirmModalOpen(true)
  }

  const handleDelete = (org: Organization) => {
    setSelectedOrg(org)
    setConfirmAction({
      title: "Delete Organization",
      description: `Are you sure you want to delete ${org.organizationName}?`,
      action: () => {
        setData((prev) => prev.filter((item) => item.id !== org.id))
        setConfirmModalOpen(false)
      },
    })
    setConfirmModalOpen(true)
  }

  const handleMessageSelected = () => {
    setSelectedOrg(null)
    setMessageModalOpen(true)
  }

  const handleSingleMessage = (org: Organization) => {
    setSelectedOrg(org)
    setMessageModalOpen(true)
  }

  return (
    <>
      <Card className="w-full shadow-none">
        <CardContent className="px-3 py-3">
          <div className="flex items-center gap-4 w-full justify-between">
            <Input
              placeholder="Search organizations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-xs"
            />
            {selectedOrganizations.length > 0 && (
              <Button onClick={handleMessageSelected}>
                <MailCheck className="mr-2 h-4 w-4" />
                <span className="hidden md:block">Message Selected</span> ({selectedOrganizations.length})
              </Button>
            )}
          </div>

          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={() => setSelectAll(!selectAll)}
                    />
                  </TableHead>
                  <TableHead className="hidden md:table-cell w-auto text-[0.75rem] py-[0.4rem]">S/N</TableHead>
                  <TableHead className="text-[0.75rem] py-[0.4rem]">Organization</TableHead>
                  <TableHead className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">Full Name</TableHead>
                  <TableHead className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">Email</TableHead>
                  <TableHead className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">Phone</TableHead>
                  <TableHead className="text-[0.75rem] py-[0.4rem]">Status</TableHead>
                  <TableHead className="text-[0.75rem] py-[0.4rem]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((org, index) => (
                  <TableRow
                    key={org.id}
                    className={`
                      border-b 
                      border-gray-100
                      ${index % 2 === 0 ? "bg-[#FEFBFF]" : "bg-transparent"}
                    `}
                  >
                    <TableCell>
                      <Checkbox
                        checked={org.selected}
                        onCheckedChange={() => handleCheckboxChange(org.id)}
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-[0.75rem] font-medium py-[0.4rem]">
                      {org.id}
                    </TableCell>
                    <TableCell className="text-[0.75rem] py-[0.4rem]">{org.organizationName}</TableCell>
                    <TableCell className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">{org.fullName}</TableCell>
                    <TableCell className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">{org.email}</TableCell>
                    <TableCell className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">{org.phone}</TableCell>
                    <TableCell className="text-[0.75rem] py-[0.4rem]">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          org.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {org.status}
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
                              setSelectedOrganization(org)
                              setDashboardOpen(true)
                            }}
                          >
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSingleMessage(org)}
                            className="text-xs"
                          >
                            Message
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(org)}
                            className="text-xs"
                          >
                            {org.status === "active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(org)}
                            className="text-red-600 text-xs"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          
        </CardContent>
      </Card>
      {totalPages > 1 && (
            <div className="mt-6 flex justify-end">
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

      <MessageModal
        isOpen={messageModalOpen}
        onClose={() => {
          setMessageModalOpen(false)
          setSelectedOrg(null)
        }}
        organizations={selectedOrg ? [selectedOrg] : selectedOrganizations}
      />

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false)
          setSelectedOrg(null)
        }}
        onConfirm={() => confirmAction?.action()}
        title={confirmAction?.title || ""}
        description={confirmAction?.description || ""}
      />

      {selectedOrganization && (
        <OrganizationDashboardSheet
          isOpen={dashboardOpen}
          onClose={() => {
            setDashboardOpen(false)
            setSelectedOrganization(null)
          }}
          organizationName={selectedOrganization.organizationName}
        />
      )}
    </>
  )
}