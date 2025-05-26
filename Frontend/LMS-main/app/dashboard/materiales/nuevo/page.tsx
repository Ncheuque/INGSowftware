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
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewMaterialPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    course: "",
    type: "",
    file: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para subir el material
    toast({
      title: "Material subido",
      description: "El material ha sido subido exitosamente",
    })
    // Simulamos redirección a la lista de materiales
    setTimeout(() => {
      router.push("/dashboard/materiales")
    }, 1500)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Subir nuevo material" text="Añade un nuevo material a un curso de química">
        <Link href="/dashboard/materiales">
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
              <CardTitle>Información del material</CardTitle>
              <CardDescription>Completa la información del material que deseas subir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del material</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ej. Guía de Nomenclatura Química"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe el contenido del material"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="course">Curso</Label>
                  <Select value={formData.course} onValueChange={(value) => handleSelectChange("course", value)}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Selecciona un curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quimica-general">Química General I</SelectItem>
                      <SelectItem value="quimica-organica">Química Orgánica</SelectItem>
                      <SelectItem value="quimica-analitica">Química Analítica</SelectItem>
                      <SelectItem value="bioquimica">Bioquímica</SelectItem>
                      <SelectItem value="quimica-inorganica">Química Inorgánica</SelectItem>
                      <SelectItem value="fisicoquimica">Fisicoquímica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de material</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="3d">Modelo 3D</SelectItem>
                      <SelectItem value="image">Imagen</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Archivo</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formData.file ? formData.file.name : "PDF, MP4, JPG, PNG, MOL, PDB (MAX. 100MB)"}
                      </p>
                    </div>
                    <input id="file" type="file" className="hidden" onChange={handleFileChange} required />
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit">Subir material</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardShell>
  )
}
