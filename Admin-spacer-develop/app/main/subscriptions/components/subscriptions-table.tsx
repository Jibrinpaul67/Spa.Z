"use client"

import { useState, useEffect } from "react"
import { ListFilter, MoreHorizontal, ChevronLeft, ChevronRight, MailCheck } from 'lucide-react'
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
import { Subscription, FilterValues } from "../types/subscription"
import { FilterDialog } from "./modals/filter-dialog"
import { MessageModal } from "./modals/message-modal"
import { PlanChangeModal } from "./modals/plan-change-modal"
import { TransactionSheet } from "./sheets/transaction-sheet"

interface SubscriptionsTableProps {
  data: Subscription[]
}

export function SubscriptionsTable({ data: initialData }: SubscriptionsTableProps) {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState("")
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [planChangeModalOpen, setPlanChangeModalOpen] = useState(false)
  const [transactionSheetOpen, setTransactionSheetOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [selectAll, setSelectAll] = useState(false)
  const [filters, setFilters] = useState<FilterValues>({})
  const [currentPage, setCurrentPage] = useState(1) // Added state for pagination
  const [organizationNames, setOrganizationNames] = useState<string[]>([])

  const selectedSubscriptions = data.filter((sub) => sub.selected)

  useEffect(() => {
    setData(prevData => prevData.map(sub => ({ ...sub, selected: selectAll })))
  }, [selectAll])

  useEffect(() => {
    const names = Array.from(new Set(data.map(sub => sub.organizationName)))
    setOrganizationNames(names)
  }, [data])

  const handleCheckboxChange = (id: string) => {
    setData(prevData =>
      prevData.map(sub =>
        sub.id === id ? { ...sub, selected: !sub.selected } : sub
      )
    )
  }

  const handleFilter = (values: FilterValues) => {
    setFilters(values)
    setCurrentPage(1) // Reset to first page when applying filters
  }

  const resetFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  const filteredData = data.filter((sub) => {
    let matches = true

    if (search) {
      matches = matches && Object.values(sub).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filters.organization !== null && filters.organization !== undefined) {
      matches = matches && sub.organizationName === filters.organization
    }

    if (filters.plan !== null && filters.plan !== undefined) {
      matches = matches && sub.planType === filters.plan
    }

    if (filters.status !== null && filters.status !== undefined) {
      matches = matches && sub.status === filters.status
    }

    if (filters.nextBillingDate) {
      matches = matches && sub.nextBillingDate === filters.nextBillingDate
    }

    return matches
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handlePlanChange = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setPlanChangeModalOpen(true)
  }

  const handleMessageAll = () => {
    setSelectedSubscription(null) // Clear single selection when messaging multiple
  setMessageModalOpen(true)
  }

  return (
    <>
      <Card className="w-full shadow-none">
        <CardContent className="py-3 px-3">
          <div className="flex flex-col md:flex-row items-start gap-4 mb-4 w-full ">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
              <Input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full  max-w-sm"
              />
             
            </div>
            <div className="flex flex-row gap-2">
            <Button
                className="bg-[#FAF5FF] px-2 border border-[#5105A9]"
                variant="outline"
                size="icon"
                onClick={() => setFilterDialogOpen(true)}
              >
                
                <ListFilter className="h-4 w-4" />
              </Button>
            {selectedSubscriptions.length > 0 && (
              <Button onClick={handleMessageAll}>
                <MailCheck />
                <span className="hidden md:block"> Message Selected ({selectedSubscriptions.length})</span>
              </Button>
            )}
            </div>
           
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={() => setSelectAll(!selectAll)}
                  />
                </TableHead>
                <TableHead className="hidden md:table-cell  w-auto text-[0.75rem] py-[0.4rem]">
                  S/N
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Organization
                </TableHead>
                <TableHead className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">
                  Plan Type
                </TableHead>
                <TableHead className="hidden md:table-cell  text-[0.75rem] py-[0.4rem]">
                  Start Date
                </TableHead>
               
                <TableHead className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">
                  Next Billing Date
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Status
                </TableHead>
                <TableHead className="text-[0.75rem] py-[0.4rem]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((subscription, index) => ( // Use paginatedData here
                <TableRow
                  key={subscription.id}
                  className={`
                    border-b 
                    border-gray-100
                    ${
                      index % 2 === 0
                        ? "bg-[#FEFBFF] hover:bg-[#FEFBFF]"
                        : "bg-transparent hover:bg-transparent"
                    }
                  `}
                >
                  <TableCell>
                    <Checkbox
                      checked={subscription.selected}
                      onCheckedChange={() => handleCheckboxChange(subscription.id)}
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-[0.75rem] font-medium py-[0.4rem]">
                    {subscription.id}
                  </TableCell>
                  <TableCell className="text-[0.75rem] py-[0.4rem]">
                    {subscription.organizationName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">
                    {subscription.planType}
                  </TableCell>
                  <TableCell className="hidden md:table-cell  text-[0.75rem] py-[0.4rem]">
                    {subscription.startDate}
                  </TableCell>
                
                  <TableCell className="hidden md:table-cell text-[0.75rem] py-[0.4rem]">
                    {subscription.nextBillingDate}
                  </TableCell>
                  <TableCell className="text-[0.75rem] py-[0.4rem]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        subscription.status === "Successful"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-[0.75rem] py-[0.5rem]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedSubscription(subscription)
                            setTransactionSheetOpen(true)
                          }}
                           className="text-xs"
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedSubscription(subscription)
                            setMessageModalOpen(true)
                          }}
                           className="text-xs"
                        >
                          Message
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handlePlanChange(subscription)}
                           className="text-xs"
                        >
                          {subscription.planType === "Free" ? "Upgrade" : "Downgrade"}
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
      
      {totalPages > 1 && (
  <div className="mt-6 flex justify-right float-right">
    <div className="flex items-center space-x-2">
      {/* Previous Button */}
      <button
        className="p-2 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
      >
        {/* Left Arrow */}
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Next Button */}
      <button
        className="p-2 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
      >
        {/* Right Arrow */}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
)}


      <FilterDialog
        isOpen={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onFilter={handleFilter}
        organizationNames={organizationNames}
        onReset={resetFilters}
      />

<MessageModal
            isOpen={messageModalOpen}
            onClose={() => {
              setMessageModalOpen(false)
              setSelectedSubscription(null)
            }}
            organizations={selectedSubscription ? [selectedSubscription] : selectedSubscriptions}
          />

      {selectedSubscription && (
        <>
          

          <PlanChangeModal
            isOpen={planChangeModalOpen}
            onClose={() => {
              setPlanChangeModalOpen(false)
              setSelectedSubscription(null)
            }}
            onConfirm={() => {
              // Handle plan change logic here
              console.log(`${selectedSubscription.planType === "Free" ? "Upgrading" : "Downgrading"} subscription for ${selectedSubscription.organizationName}`)
              setPlanChangeModalOpen(false)
              setSelectedSubscription(null)
            }}
            isUpgrade={selectedSubscription.planType === "Free"}
            organizationName={selectedSubscription.organizationName}
          />

          <TransactionSheet
            isOpen={transactionSheetOpen}
            onClose={() => {
              setTransactionSheetOpen(false)
              setSelectedSubscription(null)
            }}
            subscription={selectedSubscription}
          />
        </>
      )}
    </>
  )
}

