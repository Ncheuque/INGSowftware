"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CuboidIcon as Cube3d, ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "estudiante",
  })

  useEffect(() => {
    // Verificar si el usuario es administrador
    const userRole = localStorage.getItem("userRole")

    if (userRole !== "administrador") {
      toast({
        title: "Acceso denegado",
        description: "Solo los administradores pueden registrar nuevos usuarios.",
        variant: "destructive",
      })

      // Redirigir al dashboard o al login
      router.push(userRole ? "/dashboard" : "/login")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    // Aquí iría la lógica de registro
    toast({
      title: "Registro exitoso",
      description: "Tu cuenta ha sido creada correctamente",
    })

    // Simulamos redirección al login
    setTimeout(() => {
      router.push("/login")
    }, 1500)
  }

  // Esta página solo será visible para administradores
  // El contenido real se mostrará solo si el usuario es administrador
  const userRole = localStorage.getItem("userRole")

  if (userRole !== "administrador") {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        <Link href="/" className="absolute left-8 top-8 flex items-center text-sm font-medium text-muted-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Cube3d className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold">Crea tu cuenta</h1>
            <p className="text-muted-foreground">Regístrate para acceder a todos nuestros cursos</p>
          </div>
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Tipo de usuario</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="docente">Docente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Crear cuenta
              </Button>
            </form>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
