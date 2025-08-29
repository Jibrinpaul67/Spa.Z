"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';


import logo from "../assets/logo.svg"
import RightSide from './RightSide'

export default function LoginPage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/main/forgot-password');
  };


  return (
  
     

      <div className=" w-full relative min-h-screen grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-0 items-center  bg-[#F9F9F9]">


      <div className="absolute top-4 left-4 z-10">
        <Image
          src={logo}
          alt="Spacer Logo"
          width={90}
          height={24}
          className="h-8 w-auto"
        />
      </div>


        {/* Left Section - Content */}
      <RightSide />

        {/* Right Section - Login Form */}
        <div className="order-1 md:order-2 lg:order-2 w-full col-span-1 md:col-span-4 lg:col-span-5 flex items-center justify-center h-full bg-transparent py-28 md:py-0 px-4 md:px-0">
  <Card className=" w-full md:w-4/5 lg:w-2/5 min-w-[4rem] border border-[#E5E5E5] shadow-sm ">
    <CardHeader>
      <CardTitle className='text-[#24314D]'>Login</CardTitle>
      <CardDescription className='text-[#4F5460]'>
        Please enter your account details
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email" className='text-sm md:text-xs'>Email Address</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            required
            className='bg-[#F3F3F3]'
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password" className='text-sm md:text-xs'>Password</Label>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            required
          />
        </div>
        <Link
          href="/forgot-password"
          className="text-sm md:text-xs text-purple-600 hover:text-purple-700 inline-block"
        >
          Forgot Password?
        </Link>
        <Button onClick={handleLoginClick} className="w-full bg-purple-600 hover:bg-purple-700 font-medium">
          Login
        </Button>
      </form>
    </CardContent>
  </Card>
</div>

      </div>
   
  )
}

