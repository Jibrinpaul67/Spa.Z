"use client"

import React, { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, LogOut, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { OffCanvas, OffCanvasContent, OffCanvasHeader, OffCanvasTitle, OffCanvasDescription } from "@/components/ui/off-canvas"
import Notifications from "./notifications"



interface CustomnavbarProps {
  toggled: boolean
  setToggled: (toggled: boolean) => void
  title: string
}

const Customnavbar: React.FC<CustomnavbarProps> = () => {
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)

  useEffect(() => {
    if (isOffCanvasOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOffCanvasOpen]);

  return (
    <nav className="top-0 w-full sticky z-10 bg-white border-b-1 border-[#DADADA]  ">

      <div className="flex items-center justify-between py-2 px-4 md:px-7 w-full">
        
        <div className="flex items-center gap-2">
          <h1 className="text-lg md:text-lg hidden lg:block font-semibold text-[#2C3A50]">
            Hi <span className="font-semibold text-[#4E00DA]">Charles</span>{" "}
            <div className="inline-block -rotate-45">✋🏽</div>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-slate-100 transition-colors"
            onClick={() => setIsOffCanvasOpen(true)}
          >
            <Bell strokeWidth={1.35} size={24} color="#25314D" />
          </Button>

          <OffCanvas className="z-50" open={isOffCanvasOpen} onClose={() => setIsOffCanvasOpen(false)}>
            <OffCanvasHeader className="mt-11 md:mt-0">
              <OffCanvasTitle>Notifications</OffCanvasTitle>
              <OffCanvasDescription>You have  new notifications.</OffCanvasDescription>
            </OffCanvasHeader>
            <OffCanvasContent className="mt-4">
            <Notifications />
            </OffCanvasContent>
           
          </OffCanvas>



          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto" align="end" forceMount>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-1 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    <LogOut className="mr-1 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </motion.div>
              </AnimatePresence>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Customnavbar

