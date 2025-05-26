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
import { ArrowLeft, Upload, FileText, Video, ImageIcon, Atom, File, X } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function NewMaterialPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upload")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    file: null as File | null,
    url: "",
    embedCode: "",
    previewImage: null as string | null,
  })
  const [dragActive, setDragActive] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({
        ...prev,
        file: file,
        previewImage: URL.createObjectURL(file),
      }))
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setFormData((prev) => ({
        ...prev,
        file: file,
        previewImage: URL.createObjectURL(file),
      }))
    }
  }

  const clearFile = () => {
    if (formData.previewImage) {
      URL.revokeObjectURL(formData.previewImage)
    }
    setFormData((prev) => ({
      ...prev,
      file: null,
      previewImage: null,
    }))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-blue-500" />
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "3d":
        return <Atom className="h-5 w-5 text-green-500" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
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
      router.push(`/dashboard/cursos/${params.id}/materiales`)
    }, 1500)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Subir nuevo material" text="Añade un nuevo material al curso de química">
        <Link href={`/dashboard/cursos/${params.id}`}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al curso
          </Button>
        </Link>
      </DashboardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="upload">Subir archivo</TabsTrigger>
          <TabsTrigger value="link">Enlace externo</TabsTrigger>
          <TabsTrigger value="embed">Código embebido</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mt-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Información del material</CardTitle>
                  <CardDescription>Completa la información básica del material</CardDescription>
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
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeTab === "upload"
                      ? "Subir archivo"
                      : activeTab === "link"
                        ? "Enlace externo"
                        : "Código embebido"}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === "upload"
                      ? "Sube un archivo desde tu dispositivo"
                      : activeTab === "link"
                        ? "Proporciona un enlace a un recurso externo"
                        : "Añade código embebido para contenido interactivo"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="upload" className="mt-0">
                    <div className="space-y-4">
                      {!formData.file ? (
                        <div
                          className={`flex items-center justify-center w-full ${
                            dragActive ? "border-primary bg-primary/5" : "border-dashed"
                          } border-2 rounded-lg cursor-pointer bg-muted/40 hover:bg-muted transition-colors`}
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                        >
                          <label
                            htmlFor="file"
                            className="flex flex-col items-center justify-center w-full h-40 cursor-pointer"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                              </p>
                              <p className="text-xs text-muted-foreground">PDF, MP4, JPG, PNG, MOL, PDB (MAX. 100MB)</p>
                            </div>
                            <input id="file" type="file" className="hidden" onChange={handleFileChange} />
                          </label>
                        </div>
                      ) : (
                        <div className="relative border rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              {formData.type ? getTypeIcon(formData.type) : <File className="h-5 w-5 text-gray-500" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{formData.file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={clearFile}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {formData.previewImage && formData.type === "image" && (
                            <div className="mt-4 rounded-md overflow-hidden border">
                              <img
                                src={formData.previewImage || "/placeholder.svg"}
                                alt="Vista previa"
                                className="max-h-48 w-full object-contain"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {formData.type === "3d" && (
                        <div className="rounded-md border p-4 bg-amber-50">
                          <div className="flex items-start gap-2">
                            <Atom className="h-5 w-5 text-amber-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-amber-800">Integración con 3D Labs</p>
                              <p className="text-sm text-amber-700">
                                Los modelos 3D se abrirán automáticamente en 3D Labs para una experiencia interactiva.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="link" className="mt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="url">URL del recurso</Label>
                        <Input
                          id="url"
                          name="url"
                          placeholder="https://ejemplo.com/recurso"
                          value={formData.url}
                          onChange={handleChange}
                          required={activeTab === "link"}
                        />
                      </div>

                      {formData.type && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {getTypeIcon(formData.type)}
                            <span className="ml-1">
                              {formData.type === "video"
                                ? "Video"
                                : formData.type === "pdf"
                                  ? "PDF"
                                  : formData.type === "3d"
                                    ? "Modelo 3D"
                                    : formData.type === "image"
                                      ? "Imagen"
                                      : "Otro"}
                            </span>
                          </Badge>
                          <span className="text-sm text-muted-foreground">Se abrirá en una nueva ventana</span>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="embed" className="mt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="embedCode">Código embebido</Label>
                        <Textarea
                          id="embedCode"
                          name="embedCode"
                          placeholder="<iframe src='...' width='100%' height='400' frameborder='0'></iframe>"
                          value={formData.embedCode}
                          onChange={handleChange}
                          required={activeTab === "embed"}
                          className="min-h-[120px] font-mono text-sm"
                        />
                      </div>

                      <div className="rounded-md border p-4 bg-blue-50">
                        <div className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">Contenido embebido</p>
                            <p className="text-sm text-blue-700">
                              Puedes incrustar contenido de YouTube, Vimeo, Google Docs, y otros servicios compatibles.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancelar
                  </Button>
                  <Button type="submit">Subir material</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </form>
      </Tabs>
    </DashboardShell>
  )
}
