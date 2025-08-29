"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'


import { RotatingLines } from 'react-loader-spinner'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import logo from "./assets/logo.svg"
import RightSide from "./main-components/RightSide"
import { showSuccessToastAndNavigate } from './toastUtils';
import api from './utils/api';



export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post('/admin/login', { email, password })
      
      if (response.data.success) {
      

        const token = response?.data?.data?.token; 
    
        
        localStorage.setItem('authToken', token); 
        showSuccessToastAndNavigate(
          router,
          "Login successfully!",
          "/main/dashboard"
        );

      } else {
        toast.error(response.data.message || 'Login failed')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full relative min-h-screen grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-0 items-center bg-[#F9F9F9]">
      

      <div className="absolute top-4 left-4 z-10">
        <Image
          src={logo}
          alt="Spacer Logo"
          width={90}
          height={24}
          className="h-8 w-auto"
        />
      </div>

      <RightSide />

      <div className="order-1 md:order-2 lg:order-2 w-full col-span-1 md:col-span-4 lg:col-span-5 flex items-center justify-center h-full bg-transparent py-28 md:py-0 px-4 md:px-0">
        <Card className="w-full md:w-4/5 lg:w-2/5 min-w-[4rem] border border-[#E5E5E5] shadow-sm">
          <CardHeader>
            <CardTitle className='text-[#24314D]'>Login</CardTitle>
            <CardDescription className='text-[#4F5460]'>
              Please enter your account details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="email" className='text-sm md:text-xs'>Email Address</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                  className='bg-[#F3F3F3]'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1 mb-4">
                <Label htmlFor="password" className='text-sm md:text-xs'>Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link
                href="/forgot-password"
                className="text-sm md:text-xs text-purple-600 hover:text-purple-700 inline-block"
              >
                Forgot Password?
              </Link>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RotatingLines
                      strokeColor="white"
                      visible={true}
                      width="20"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

