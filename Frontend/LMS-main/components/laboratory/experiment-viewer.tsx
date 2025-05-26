"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FlaskConical,
  Play,
  Pause,
  RotateCcw,
  Save,
  SendHorizonal,
  Info,
  CheckCircle,
  AlertTriangle,
  FileText,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ExperimentViewerProps {
  experimentId: string
  experimentName: string
  experimentDescription: string
  onComplete?: (results: any) => void
  readOnly?: boolean
}

export function ExperimentViewer({
  experimentId,
  experimentName,
  experimentDescription,
  onComplete,
  readOnly = false,
}: ExperimentViewerProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "paused" | "completed" | "failed">("idle")
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("viewer")
  const [experimentData, setExperimentData] = useState<any>(null)

  useEffect(() => {
    // Simular la carga de datos del experimento desde la API de 3D Lab
    const loadExperiment = async () => {
      setStatus("loading")
      try {
        // Aquí se conectaría a la API real de 3D Lab
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Datos de ejemplo del experimento
        setExperimentData({
          id: experimentId,
          name: experimentName,
          description: experimentDescription,
          steps: [
            "Preparar los reactivos necesarios",
            "Añadir 25ml de la solución A al matraz",
            "Calentar la solución a 60°C",
            "Añadir lentamente la solución B mientras se agita",
            "Esperar a que la reacción se complete",
          ],
          materials: [
            "Matraz Erlenmeyer 250ml",
            "Probeta 50ml",
            "Termómetro digital",
            "Solución A (ácido)",
            "Solución B (base)",
          ],
          expectedResults: "Cambio de color de azul a verde cuando la reacción se complete correctamente",
        })

        setStatus("idle")
      } catch (error) {
        console.error("Error loading experiment:", error)
        setStatus("failed")
        toast({
          title: "Error al cargar el experimento",
          description: "No se pudo conectar con el servidor de 3D Lab",
          variant: "destructive",
        })
      }
    }

    loadExperiment()
  }, [experimentId, experimentName, experimentDescription])

  const handleStartExperiment = () => {
    setStatus("running")
    setProgress(0)

    // Simulamos la ejecución del experimento con un progreso gradual
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStatus("completed")

          // Datos de ejemplo de los resultados
          const experimentResults = {
            timeSpent: "12:45",
            accuracy: 94,
            steps: {
              completed: 5,
              correct: 4,
              errors: 1,
            },
            observations: "Reacción completada con éxito. Se observó el cambio de color esperado.",
            timestamp: new Date().toISOString(),
          }

          setResults(experimentResults)

          if (onComplete) {
            onComplete(experimentResults)
          }

          toast({
            title: "Experimento completado",
            description: "Los resultados han sido registrados correctamente",
          })

          return 100
        }
        return prev + 5
      })
    }, 800)

    return () => clearInterval(interval)
  }

  const handlePauseExperiment = () => {
    setStatus("paused")
    toast({
      title: "Experimento pausado",
      description: "Puedes continuar cuando estés listo",
    })
  }

  const handleResetExperiment = () => {
    setStatus("idle")
    setProgress(0)
    setResults(null)
  }

  const handleSaveResults = () => {
    toast({
      title: "Resultados guardados",
      description: "Se ha guardado un borrador de tus resultados",
    })
  }

  const handleSubmitResults = () => {
    toast({
      title: "Resultados enviados",
      description: "Tus resultados han sido enviados para evaluación",
    })
    setActiveTab("results")
  }

  if (!experimentData && status !== "failed") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando experimento...</CardTitle>
          <CardDescription>Conectando con 3D Lab</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-primary rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status === "failed") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Error de conexión</CardTitle>
          <CardDescription>No se pudo establecer conexión con el servidor de 3D Lab</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Por favor, verifica tu conexión a internet e inténtalo nuevamente. Si el problema persiste, contacta a
              soporte técnico.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{experimentData.name}</CardTitle>
            <CardDescription>{experimentData.description}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={
              status === "completed"
                ? "bg-green-50 text-green-700 border-green-200"
                : status === "running"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : status === "paused"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-slate-50 text-slate-700 border-slate-200"
            }
          >
            {status === "completed" ? (
              <>
                <CheckCircle className="mr-1 h-3 w-3" /> Completado
              </>
            ) : status === "running" ? (
              <>
                <FlaskConical className="mr-1 h-3 w-3" /> En progreso
              </>
            ) : status === "paused" ? (
              <>
                <Pause className="mr-1 h-3 w-3" /> Pausado
              </>
            ) : (
              <>
                <Info className="mr-1 h-3 w-3" /> Listo para iniciar
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="viewer">Experimento</TabsTrigger>
            <TabsTrigger value="instructions">Instrucciones</TabsTrigger>
            <TabsTrigger value="results" disabled={!results && !readOnly}>
              Resultados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="viewer" className="mt-4">
            <div className="space-y-4">
              {status !== "idle" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progreso del experimento</span>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
                {/* Aquí se integraría la visualización 3D del experimento */}
                <div className="h-full w-full flex items-center justify-center">
                  {status === "idle" ? (
                    <div className="text-center p-8">
                      <FlaskConical className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                      <h3 className="text-lg font-medium mb-2">Experimento listo para comenzar</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Presiona el botón de inicio para comenzar la simulación del experimento
                      </p>
                      {!readOnly && (
                        <Button onClick={handleStartExperiment}>
                          <Play className="mr-2 h-4 w-4" /> Iniciar experimento
                        </Button>
                      )}
                    </div>
                  ) : status === "running" ? (
                    <div className="text-center p-8">
                      <div className="relative h-40 w-40 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>
                        <div className="relative flex items-center justify-center h-full w-full rounded-full bg-primary/20">
                          <FlaskConical className="h-16 w-16 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Experimento en progreso</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        La simulación está en ejecución, espera a que se complete
                      </p>
                      {!readOnly && (
                        <Button variant="outline" onClick={handlePauseExperiment}>
                          <Pause className="mr-2 h-4 w-4" /> Pausar
                        </Button>
                      )}
                    </div>
                  ) : status === "paused" ? (
                    <div className="text-center p-8">
                      <FlaskConical className="h-16 w-16 mx-auto mb-4 text-amber-500" />
                      <h3 className="text-lg font-medium mb-2">Experimento pausado</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Has pausado la simulación. Puedes continuar o reiniciar
                      </p>
                      {!readOnly && (
                        <div className="flex items-center justify-center gap-2">
                          <Button onClick={handleStartExperiment}>
                            <Play className="mr-2 h-4 w-4" /> Continuar
                          </Button>
                          <Button variant="outline" onClick={handleResetExperiment}>
                            <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : status === "completed" ? (
                    <div className="text-center p-8">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                      <h3 className="text-lg font-medium mb-2">Experimento completado</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        La simulación se ha completado exitosamente. Puedes ver los resultados o reiniciar
                      </p>
                      {!readOnly && (
                        <div className="flex items-center justify-center gap-2">
                          <Button onClick={() => setActiveTab("results")}>Ver resultados</Button>
                          <Button variant="outline" onClick={handleResetExperiment}>
                            <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>

              {status === "completed" && !readOnly && (
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" onClick={handleSaveResults}>
                    <Save className="mr-2 h-4 w-4" /> Guardar borrador
                  </Button>
                  <Button onClick={handleSubmitResults}>
                    <SendHorizonal className="mr-2 h-4 w-4" /> Enviar resultados
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="instructions" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Pasos del experimento</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    {experimentData.steps.map((step: string, index: number) => (
                      <li key={index} className="text-sm">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Resultados esperados</h3>
                  <p className="text-sm text-muted-foreground">{experimentData.expectedResults}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Materiales</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {experimentData.materials.map((material: string, index: number) => (
                      <li key={index} className="text-sm">
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <h4 className="text-sm font-medium">Consejos importantes</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Asegúrate de seguir los pasos en el orden correcto. Presta especial atención a las cantidades y
                        temperaturas indicadas para obtener resultados óptimos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-4">
            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-md border p-4">
                    <h3 className="text-sm font-medium mb-2">Tiempo empleado</h3>
                    <div className="text-2xl font-bold">{results.timeSpent}</div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="text-sm font-medium mb-2">Precisión</h3>
                    <div className="text-2xl font-bold">{results.accuracy}%</div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="text-sm font-medium mb-2">Pasos completados</h3>
                    <div className="text-2xl font-bold">
                      {results.steps.completed}/{experimentData.steps.length}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {results.steps.correct} correctos, {results.steps.errors} con errores
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium mb-2">Observaciones</h3>
                  <p className="text-sm text-muted-foreground">{results.observations}</p>
                </div>

                {!readOnly && (
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleSaveResults}>
                      <Save className="mr-2 h-4 w-4" /> Guardar borrador
                    </Button>
                    <Button onClick={handleSubmitResults}>
                      <SendHorizonal className="mr-2 h-4 w-4" /> Enviar resultados
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <div className="text-center">
                  <FileText className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No hay resultados disponibles</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground flex items-center">
          <Info className="h-3 w-3 mr-1" />
          Integrado con 3D Lab - ID de experimento: {experimentId}
        </div>
      </CardFooter>
    </Card>
  )
}
