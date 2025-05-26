"use client"

import { PageHeader } from "@/components/dashboard/page-header"
import { LabCard } from "@/components/dashboard/lab-card"
import { Button } from "@/components/ui/button"
import { Search } from "@/components/ui/search"
import { Plus, Filter } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function LabsPage() {
  const [statusFilter, setStatusFilter] = useState("todos")

  // En un entorno real, estos datos vendrían de una API o base de datos
  const labs = [
    {
      id: "1",
      title: "Reacciones Químicas Básicas",
      description: "Observa y analiza diferentes tipos de reacciones químicas",
      image: "/placeholder.svg?height=180&width=320",
      dueDate: "15 Mayo, 2023",
      progress: 0,
      status: "disponible",
    },
    {
      id: "2",
      title: "Disección Virtual de Rana",
      description: "Aprende anatomía a través de una disección virtual",
      image: "/placeholder.svg?height=180&width=320",
      dueDate: "22 Mayo, 2023",
      progress: 65,
      status: "en-progreso",
    },
    {
      id: "3",
      title: "Circuitos Eléctricos",
      description: "Construye y analiza circuitos eléctricos básicos",
      image: "/placeholder.svg?height=180&width=320",
      dueDate: "10 Mayo, 2023",
      progress: 100,
      status: "completado",
      score: 92,
    },
    {
      id: "4",
      title: "Microscopía Celular",
      description: "Observa diferentes tipos de células bajo el microscopio",
      image: "/placeholder.svg?height=180&width=320",
      dueDate: "30 Mayo, 2023",
      progress: 0,
      status: "disponible",
    },
  ]

  // Filtrar laboratorios según el estado seleccionado
  const filteredLabs = statusFilter === "todos" ? labs : labs.filter((lab) => lab.status === statusFilter)

  // Verificar el rol del usuario (en un entorno real, esto vendría de una sesión autenticada)
  const userRole = typeof window !== "undefined" ? localStorage.getItem("userRole") || "estudiante" : "estudiante"

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        heading="Laboratorios Virtuales"
        text={
          userRole === "profesor"
            ? "Crea y gestiona laboratorios virtuales para tus estudiantes"
            : "Explora y realiza prácticas de laboratorio virtuales"
        }
        breadcrumbs={[{ title: "Laboratorios", href: "/dashboard/laboratorios" }]}
        actions={
          userRole === "profesor" ? (
            <Button asChild>
              <Link href="/dashboard/laboratorios/nuevo">
                <Plus className="mr-2 h-4 w-4" /> Nuevo Laboratorio
              </Link>
            </Button>
          ) : null
        }
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
          <Search
            className="w-full sm:max-w-sm"
            placeholder="Buscar laboratorios..."
            onSearch={(value) => console.log("Buscando:", value)}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                <DropdownMenuRadioItem value="todos">Todos</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="disponible">Disponibles</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="en-progreso">En progreso</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completado">Completados</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {filteredLabs.map((lab) => (
          <LabCard
            key={lab.id}
            title={lab.title}
            description={lab.description}
            image={lab.image}
            dueDate={lab.dueDate}
            progress={lab.progress}
            status={lab.status as "disponible" | "en-progreso" | "completado"}
            score={lab.score}
            href={`/dashboard/laboratorios/${lab.id}`}
          />
        ))}
      </div>
    </div>
  )
}
