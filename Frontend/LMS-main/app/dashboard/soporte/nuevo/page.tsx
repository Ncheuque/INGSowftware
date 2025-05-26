"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewTicketPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para crear el ticket
    toast({
      title: "Ticket creado",
      description: "Tu ticket ha sido creado exitosamente",
    })
    // Simulamos redirección a la lista de tickets
    setTimeout(() => {
      router.push("/dashboard/soporte")
    }, 1500)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Crear nuevo ticket" text="Envía una solicitud de soporte">
        <Link href="/dashboard/soporte">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
      </DashboardHeader>
      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Información del ticket</CardTitle>
              <CardDescription>Completa la información para crear un nuevo ticket de soporte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Asunto</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ej. Problema al acceder al curso"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe detalladamente el problema que estás experimentando"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="min-h-[150px]"
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acceso">Problemas de acceso</SelectItem>
                      <SelectItem value="cursos">Problemas con cursos</SelectItem>
                      <SelectItem value="materiales">Problemas con materiales</SelectItem>
                      <SelectItem value="pagos">Pagos y facturación</SelectItem>
                      <SelectItem value="tecnico">Soporte técnico</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Selecciona una prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit">Crear ticket</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardShell>
  )
}
