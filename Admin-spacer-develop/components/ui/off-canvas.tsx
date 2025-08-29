"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from 'lucide-react'
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const offCanvasVariants = cva(
  "fixed z-50 gap-4 bg-background p-4  shadow-lg transition-transform duration-300 ease-in-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-full md:w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-full md:w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface OffCanvasProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof offCanvasVariants> {
  open?: boolean
  onClose: () => void
}

export function OffCanvas({
  side = "right",
  open,
  onClose,
  className,
  children,
  ...props
}: OffCanvasProps) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (open) {
      setIsClosing(false)
    }
  }, [open])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300) // Match this with the transition duration
  }

  if (!open && !isClosing) return null

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300  ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />
      <div
        className={cn(
          offCanvasVariants({ side }),
           isClosing
          ? side === "right"
            ? "translate-x-full"
            : side === "left"
            ? "-translate-x-full"
            : side === "top"
            ? "-translate-y-full"
            : "translate-y-full"
          : "translate-0",
        
          "z-50",
          className
        )}
        {...props}
      >
        {children}
        
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  )
}

export function OffCanvasContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col overflow-y-auto", className)} {...props} />
  )
}

export function OffCanvasHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-left",
        className
      )}
      {...props}
    />
  )
}

export function OffCanvasFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}

export function OffCanvasTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold text-foreground",
        className
      )}
      {...props}
    />
  )
}

export function OffCanvasDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

