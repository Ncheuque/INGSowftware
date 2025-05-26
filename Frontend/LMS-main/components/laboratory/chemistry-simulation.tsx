"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Pipette, PlayCircle, PauseCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChemistrySimulationProps {
  onProgress: (progress: number) => void
  onComplete: () => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

export function ChemistrySimulation({ onProgress, onComplete, currentStep, setCurrentStep }: ChemistrySimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [phValue, setPhValue] = useState(1.0)
  const [volume, setVolume] = useState(0)
  const [dropRate, setDropRate] = useState(1)
  const [color, setColor] = useState("transparent")
  const [log, setLog] = useState<string[]>([])

  const steps = [
    "Preparación del montaje",
    "Medición de HCl",
    "Adición del indicador",
    "Titulación con NaOH",
    "Observación del punto de equivalencia",
    "Registro de resultados",
    "Cálculos y conclusiones",
  ]

  useEffect(() => {
    if (currentStep === 0) {
      setLog(["Bienvenido al laboratorio virtual de titulación ácido-base."])
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dibujar el equipo básico
    drawLabEquipment(ctx)

    // Calcular y actualizar el progreso
    const progressPercent = Math.round(((currentStep + 1) / steps.length) * 100)
    onProgress(progressPercent)

    // Si llegamos al último paso, marcamos como completado
    if (currentStep === steps.length - 1 && progressPercent === 100) {
      onComplete()
    }
  }, [currentStep, onComplete, onProgress, steps.length])

  const drawLabEquipment = (ctx: CanvasRenderingContext2D) => {
    // Dibujar soporte universal
    ctx.fillStyle = "#555"
    ctx.fillRect(100, 50, 20, 350)
    ctx.fillRect(50, 400, 120, 20)

    // Dibujar bureta
    ctx.fillStyle = "#ddd"
    ctx.fillRect(250, 100, 40, 250)
    ctx.fillStyle = "#80cce6" // Solución de NaOH
    ctx.fillRect(250, 200, 40, 150)

    // Dibujar erlenmeyer
    ctx.beginPath()
    ctx.moveTo(200, 400)
    ctx.lineTo(250, 500)
    ctx.lineTo(350, 500)
    ctx.lineTo(400, 400)
    ctx.closePath()
    ctx.fillStyle = color || "#f5f5dc" // Color del líquido en el erlenmeyer
    ctx.fill()
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()

    // Dibujar texto para medidas
    ctx.fillStyle = "#000"
    ctx.font = "12px Arial"
    ctx.fillText(`pH: ${phValue.toFixed(1)}`, 220, 450)
    ctx.fillText(`Volumen NaOH: ${volume.toFixed(1)} mL`, 220, 470)
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)

      // Simular cambios en el experimento según el paso
      switch (currentStep + 1) {
        case 1:
          setLog((prev) => [...prev, "Has montado el equipo de titulación correctamente."])
          break
        case 2:
          setLog((prev) => [...prev, "Has añadido 25 mL de HCl 0.1 M al erlenmeyer."])
          break
        case 3:
          setLog((prev) => [...prev, "Has añadido el indicador fenolftaleína a la solución."])
          setColor("#f5f5dc") // Color amarillo claro para la solución ácida con indicador
          break
        case 4:
          setLog((prev) => [...prev, "Comienza la titulación. Añade NaOH gota a gota."])
          break
        case 5:
          setPhValue(7.0)
          setVolume(25.0)
          setColor("#ffccee") // Color rosa pálido en el punto de equivalencia
          setLog((prev) => [...prev, "¡Has alcanzado el punto de equivalencia! La solución ha cambiado a rosa pálido."])
          break
        case 6:
          setLog((prev) => [...prev, "Has registrado un volumen de 25.0 mL de NaOH gastado."])
          break
        case 7:
          setLog((prev) => [...prev, "Has calculado que la concentración de NaOH es 0.1 M."])
          setLog((prev) => [...prev, "¡Experimento completado con éxito!"])
          break
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAddDrop = () => {
    if (currentStep === 4) {
      setVolume((prev) => prev + 0.1)
      setPhValue((prev) => {
        const newPh = prev + 0.1
        if (newPh >= 7.0) {
          setColor("#ffccee") // Color rosa cuando llega a pH neutro
          setLog((prev) => [...prev, "La solución está cambiando de color. Te acercas al punto de equivalencia."])
          return 7.0
        }
        return newPh
      })

      if (volume >= 24.5) {
        setLog((prev) => [...prev, "Estás muy cerca del punto de equivalencia."])
      }
    }
  }

  const startAnimation = () => {
    if (currentStep === 4) {
      setIsAnimating(true)
      const interval = setInterval(() => {
        setVolume((prev) => {
          if (prev >= 25.0) {
            clearInterval(interval)
            setIsAnimating(false)
            return 25.0
          }
          return prev + 0.1 * dropRate
        })

        setPhValue((prev) => {
          if (prev >= 7.0) {
            setColor("#ffccee")
            return 7.0
          }
          if (prev > 6.5) {
            setColor("#fff0f5") // Comienza a cambiar de color
          }
          return prev + 0.05 * dropRate
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }

  const stopAnimation = () => {
    setIsAnimating(false)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="md:col-span-2">
        <div className="bg-white rounded-md p-4 h-full flex flex-col">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">{steps[currentStep]}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Paso {currentStep + 1} de {steps.length}
              </span>
              <Progress value={((currentStep + 1) / steps.length) * 100} className="w-20 h-2" />
            </div>
          </div>

          <div className="flex-1 relative border rounded-md overflow-hidden">
            <canvas ref={canvasRef} width={600} height={550} className="w-full h-full" />

            {currentStep === 4 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="bg-white/90 rounded-md p-2 flex flex-col items-center">
                  <Label htmlFor="dropRate" className="text-xs mb-1">
                    Velocidad
                  </Label>
                  <Input
                    id="dropRate"
                    type="range"
                    min={1}
                    max={5}
                    value={dropRate}
                    onChange={(e) => setDropRate(Number(e.target.value))}
                    className="w-24 h-4"
                  />
                </div>

                <Button variant="secondary" size="sm" onClick={handleAddDrop}>
                  <Pipette className="h-4 w-4 mr-1" /> Añadir gota
                </Button>

                {isAnimating ? (
                  <Button variant="destructive" size="sm" onClick={stopAnimation}>
                    <PauseCircle className="h-4 w-4 mr-1" /> Parar
                  </Button>
                ) : (
                  <Button variant="default" size="sm" onClick={startAnimation}>
                    <PlayCircle className="h-4 w-4 mr-1" /> Auto
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <Button onClick={handlePrevStep} disabled={currentStep === 0} variant="outline">
              <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
            </Button>
            <Button onClick={handleNextStep} disabled={currentStep === steps.length - 1}>
              Siguiente <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <Card className="h-full">
          <div className="p-4 border-b">
            <h3 className="font-medium">Registro de laboratorio</h3>
          </div>
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-2">
              {log.map((entry, index) => (
                <div key={index} className="text-sm border-l-2 border-primary pl-2 py-1">
                  {entry}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
}
