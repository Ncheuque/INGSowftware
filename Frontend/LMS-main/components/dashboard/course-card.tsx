"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, MoreHorizontal, FlaskRoundIcon as Flask, Calendar, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"

interface CourseCardProps {
  title: string
  description: string
  image: string
  students: number
  lessons: number
  href: string
  labIntegration?: boolean
  status?: "activo" | "próximo" | "archivado"
}

export function CourseCard({
  title,
  description,
  image,
  students,
  lessons,
  href,
  labIntegration = false,
  status = "activo",
}: CourseCardProps) {
  const [userRole, setUserRole] = useState<"estudiante" | "profesor">("estudiante")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Obtener el rol del usuario del localStorage
    const savedRole = localStorage.getItem("userRole")
    if (savedRole === "profesor" || savedRole === "estudiante") {
      setUserRole(savedRole as "estudiante" | "profesor")
    }
  }, [])

  return (
    <TooltipProvider>
      <Card
        className={`overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isHovered ? "shadow-lg border-primary/50" : "shadow"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-video w-full overflow-hidden relative">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className={`h-full w-full object-cover transition-all duration-500 ${isHovered ? "scale-105" : ""}`}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70"></div>

          {/* Status badge if applicable */}
          {status && (
            <div className="absolute top-2 left-2">
              <Badge
                variant="outline"
                className={`
                  ${status === "activo" ? "bg-green-50 text-green-700 border-green-200" : ""}
                  ${status === "próximo" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                  ${status === "archivado" ? "bg-gray-50 text-gray-700 border-gray-200" : ""}
                `}
              >
                {status === "próximo" && <Calendar className="mr-1 h-3 w-3" />}
                {status === "activo" ? "Activo" : status === "próximo" ? "Próximamente" : "Archivado"}
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <Link href={href} className="font-semibold hover:underline hover:text-primary transition-colors">
              {title}
            </Link>
            {userRole === "profesor" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" /> Editar curso
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" /> Gestionar estudiantes
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BookOpen className="mr-2 h-4 w-4" /> Ver materiales
                  </DropdownMenuItem>
                  {labIntegration && (
                    <DropdownMenuItem>
                      <Flask className="mr-2 h-4 w-4" /> Configurar laboratorios 3D Labs
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar curso
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {students > 0 ? `${students} estudiantes` : "Sin estudiantes"}
              </div>
              <div className="flex items-center">
                <BookOpen className="mr-1 h-4 w-4" />
                {lessons} lecciones
              </div>
            </div>

            <div className="flex items-center gap-2">
              {labIntegration && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Flask className="mr-1 h-3 w-3" /> 3D Labs
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <div className="flex gap-2 w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`${href}/materiales`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Materiales
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ver materiales del curso</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" className="w-full group" asChild>
                  <Link href={href} className="flex items-center justify-center">
                    {userRole === "profesor" ? "Gestionar" : "Acceder"}
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{userRole === "profesor" ? "Gestionar curso" : "Acceder al curso"}</TooltipContent>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}
