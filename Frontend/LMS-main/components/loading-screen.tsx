"use client"

import { useState, useEffect } from "react"
import { Atom, FlaskRoundIcon as Flask, BarChart, FileText, Users, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Iniciando 3D Lab...")
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const steps = [
      { progress: 20, status: "Cargando recursos 3D..." },
      { progress: 40, status: "Preparando laboratorios virtuales..." },
      { progress: 60, status: "Sincronizando datos del curso..." },
      { progress: 80, status: "Cargando resultados de experimentos..." },
      { progress: 100, status: "¡Todo listo!" },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress)
        setStatus(steps[currentStep].status)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setCompleted(true)
        }, 500)
      }
    }, 700)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className={`transition-opacity duration-500 ${completed ? "opacity-0" : "opacity-100"}`}>
        <div className="w-[300px] flex flex-col items-center">
          <div className="relative mb-8">
            <div className="lab-icon-animation">
              {/* Átomo central */}
              <div className="relative size-16 flex items-center justify-center">
                <Atom className="size-16 text-primary animate-pulse" />

                {/* Íconos orbitando */}
                <div className="absolute size-full animate-spin" style={{ animationDuration: "8s" }}>
                  <Flask className="absolute size-6 text-blue-500 left-1/2 -top-3 transform -translate-x-1/2" />
                </div>

                <div
                  className="absolute size-full animate-spin"
                  style={{ animationDuration: "10s", animationDelay: "-2s" }}
                >
                  <BarChart className="absolute size-6 text-green-500 -right-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <div
                  className="absolute size-full animate-spin"
                  style={{ animationDuration: "12s", animationDelay: "-4s" }}
                >
                  <FileText className="absolute size-6 text-yellow-500 left-1/2 -bottom-3 transform -translate-x-1/2" />
                </div>

                <div
                  className="absolute size-full animate-spin"
                  style={{ animationDuration: "14s", animationDelay: "-6s" }}
                >
                  <Users className="absolute size-6 text-purple-500 -left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-medium mb-1">3D Lab LMS</h3>
            <p className="text-sm text-muted-foreground mb-4">{status}</p>
            <Progress value={progress} className="h-2 w-[300px]" />
            <p className="text-xs text-muted-foreground mt-2">{progress}% completado</p>
          </div>
        </div>
      </div>

      {/* Animación de completado */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${completed ? "opacity-100" : "opacity-0"}`}
      >
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h3 className="text-xl font-medium">¡Bienvenido a 3D Lab!</h3>
        </div>
      </div>
    </div>
  )
}
