"use client"

import { useState } from "react"
import { Plus, Pencil } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Role, RoleFormData } from "../../types/role"
import { permissions } from "../../data/permissions"
import { roles as initialRoles } from "../../data/roles"
import { RoleFormSheet } from "../sheets/role-form-sheet"

export function RolesTab() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [formSheetOpen, setFormSheetOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const handleCreateRole = (formData: RoleFormData) => {
    const newRole: Role = {
      id: formData.title.toLowerCase().replace(/\s+/g, '-'),
      ...formData
    }
    setRoles([...roles, newRole])
    setFormSheetOpen(false)
  }

  const handleEditRole = (formData: RoleFormData) => {
    if (!selectedRole) return
    setRoles(
      roles.map((role) =>
        role.id === selectedRole.id
          ? { ...role, ...formData }
          : role
      )
    )
    setFormSheetOpen(false)
    setSelectedRole(null)
  }

  const getPermissionsByRole = (rolePermissions: string[]) => {
    return permissions.filter(permission => 
      rolePermissions.includes(permission.id)
    )
  }

  return (
    <div className="grid gap-4 md:gap-0 grid-cols-1 md:grid-cols-5 pt-3">
      <div className="col-span-2">
        <p className="text-muted-foreground text-[0.8rem] leading-6">
        Define and assign custom roles with specific permissions to manage access and responsibilities across the platform.
        </p>
        <Button onClick={() => setFormSheetOpen(true)} className="mt-5">
          <Plus className="h-4 w-4 " />
          Create Role
        </Button>
      </div>

      <div className="col-span-3 grid gap-4">
        {roles.map((role) => (
          <Card key={role.id} >
            <CardContent className="pt-2">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[0.93rem] font-semibold text-purple-600">
                    {role.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedRole(role)
                      setFormSheetOpen(true)
                    }}
                   
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </div>
                <ul className="space-y-2">
                  {getPermissionsByRole(role.permissions).map((permission) => (
                    <li className="text-[0.87rem] list-disc ml-4 " key={permission.id}>
                      {permission.name}
                      {permission.description && (
                        <span className="text-muted-foreground text-[0.87rem]">
                          {" "}
                          in the {permission.description}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <RoleFormSheet
        isOpen={formSheetOpen}
        onClose={() => {
          setFormSheetOpen(false)
          setSelectedRole(null)
        }}
        onSubmit={selectedRole ? handleEditRole : handleCreateRole}
        initialData={selectedRole || undefined}
        title={selectedRole ? "Edit Role" : "Create New Role"}
      />
    </div>
  )
}

