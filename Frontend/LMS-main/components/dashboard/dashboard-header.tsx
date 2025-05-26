"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { MoonStar, Sun, Settings, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardNav } from "./dashboard-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Atom } from "lucide-react"

export function DashboardHeader() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [userRole, setUserRole] = useState<"estudiante" | "profesor" | "admin">("estudiante")

  // Datos de usuario simulados basados en el rol
  const getUserData = (role: string) => {
    return {
      nombre: role === "estudiante" ? "Ana García" : role === "profesor" ? "Dr. Juan Rodríguez" : "Admin Sistema",
      avatar: "/placeholder.svg?height=36&width=36",
      departamento:
        role === "estudiante" ? "Química General" : role === "profesor" ? "Departamento de Química" : "Administración",
    }
  }

  useEffect(() => {
    setMounted(true)
    // Obtener el rol del usuario del localStorage
    const savedRole = localStorage.getItem("userRole")
    if (savedRole === "profesor" || savedRole === "estudiante" || savedRole === "admin") {
      setUserRole(savedRole as "estudiante" | "profesor" | "admin")
    }

    // Obtener el tema del localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
  }, [])

  const userData = getUserData(userRole)

  // Cambiar el tema
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  const handleLogout = () => {
    // Limpiar localStorage y redirigir al login
    localStorage.removeItem("userRole")
    window.location.href = "/login"
  }

  if (!mounted) return null

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
          {/* Menú móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-full flex-col">
                <div className="flex h-14 items-center border-b px-4">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Atom className="h-6 w-6 text-primary" />
                    <span className="text-primary">3DLAB LMS</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                  <DashboardNav userRole={userRole} />
                </div>
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Link href="/dashboard/perfil">
                      <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity border border-primary/20">
                        <AvatarImage src={userData.avatar || "/placeholder.svg"} alt="Avatar" />
                        <AvatarFallback>
                          {userData.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{userData.nombre}</span>
                      <span className="text-xs text-muted-foreground">{userData.departamento}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo para escritorio */}
          <Link href="/" className="flex items-center gap-2 font-semibold group">
            <Atom className="h-6 w-6 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300" />
            <span className="text-primary group-hover:text-primary/80 transition-colors">3DLAB LMS</span>
          </Link>

          {/* Se mantiene solo esta barra de búsqueda en el header principal */}
          <div className="hidden md:flex">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar cursos, laboratorios..."
                className="h-9 w-[200px] lg:w-[300px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"
              />
              <span className="absolute left-2.5 top-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Controles de la derecha */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            {/* Toggle de tema */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-400 transition-all hover:rotate-45 duration-300" />
                  ) : (
                    <MoonStar className="h-5 w-5 transition-all hover:rotate-12 duration-300" />
                  )}
                  <span className="sr-only">Cambiar tema</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Cambiar a modo {theme === "dark" ? "claro" : "oscuro"}</TooltipContent>
            </Tooltip>

            {/* Centro de notificaciones */}
            <NotificationCenter
              initialNotifications={[
                {
                  id: "1",
                  title: "Nueva tarea asignada",
                  description: "Se ha asignado una nueva tarea en el curso de Química Orgánica",
                  time: "Hace 5 min",
                  read: false,
                  type: "info",
                  actionUrl: "/dashboard/cursos/1",
                },
                {
                  id: "2",
                  title: "Laboratorio disponible",
                  description: "El laboratorio de Reacciones Químicas ya está disponible para realizar",
                  time: "Hace 2 horas",
                  read: false,
                  type: "lab",
                  actionUrl: "/dashboard/laboratorios/1",
                },
              ]}
            />

            {/* Configuración (solo para profesores y admin) */}
            {(userRole === "profesor" || userRole === "admin") && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="group">
                    <Link href="/dashboard/configuracion">
                      <Settings className="h-5 w-5 transition-all group-hover:rotate-45 duration-300" />
                      <span className="sr-only">Configuración</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Configuración del sistema</TooltipContent>
              </Tooltip>
            )}

            {/* Avatar y menú de usuario */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard/perfil">
                  <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity border border-primary/20 ring-offset-background transition-all hover:ring-2 hover:ring-primary hover:ring-offset-2">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt="Avatar" />
                    <AvatarFallback>
                      {userData.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Ver perfil</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
