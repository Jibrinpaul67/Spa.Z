"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Subscription } from "../../types/subscription"

interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  organizations: Subscription[]
}

export function MessageModal({ isOpen, onClose, organizations }: MessageModalProps) {
  const [header, setHeader] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    try {
      // Here you would implement the logic to send emails
      // This is a placeholder implementation
      for (const org of organizations) {
        console.log(`Sending email to ${org.organizationName} `, {
          subject: header,
          message: message
        })
        // In a real implementation, you would use an email service or API here
        // For example:
        // await fetch('/api/send-email', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     to: org.email,
        //     subject: header,
        //     body: message,
        //   }),
        // })
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setHeader("")
      setMessage("")
      onClose()
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {organizations.length === 1
              ? `Message to ${organizations[0].organizationName}`
              : `Message to ${organizations.length} Organizations`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="header">Subject</Label>
            <Input
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              placeholder="Enter message subject"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="min-h-[100px]"
              required
            />
          </div>
         
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

