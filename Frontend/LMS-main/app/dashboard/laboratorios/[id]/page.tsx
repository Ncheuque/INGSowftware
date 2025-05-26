"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  BookOpen,
  FileText,
  FlaskConical,
  Save,
  SendHorizonal,
  Info,
  RotateCcw,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { ChemistrySimulation } from "@/components/laboratory/chemistry-simulation"

// Simulamos datos para la demostración
const laboratorios = {
  "1": {
    id: "1",
    title: "Titulación Ácido-Base",
    description: "Determina la concentración de una solución mediante una titulación con indicador",
    status: "disponible",
    progress: 0,
    dueDate: "25 Nov, 2023",
    objectives: [
      "Realizar una titulación ácido-base con fenolftaleína como indicador",
      "Determinar la concentración de una solución de NaOH",
      "Aplicar los conceptos de pH y estequiometría en cálculos prácticos",
      "Interpretar el significado del punto de equivalencia",
    ],
    materials: [
      "Bureta de 50 mL",
      "Soporte universal con pinza",
      "Erlenmeyer de 250 mL",
      "Pipeta volumétrica de 25 mL",
      "Solución de HCl 0.1 M",
      "Solución de NaOH de concentración desconocida",
      "Indicador de fenolftaleína",
    ],
    instructions: [
      "Monta el equipo de titulación colocando la bureta en el soporte",
      "Llena la bureta con la solución de NaOH, evitando burbujas de aire",
      "Con la pipeta, mide 25 mL de HCl 0.1 M y transfiérelos al erlenmeyer",
      "Añade 2-3 gotas de indicador fenolftaleína al erlenmeyer",
      "Titula lentamente, agitando el erlenmeyer, hasta que la solución vire a rosa pálido",
      "Anota el volumen gastado de NaOH y repite la titulación dos veces más",
      "Calcula la concentración molar de NaOH utilizando la fórmula: [NaOH] = [HCl] × V(HCl) ÷ V(NaOH)",
    ],
    resultados: [],
  },
}

export default function LaboratorioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [labData, setLabData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [simulationCompleted, setSimulationCompleted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [labResults, setLabResults] = useState<any>({
    volumeNaOH: 0,
    phFinal: 0,
    concentration: 0,
    observations: "",
  })

  useEffect(() => {
    // Simulamos la carga de datos desde una API
    setTimeout(() => {
      const lab = laboratorios[id as keyof typeof laboratorios]
      if (lab) {
        setLabData(lab)
      } else {
        // Redireccionar si no existe el laboratorio
        router.push("/dashboard/laboratorios")
      }
      setLoading(false)
    }, 500)
  }, [id, router])

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress)
    // En un entorno real, aquí guardaríamos el progreso en una base de datos
  }

  const handleSimulationComplete = () => {
    setSimulationCompleted(true)
    setProgress(100)
    toast({
      title: "Simulación completada",
      description: "Has completado la simulación correctamente. Ahora puedes registrar tus resultados.",
    })
  }

  const handleResultChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLabResults((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveResults = () => {
    toast({
      title: "Resultados guardados",
      description: "Tus resultados han sido guardados correctamente.",
    })
  }

  const handleSubmitResults = () => {
    toast({
      title: "Resultados enviados",
      description: "Tus resultados han sido enviados para evaluación.",
    })
    // En un entorno real, aquí enviaríamos los resultados a una API
    setTimeout(() => {
      router.push("/dashboard/laboratorios")
    }, 1500)
  }

  const handleRestartSimulation = () => {
    setSimulationCompleted(false)
    setProgress(0)
    setCurrentStep(0)
    setLabResults({
      volumeNaOH: 0,
      phFinal: 0,
      concentration: 0,
      observations: "",
    })
  }

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Cargando..." text="Obteniendo información del laboratorio" />
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={labData.title} text={labData.description}>
        <Link href="/dashboard/laboratorios">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <FlaskConical className="mr-1 h-4 w-4" /> Laboratorio Virtual
            </Badge>
            <span className="text-sm text-muted-foreground">Fecha límite: {labData.dueDate}</span>
          </div>

          <div className="flex items-center gap-4">
            {progress > 0 && progress < 100 && (
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-2 w-20" />
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
            )}

            {simulationCompleted && (
              <Badge variant="default" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="mr-1 h-4 w-4" /> Simulación Completada
              </Badge>
            )}
          </div>
        </div>

        <Tabs defaultValue="simulation">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="instructions">
              <BookOpen className="mr-2 h-4 w-4" /> Instrucciones
            </TabsTrigger>
            <TabsTrigger value="simulation">
              <FlaskConical className="mr-2 h-4 w-4" /> Simulación
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!simulationCompleted}>
              <FileText className="mr-2 h-4 w-4" /> Resultados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="instructions" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Instrucciones</CardTitle>
                  <CardDescription>Sigue estos pasos para realizar el experimento</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-3">
                    {labData.instructions.map((instruction: string, index: number) => (
                      <li key={index} className="text-sm">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Info className="h-4 w-4 mr-1" /> Asegúrate de leer todas las instrucciones antes de comenzar.
                  </div>
                </CardFooter>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Objetivos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {labData.objectives.map((objective: string, index: number) => (
                        <li key={index} className="text-sm">
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Materiales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {labData.materials.map((material: string, index: number) => (
                        <li key={index} className="text-sm">
                          {material}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="simulation" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Simulación de Titulación Ácido-Base</CardTitle>
                <CardDescription>Interactúa con el laboratorio virtual para realizar la titulación</CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="aspect-video w-full h-[500px] bg-muted rounded-md overflow-hidden">
                  <ChemistrySimulation
                    onProgress={handleProgressUpdate}
                    onComplete={handleSimulationComplete}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mr-1" />
                  Sigue los pasos indicados en la simulación.
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleRestartSimulation} disabled={progress === 0}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar
                  </Button>
                  {simulationCompleted && (
                    <Button onClick={() => document.querySelector('[data-value="results"]')?.click()}>
                      <FileText className="mr-2 h-4 w-4" /> Registrar resultados
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Resultados de la Titulación</CardTitle>
                <CardDescription>Registra los resultados obtenidos en la simulación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Volumen de NaOH gastado (mL)</label>
                      <input
                        type="number"
                        name="volumeNaOH"
                        value={labResults.volumeNaOH}
                        onChange={handleResultChange}
                        className="w-full p-2 rounded-md border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">pH en el punto de equivalencia</label>
                      <input
                        type="number"
                        name="phFinal"
                        value={labResults.phFinal}
                        onChange={handleResultChange}
                        className="w-full p-2 rounded-md border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Concentración calculada de NaOH (M)</label>
                      <input
                        type="number"
                        name="concentration"
                        value={labResults.concentration}
                        onChange={handleResultChange}
                        className="w-full p-2 rounded-md border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Observaciones y conclusiones</label>
                    <textarea
                      name="observations"
                      value={labResults.observations}
                      onChange={handleResultChange}
                      className="w-full h-[180px] p-2 rounded-md border"
                      placeholder="Detalla tus observaciones durante el experimento y las conclusiones a las que has llegado..."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleSaveResults}>
                  <Save className="mr-2 h-4 w-4" /> Guardar borrador
                </Button>
                <Button onClick={handleSubmitResults}>
                  <SendHorizonal className="mr-2 h-4 w-4" /> Enviar resultados
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
