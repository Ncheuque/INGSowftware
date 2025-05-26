"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { LoadingScreen } from "@/components/loading-screen"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticación del usuario
    const role = localStorage.getItem("userRole")

    if (!role) {
      toast({
        title: "Acceso denegado",
        description: "Debes iniciar sesión para acceder al dashboard",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setUserRole(role)
    setLoading(false)
  }, [router])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader userRole={userRole as "estudiante" | "docente" | "administrador"} />
      <div className="flex flex-1">
        <DashboardSidebar userRole={userRole as "estudiante" | "docente" | "administrador"} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
