"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/dashboard/page-header"
import { ExperimentViewer } from "@/components/laboratory/experiment-viewer"
import { ChevronLeft, Download, FileText, Share2 } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

// Datos de ejemplo para los experimentos
const experiments = {
  "exp-001": {
    id: "exp-001",
    name: "Titulación Ácido-Base",
    description: "Determine la concentración de una base mediante titulación con un ácido estandarizado",
    longDescription:
      "Esta práctica de laboratorio permite al estudiante determinar la concentración de una solución básica mediante titulación con un ácido de concentración conocida. Se utilizará un indicador para detectar el punto final de la titulación, momento en el que el número de moles de ácido equivale exactamente al número de moles de base.",
    category: "Química Analítica",
    course: "Química General",
    difficulty: "Intermedio",
    duration: "45 minutos",
    status: "available",
    instructor: "Dr. Francisco Morales",
    objectives: [
      "Aprender a preparar soluciones de concentración conocida",
      "Comprender los principios de la titulación ácido-base",
      "Utilizar correctamente el material de laboratorio para titulaciones",
      "Calcular la concentración de una solución problema",
    ],
  },
  "exp-002": {
    id: "exp-002",
    name: "Reacción de Óxido-Reducción",
    description: "Estudie los procesos de transferencia de electrones en una reacción redox",
    longDescription:
      "En este experimento, se estudiarán las reacciones de óxido-reducción, donde ocurre una transferencia de electrones. Se visualizará cómo los cambios en el estado de oxidación de los reactivos conducen a transformaciones químicas observables, y se analizarán los factores que afectan la espontaneidad de estas reacciones.",
    category: "Química General",
    course: "Química General",
    difficulty: "Intermedio",
    duration: "30 minutos",
    status: "in-progress",
    instructor: "Dra. Carmen Velasco",
    objectives: [
      "Identificar reacciones de óxido-reducción",
      "Balancear ecuaciones redox por el método del ion-electrón",
      "Comprender el concepto de potencial de reducción",
      "Predecir la espontaneidad de una reacción redox",
    ],
  },
  // Más experimentos...
}

export default function ExperimentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [experiment, setExperiment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const experimentId = params.id as string

    // Simulación de carga de datos desde API
    setLoading(true)

    // Simulamos una carga de datos
    setTimeout(() => {
      const foundExperiment = experiments[experimentId as keyof typeof experiments]

      if (foundExperiment) {
        setExperiment(foundExperiment)
      } else {
        toast({
          title: "Experimento no encontrado",
          description: "El experimento solicitado no existe",
          variant: "destructive",
        })
        router.push("/dashboard/experimentos")
      }

      setLoading(false)
    }, 1000)
  }, [params.id, router])

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-primary rounded-full"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!experiment) {
    return null
  }

  const handleExperimentComplete = (results: any) => {
    console.log("Experimento completado:", results)
    // Aquí se enviarían los resultados a la API
  }

  const handleDownloadGuide = () => {
    toast({
      title: "Guía descargada",
      description: "La guía del experimento se ha descargado correctamente",
    })
  }

  const handleShareExperiment = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Enlace copiado",
      description: "El enlace al experimento ha sido copiado al portapapeles",
    })
  }

  return (
    <DashboardShell>
      <PageHeader
        heading={experiment.name}
        text={experiment.description}
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Experimentos 3D", href: "/dashboard/experimentos" },
          { title: experiment.name, href: `/dashboard/experimentos/${experiment.id}` },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadGuide}>
              <Download className="mr-2 h-4 w-4" /> Guía PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareExperiment}>
              <Share2 className="mr-2 h-4 w-4" /> Compartir
            </Button>
            <Link href="/dashboard/experimentos">
              <Button variant="outline" size="sm">
                <ChevronLeft className="mr-2 h-4 w-4" /> Volver
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ExperimentViewer
            experimentId={experiment.id}
            experimentName={experiment.name}
            experimentDescription={experiment.description}
            onComplete={handleExperimentComplete}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del experimento</CardTitle>
              <CardDescription>Detalles sobre este experimento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Categoría</h3>
                <p className="text-sm text-muted-foreground">{experiment.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Curso</h3>
                <p className="text-sm text-muted-foreground">{experiment.course}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Instructor</h3>
                <p className="text-sm text-muted-foreground">{experiment.instructor}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Dificultad</h3>
                <p className="text-sm text-muted-foreground">{experiment.difficulty}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Duración estimada</h3>
                <p className="text-sm text-muted-foreground">{experiment.duration}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Objetivos de aprendizaje</CardTitle>
              <CardDescription>Lo que aprenderás con este experimento</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {experiment.objectives.map((objective: string, index: number) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {objective}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recursos adicionales</CardTitle>
              <CardDescription>Material complementario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={handleDownloadGuide}>
                <FileText className="mr-2 h-4 w-4" /> Guía del experimento
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleDownloadGuide}>
                <FileText className="mr-2 h-4 w-4" /> Plantilla de informe
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleDownloadGuide}>
                <FileText className="mr-2 h-4 w-4" /> Material teórico
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
