"use client"

import Image from "next/image"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { Space } from "../../types/space"
import { Badge } from "@/components/ui/badge"

interface SpaceDetailsSheetProps {
  isOpen: boolean
  onClose: () => void
  space: Space
}

export function SpaceDetailsSheet({
  isOpen,
  onClose,
  space,
}: SpaceDetailsSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent >
        <SheetHeader className="flex-row justify-between items-center mb-6">
          <SheetTitle>Space Details</SheetTitle>
         
        </SheetHeader>
        <div className="space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={space.image}
              alt={space.spaceName}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{space.spaceName}</h2>
              {space.inUse && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Presently In-use
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-[0.8rem]">{space.description}</p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                Visibility (only users with the following tags)
              </h3>
              <div className="flex flex-wrap gap-2">
                {space.visibilityTags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">{space.busiestDay}</h3>
              <p className="text-sm text-muted-foreground">Most Busiest Day</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

