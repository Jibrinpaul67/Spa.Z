'use client'

import React, { useEffect, useState } from "react"
import Image from "next/image"
import inviteImage from "../assets/inviteimage.svg"
import { RotatingLines } from "react-loader-spinner"
import Link from "next/link"

import api from "../utils/api"
import { toast } from "react-toastify"
import { handleError } from "../errorHandling"

export default function InvitePage() {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const tokenValue = queryParams.get("token")
    setToken(tokenValue)
  }, [])

  const handleAccept = async () => {
    if (!token) return
    setIsLoading(true)
    try {
      const response = await api.get(`/auth/accept-invitation`, {
        params: { token }
      })
      if (response?.data?.success && response?.data?.success === true ) {
        toast.success(`${response.data.data.message}`)
        setStatus('accepted')
      } else {
        setError(response.data.message || 'An error occurred')
      }
    } catch (error) {
     handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecline = () => {
    setStatus('declined')
  }

  return (
    <div className="bg-brandwhite min-h-screen overflow-x-hidden flex flex-col gap-3 justify-center items-center w-full max-w-md mx-auto px-4">
      <Image src={inviteImage} alt="invite icon" width={200} height={200} priority />

      <h3 className="text-lg font-bold text-brandblack">Confirm invite...</h3>
      
      {status === 'pending' && (
        <>
          <h6 className="text-center text-sm">You have been invited to join an Organization. Click the accept button below to accept the invite.</h6>
          <div className="flex flex-row gap-2">
            <button 
              onClick={handleDecline}
              className="bg-transparent border border-brandcolortwo text-xs px-4 py-2 text-brandcolortwo rounded-md flex flex-row gap-1"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="bg-brandcolortwo text-xs px-4 py-2 text-brandwhite rounded-md flex flex-row gap-1"
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
                  <span>Processing...</span>
                </>
              ) : (
                <span>Accept</span>
              )}
            </button>
          </div>
        </>
      )}

      {status === 'accepted' && (
        <div className="text-center">
          <p className="mb-4 text-sm">A temporary password has been sent to your email.</p>
          <Link href="/login" className="bg-transparent text-sm px-4 py-3 text-brandpurple rounded-md">
           Proceed to login
          </Link>
        </div>
      )}

      {status === 'declined' && (
        <p className="text-center text-sm">You have declined the invitation link sent to you.</p>
      )}

      {error && <p className="text-red-500 text-center text-sm">{error}</p>}
    </div>
  )
}