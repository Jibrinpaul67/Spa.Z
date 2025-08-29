"use client"

import { useState } from "react"
import { MoreHorizontal, Plus } from 'lucide-react'
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
import { Admin, AdminFormData } from "../types/admin"
import { AdminFormSheet } from "./sheets/admin-form-sheet"
import { ConfirmActionModal } from "./modals/confirm-action-modal"

interface AdminsTableProps {
  data: Admin[]
}

export function AdminsTable({ data: initialData }: AdminsTableProps) {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState("")
  const [formSheetOpen, setFormSheetOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
  const [confirmAction, setConfirmAction] = useState<{
    title: string
    description: string
    action: () => void
  } | null>(null)

  const handleAddAdmin = (formData: AdminFormData) => {
    const newAdmin: Admin = {
      id: (data.length + 1).toString().padStart(2, "0"),
      ...formData,
      status: "Active"
    }
    setData([...data, newAdmin])
    setFormSheetOpen(false)
  }

  const handleEditAdmin = (formData: AdminFormData) => {
    if (!selectedAdmin) return
    setData(
      data.map((admin) =>
        admin.id === selectedAdmin.id
          ? { ...admin, ...formData }
          : admin
      )
    )
    setFormSheetOpen(false)
    setSelectedAdmin(null)
  }

  const handleStatusChange = (admin: Admin) => {
    const newStatus = admin.status === "Active" ? "Inactive" : "Active"
    const action = admin.status === "Active" ? "deactivate" : "activate"

    setSelectedAdmin(admin)
    setConfirmAction({
      title: `Confirm ${action}`,
      description: `Are you sure you want to ${action} this user?`,
      action: () => {
        setData(
          data.map((a) =>
            a.id === admin.id ? { ...a, status: newStatus } : a
          )
        )
        setConfirmModalOpen(false)
        setSelectedAdmin(null)
      },
    })
    setConfirmModalOpen(true)
  }

  const handleDelete = (admin: Admin) => {
    setSelectedAdmin(admin)
    setConfirmAction({
      title: "Confirm delete",
      description: `Are you sure you want to delete ${admin.fullName}?`,
      action: () => {
        setData(data.filter((a) => a.id !== admin.id))
        setConfirmModalOpen(false)
        setSelectedAdmin(null)
      },
    })
    setConfirmModalOpen(true)
  }

  const filteredData = data.filter((admin) =>
    Object.values(admin).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <>
      <Card className="w-full shadow-none">
        <CardContent className="py-3 px-3">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Input
              placeholder="Search admins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={() => setFormSheetOpen(true)}>
              <Plus className="h-4 w-4 " />
              <span className="hidden md:block">Add Admin</span>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-auto text-[0.75rem] py-[0.4rem]">
                  S/N
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Full Name
                </TableHead>
                <TableHead className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                  Email
                </TableHead>
                <TableHead className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                  Phone
                </TableHead>
                <TableHead className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                  Role
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
              {filteredData.map((admin, index) => (
                <TableRow
                  key={admin.id}
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
                    {admin.id}
                  </TableCell>
                  <TableCell className="text-[0.75rem] py-[0.4rem]">
                    {admin.fullName}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                    {admin.email}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                    {admin.phone}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                    {admin.role}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-[0.75rem] py-[0.4rem]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        admin.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.status}
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
                            setSelectedAdmin(admin)
                            setFormSheetOpen(true)
                          }}
                          className="text-xs"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(admin)}  className="text-xs">
                          {admin.status === "Active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(admin)}  className="text-xs">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AdminFormSheet
        isOpen={formSheetOpen}
        onClose={() => {
          setFormSheetOpen(false)
          setSelectedAdmin(null)
        }}
        onSubmit={selectedAdmin ? handleEditAdmin : handleAddAdmin}
        initialData={selectedAdmin || undefined}
        title={selectedAdmin ? "Edit Admin" : "Add Admin"}
      />

      {confirmAction && (
        <ConfirmActionModal
          isOpen={confirmModalOpen}
          onClose={() => {
            setConfirmModalOpen(false)
            setSelectedAdmin(null)
            setConfirmAction(null)
          }}
          onConfirm={confirmAction.action}
          title={confirmAction.title}
          description={confirmAction.description}
        />
      )}
    </>
  )
}

