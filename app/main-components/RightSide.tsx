import React from 'react'
import Image from 'next/image'

import dashboarddemo from "../assets/dashboarddemo.svg"

function RightSide() {
  return (
    <div className="order-2 md:order-1 lg:order-1 col-span-2 md:col-span-3 lg:col-span-2 h-full flex flex-col justify-end gap-0 bg-[#FFFFFF] py-10 md:py-0 px-3 md:px-0">
    <div className="space-y-3 px-4">
      <h1 className="text-3xl md:text-2xl font-bold tracking-tight text-[#1B2D56]">
      Manage Space Operations
      </h1>
      <p className="text-muted-foreground text-[0.82rem]">
      Oversee and control all aspects of space management, including availability, scheduling, and operational settings for optimal utilization.
      </p>
    </div>
    <div className="relative w-full max-w-xl bottom-1">
      <Image
        src={dashboarddemo}
        alt="Dashboard Illustration"
        width={460}
        height={300}
        className="w-[90%] h-auto"
        priority
      />
    </div>
  </div>
  )
}

export default RightSide