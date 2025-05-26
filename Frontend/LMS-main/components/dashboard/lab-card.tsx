"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Users, ChevronRight, BarChart, FlaskConical, FileText, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { useState, useEffect } from "react"

interface LabCardProps {
  lab: {
    id: string
    title: string
    description: string
    image: string
    courseId: string
    courseTitle?: string
    type: "virtual" | "simulation" | "interactive" | "assessment"
    duration: number // en minutos
    complexity: "beginner" | "intermediate" | "advanced"
    lastAccessed?: string
    dueDate?: string
    status?: "not-started" | "in-progress" | "completed" | "overdue"
    participants?: number
    reports?: number
  }
  showCourse?: boolean
}

export function LabCard({ lab, showCourse = false }: LabCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  const statusColors = {
    "not-started": "bg-blue-500/10 text-blue-500",
    "in-progress": "bg-yellow-500/10 text-yellow-500",
    completed: "bg-green-500/10 text-green-500",
    overdue: "bg-red-500/10 text-red-500",
  }

  const typeIcons = {
    virtual: <FlaskConical className="h-4 w-4" />,
    simulation: <BarChart className="h-4 w-4" />,
    interactive: <Users className="h-4 w-4" />,
    assessment: <FileText className="h-4 w-4" />,
  }

  // Formatear última fecha de acceso
  const formattedLastAccess = lab.lastAccessed
    ? formatDistanceToNow(new Date(lab.lastAccessed), { addSuffix: true, locale: es })
    : null

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} hover:shadow-lg hover:border-primary/50 hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Indicador de tipo */}
      <div className="absolute top-3 left-3 z-10">
        <Badge variant="outline" className="flex items-center gap-1 bg-background/80 backdrop-blur-sm">
          {typeIcons[lab.type]}
          <span>
            {lab.type === "virtual"
              ? "Laboratorio Virtual"
              : lab.type === "simulation"
                ? "Simulación"
                : lab.type === "interactive"
                  ? "Interactivo"
                  : "Evaluación"}
          </span>
        </Badge>
      </div>

      {/* Indicador de estado */}
      {lab.status && (
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[lab.status]}`}>
            {lab.status === "not-started"
              ? "No iniciado"
              : lab.status === "in-progress"
                ? "En progreso"
                : lab.status === "completed"
                  ? "Completado"
                  : "Vencido"}
          </span>
        </div>
      )}

      <div className="relative h-40 w-full overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          style={{
            backgroundImage: `url(${lab.image})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Complejidad */}
        <div className="absolute bottom-3 left-3 flex items-center">
          <Badge
            variant="outline"
            className={`
            ${
              lab.complexity === "beginner"
                ? "bg-green-500/20 text-green-500"
                : lab.complexity === "intermediate"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-red-500/20 text-red-500"
            } 
            border-none`}
          >
            {lab.complexity === "beginner"
              ? "Principiante"
              : lab.complexity === "intermediate"
                ? "Intermedio"
                : "Avanzado"}
          </Badge>
        </div>

        {/* Duración */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 text-white text-xs font-medium bg-black/40 rounded-full px-2.5 py-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{lab.duration} min</span>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{lab.title}</h3>
          {showCourse && lab.courseTitle && (
            <Link href={`/dashboard/cursos/${lab.courseId}`} className="text-xs text-primary hover:underline">
              {lab.courseTitle}
            </Link>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{lab.description}</p>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {lab.lastAccessed && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{formattedLastAccess}</span>
            </div>
          )}

          {lab.participants !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{lab.participants} participantes</span>
            </div>
          )}

          {lab.reports !== undefined && (
            <div className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              <span>{lab.reports} informes</span>
            </div>
          )}

          {lab.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Hasta: {new Date(lab.dueDate).toLocaleDateString("es-ES")}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-0 mt-auto">
        <Link href={`/dashboard/cursos/${lab.courseId}/laboratorios/${lab.id}`}>
          <Button
            variant="ghost"
            className="w-full justify-between hover:bg-primary hover:text-primary-foreground group"
          >
            <span>Entrar al laboratorio</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Efecto de brillo en hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full ${isHovered ? "animate-shine" : ""}`}
        style={{
          animationDuration: "1.5s",
          animationTimingFunction: "ease",
          animationIterationCount: "1",
        }}
      ></div>
    </div>
  )
}
