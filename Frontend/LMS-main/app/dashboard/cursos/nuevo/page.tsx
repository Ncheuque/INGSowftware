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
import { ArrowLeft, FlaskRoundIcon as Flask } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function NewCoursePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    image: "",
    labIntegration: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, labIntegration: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para crear el curso
    toast({
      title: "Curso creado",
      description: "El curso ha sido creado exitosamente",
    })
    // Simulamos redirección a la lista de cursos
    setTimeout(() => {
      router.push("/dashboard/cursos")
    }, 1500)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Crear nuevo curso" text="Añade un nuevo curso de química a la plataforma">
        <Link href="/dashboard/cursos">
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
              <CardTitle>Información del curso</CardTitle>
              <CardDescription>Completa la información básica del curso de química</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título del curso</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ej. Química General I"
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
                  placeholder="Describe el contenido y objetivos del curso"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="min-h-[120px]"
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
                      <SelectItem value="general">Química General</SelectItem>
                      <SelectItem value="organica">Química Orgánica</SelectItem>
                      <SelectItem value="inorganica">Química Inorgánica</SelectItem>
                      <SelectItem value="analitica">Química Analítica</SelectItem>
                      <SelectItem value="fisicoquimica">Fisicoquímica</SelectItem>
                      <SelectItem value="bioquimica">Bioquímica</SelectItem>
                      <SelectItem value="ambiental">Química Ambiental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Nivel</Label>
                  <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Selecciona un nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principiante">Principiante</SelectItem>
                      <SelectItem value="intermedio">Intermedio</SelectItem>
                      <SelectItem value="avanzado">Avanzado</SelectItem>
                      <SelectItem value="experto">Experto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración (horas)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    placeholder="Ej. 48"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL de imagen</Label>
                  <Input
                    id="image"
                    name="image"
                    placeholder="URL de la imagen de portada"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="labIntegration" className="text-base">
                      Integración con 3D Labs
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Habilita la integración con el software de simulación de laboratorios 3D Labs
                    </p>
                  </div>
                  <Switch id="labIntegration" checked={formData.labIntegration} onCheckedChange={handleSwitchChange} />
                </div>

                {formData.labIntegration && (
                  <div className="rounded-md bg-muted p-4 mt-2">
                    <div className="flex items-start gap-2">
                      <Flask className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Información sobre 3D Labs</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          3D Labs es un software externo de simulación de laboratorios que se integra con este LMS. Al
                          habilitar esta opción, los estudiantes podrán acceder a experimentos virtuales relacionados
                          con este curso.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit">Crear curso</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardShell>
  )
}
