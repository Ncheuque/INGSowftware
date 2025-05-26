"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardSidebarProps {
  userRole?: "estudiante" | "docente" | "administrador"
}

export function DashboardSidebar({ userRole = "estudiante" }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState("Usuario")
  const [userInitials, setUserInitials] = useState("US")

  useEffect(() => {
    // En un sistema real, obtendríamos esta información del usuario autenticado
    if (userRole === "estudiante") {
      setUserName("Mariano Méndez")
      setUserInitials("MM")
    } else if (userRole === "docente") {
      setUserName("Dr. Francisco Cañas")
      setUserInitials("FC")
    } else if (userRole === "administrador") {
      setUserName("Vincent Depassier")
      setUserInitials("VD")
    }
  }, [userRole])

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed left-4 top-4 z-40">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="md:hidden pr-0 sm:max-w-xs">
          <div className="px-4 py-6 flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center animate-pulse">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground">
                    <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                      fill="currentColor"
                    />
                    <circle cx="7" cy="7" r="1.5" fill="currentColor" />
                    <circle cx="17" cy="7" r="1.5" fill="currentColor" />
                    <circle cx="17" cy="17" r="1.5" fill="currentColor" />
                    <circle cx="7" cy="17" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <h2 className="font-bold">3D Lab LMS</h2>
            </Link>
          </div>
          <div className="flex h-[calc(100vh-5rem)] flex-col">
            <div className="border-b border-muted-foreground/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg" alt={userName} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 overflow-auto py-2">
              <DashboardNav userRole={userRole} />
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden md:block md:w-64 border-r min-h-screen">
        <div className="px-4 py-6 flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center animate-pulse">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground">
                  <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                    fill="currentColor"
                  />
                  <circle cx="7" cy="7" r="1.5" fill="currentColor" />
                  <circle cx="17" cy="7" r="1.5" fill="currentColor" />
                  <circle cx="17" cy="17" r="1.5" fill="currentColor" />
                  <circle cx="7" cy="17" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>
            <h2 className="font-bold">3D Lab LMS</h2>
          </Link>
        </div>
        <div className="flex h-[calc(100vh-5rem)] flex-col">
          <div className="border-b border-muted-foreground/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" alt={userName} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-sm font-medium">{userName}</div>
                <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1 overflow-auto py-2">
            <DashboardNav userRole={userRole} />
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
