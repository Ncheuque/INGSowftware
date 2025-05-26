"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/page-header"
import { Search, FlaskConical, Clock, BarChart, BookOpen, Play } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para los experimentos
const experiments = [
  {
    id: "exp-001",
    name: "Titulación Ácido-Base",
    description: "Determine la concentración de una base mediante titulación con un ácido estandarizado",
    category: "Química Analítica",
    course: "Química General",
    difficulty: "Intermedio",
    duration: "45 minutos",
    status: "available", // available, in-progress, completed
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "exp-002",
    name: "Reacción de Óxido-Reducción",
    description: "Estudie los procesos de transferencia de electrones en una reacción redox",
    category: "Química General",
    course: "Química General",
    difficulty: "Intermedio",
    duration: "30 minutos",
    status: "in-progress",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "exp-003",
    name: "Análisis Espectrofotométrico",
    description: "Determine la concentración de una solución mediante espectrofotometría",
    category: "Química Analítica",
    course: "Análisis Instrumental",
    difficulty: "Avanzado",
    duration: "60 minutos",
    status: "completed",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "exp-004",
    name: "Equilibrio Químico",
    description: "Estudio del principio de Le Chatelier y los factores que afectan el equilibrio",
    category: "Fisicoquímica",
    course: "Química Física",
    difficulty: "Intermedio",
    duration: "50 minutos",
    status: "available",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "exp-005",
    name: "Síntesis Orgánica",
    description: "Realice la síntesis de un compuesto orgánico mediante condensación aldólica",
    category: "Química Orgánica",
    course: "Química Orgánica",
    difficulty: "Avanzado",
    duration: "75 minutos",
    status: "available",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "exp-006",
    name: "Calorimetría",
    description: "Medición del calor de reacción mediante un calorímetro",
    category: "Termodinámica",
    course: "Química Física",
    difficulty: "Intermedio",
    duration: "45 minutos",
    status: "available",
    image: "/placeholder.svg?height=120&width=240",
  },
]

export default function ExperimentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filtrar experimentos según la búsqueda y la pestaña activa
  const filteredExperiments = experiments.filter((exp) => {
    const matchesSearch =
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "in-progress") return matchesSearch && exp.status === "in-progress"
    if (activeTab === "completed") return matchesSearch && exp.status === "completed"

    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Disponible
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            En progreso
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  return (
    <DashboardShell>
      <PageHeader
        heading="Experimentos 3D"
        text="Accede a experimentos virtuales interactivos integrados con 3D Lab"
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Experimentos 3D", href: "/dashboard/experimentos" },
        ]}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar experimentos..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </PageHeader>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="in-progress">En progreso</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperiments.length > 0 ? (
              filteredExperiments.map((experiment) => <ExperimentCard key={experiment.id} experiment={experiment} />)
            ) : (
              <div className="col-span-full flex justify-center py-10">
                <div className="text-center">
                  <FlaskConical className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No se encontraron experimentos</h3>
                  <p className="text-sm text-muted-foreground">No hay experimentos que coincidan con tu búsqueda.</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperiments.length > 0 ? (
              filteredExperiments.map((experiment) => <ExperimentCard key={experiment.id} experiment={experiment} />)
            ) : (
              <div className="col-span-full flex justify-center py-10">
                <div className="text-center">
                  <FlaskConical className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No hay experimentos en progreso</h3>
                  <p className="text-sm text-muted-foreground">No has iniciado ningún experimento todavía.</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperiments.length > 0 ? (
              filteredExperiments.map((experiment) => <ExperimentCard key={experiment.id} experiment={experiment} />)
            ) : (
              <div className="col-span-full flex justify-center py-10">
                <div className="text-center">
                  <FlaskConical className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No hay experimentos completados</h3>
                  <p className="text-sm text-muted-foreground">No has completado ningún experimento todavía.</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

interface ExperimentCardProps {
  experiment: {
    id: string
    name: string
    description: string
    category: string
    course: string
    difficulty: string
    duration: string
    status: string
    image: string
  }
}

function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full bg-muted">
        <img
          src={experiment.image || "/placeholder.svg"}
          alt={experiment.name}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{experiment.name}</CardTitle>
            <CardDescription>{experiment.course}</CardDescription>
          </div>
          {getStatusBadge(experiment.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{experiment.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="secondary" className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {experiment.category}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {experiment.duration}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <BarChart className="h-3 w-3" />
            {experiment.difficulty}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/experimentos/${experiment.id}`} className="w-full">
          <Button className="w-full" variant={experiment.status === "in-progress" ? "default" : "outline"}>
            <Play className="mr-2 h-4 w-4" />
            {experiment.status === "completed"
              ? "Ver resultados"
              : experiment.status === "in-progress"
                ? "Continuar"
                : "Iniciar experimento"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "available":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Disponible
        </Badge>
      )
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          En progreso
        </Badge>
      )
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Completado
        </Badge>
      )
    default:
      return <Badge variant="outline">Desconocido</Badge>
  }
}
