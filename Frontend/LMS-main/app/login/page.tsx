"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Atom } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("estudiante")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulación de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // En un sistema real, el rol vendría del backend después de la autenticación
      // Aquí lo tomamos del selector para la demostración
      localStorage.setItem("userRole", role)

      // Mostrar toast de bienvenida
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido/a al sistema 3D Lab LMS como ${role}.`,
      })

      // Redirigir al dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Error de inicio de sesión:", err)
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Atom className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">3D Lab LMS</h1>
            <p className="mt-2 text-muted-foreground">
              Sistema de gestión del aprendizaje con laboratorios virtuales 3D
            </p>
          </div>

          <Card className="border-2 border-primary/10 shadow-lg transition-all hover:shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
              <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="transition-all focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Tipo de usuario</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona tu rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="estudiante">Estudiante</SelectItem>
                      <SelectItem value="docente">Docente</SelectItem>
                      <SelectItem value="administrador">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Nota: En un sistema real, el rol sería determinado automáticamente por el sistema.
                  </p>
                </div>
                {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
                <Button
                  type="submit"
                  className="w-full transition-all hover:bg-primary/90 relative overflow-hidden group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      Iniciando sesión...
                    </span>
                  ) : (
                    <span>Iniciar sesión</span>
                  )}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                El registro de nuevos usuarios solo puede ser realizado por un administrador del sistema.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Animación del laboratorio de química - sin puntos en la esquina */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted/30 overflow-hidden">
        <div className="relative h-[500px] w-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative h-full w-full rounded-xl border bg-card p-4 shadow-xl">
            <div className="h-full w-full overflow-hidden rounded-lg bg-muted relative">
              <div className="h-full w-full relative flex items-center justify-center">
                <div className="lab-animation">
                  {/* Beaker principal */}
                  <div className="beaker">
                    <div className="liquid"></div>
                    <div className="bubbles">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div
                          key={i}
                          className="bubble"
                          style={{
                            animationDuration: `${2 + Math.random() * 3}s`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            width: `${5 + Math.random() * 10}px`,
                            height: `${5 + Math.random() * 10}px`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Matraz */}
                  <div className="flask">
                    <div
                      className="liquid"
                      style={{
                        background: "linear-gradient(to bottom, rgba(0, 191, 255, 0.6), rgba(65, 105, 225, 0.8))",
                        height: "50%",
                        animation: "bubbling 3s infinite alternate",
                      }}
                    ></div>
                    <div className="bubbles">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="bubble"
                          style={{
                            animationDuration: `${2 + Math.random() * 2}s`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            width: `${3 + Math.random() * 6}px`,
                            height: `${3 + Math.random() * 6}px`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Tubo de ensayo */}
                  <div className="test-tube">
                    <div className="test-tube-liquid"></div>
                  </div>

                  {/* Mechero Bunsen */}
                  <div className="bunsen-burner">
                    <div className="flame"></div>
                    <div className="smoke"></div>
                  </div>

                  {/* Moléculas flotantes */}
                  <div className="molecules">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="molecule"
                        style={{
                          animationDuration: `${5 + Math.random() * 7}s`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 4}s`,
                          transform: `scale(${0.8 + Math.random() * 0.4})`,
                        }}
                      >
                        <div className="atom atom-center"></div>
                        <div className="atom atom-orbit1"></div>
                        <div className="atom atom-orbit2"></div>
                        <div className="atom atom-orbit3"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
