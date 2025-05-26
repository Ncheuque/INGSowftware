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
import { ArrowLeft, Upload, FlaskRoundIcon as Flask, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export default function NewLabPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "medium",
    duration: "45",
    dueDate: "",
    maxAttempts: "3",
    passingGrade: "70",
    enableTimer: true,
    labType: "titration",
    labImage: null as File | null,
    previewImage: null as string | null,
    labGuide: null as File | null,
    labGuidePreview: null as string | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "labImage" | "labGuide") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (fileType === "labImage") {
        setFormData((prev) => ({
          ...prev,
          labImage: file,
          previewImage: URL.createObjectURL(file),
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          labGuide: file,
          labGuidePreview: URL.createObjectURL(file),
        }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para crear el laboratorio
    toast({
      title: "Laboratorio creado",
      description: "El laboratorio ha sido creado exitosamente",
    })
    // Simulamos redirección a la lista de laboratorios
    setTimeout(() => {
      router.push(`/dashboard/cursos/${params.id}?tab=laboratorios`)
    }, 1500)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Crear nuevo laboratorio" text="Configura un nuevo laboratorio virtual con 3D Labs">
        <Link href={`/dashboard/cursos/${params.id}?tab=laboratorios`}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a laboratorios
          </Button>
        </Link>
      </DashboardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="configuration">Configuración</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mt-6">
            <TabsContent value="general" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Información del laboratorio</CardTitle>
                    <CardDescription>Completa la información básica del laboratorio virtual</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título del laboratorio</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Ej. Titulación Ácido-Base"
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
                        placeholder="Describe los objetivos y procedimientos del laboratorio"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="min-h-[120px]"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Nivel de dificultad</Label>
                        <Select
                          value={formData.difficulty}
                          onValueChange={(value) => handleSelectChange("difficulty", value)}
                        >
                          <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Selecciona un nivel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Baja</SelectItem>
                            <SelectItem value="medium">Media</SelectItem>
                            <SelectItem value="high">Alta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duración estimada (minutos)</Label>
                        <Input
                          id="duration"
                          name="duration"
                          type="number"
                          placeholder="45"
                          value={formData.duration}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="dueDate">Fecha límite</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Seleccionar fecha"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxAttempts">Intentos máximos</Label>
                        <Input
                          id="maxAttempts"
                          name="maxAttempts"
                          type="number"
                          placeholder="3"
                          value={formData.maxAttempts}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableTimer"
                        checked={formData.enableTimer}
                        onCheckedChange={(checked) => handleSwitchChange("enableTimer", checked)}
                      />
                      <Label htmlFor="enableTimer">Habilitar temporizador durante la práctica</Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="button" onClick={() => setActiveTab("configuration")}>
                      Siguiente: Configuración
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="configuration" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración del laboratorio</CardTitle>
                    <CardDescription>Configura los parámetros específicos del laboratorio en 3D Labs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Tipo de laboratorio</Label>
                      <RadioGroup
                        value={formData.labType}
                        onValueChange={(value) => handleSelectChange("labType", value)}
                        className="grid grid-cols-1 gap-4 md:grid-cols-3"
                      >
                        <div>
                          <RadioGroupItem value="titration" id="titration" className="peer sr-only" />
                          <Label
                            htmlFor="titration"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Flask className="mb-3 h-6 w-6" />
                            <div className="text-center">
                              <p className="font-medium">Titulación</p>
                              <p className="text-sm text-muted-foreground">Ácido-base, redox</p>
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="spectroscopy" id="spectroscopy" className="peer sr-only" />
                          <Label
                            htmlFor="spectroscopy"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mb-3 h-6 w-6"
                            >
                              <path d="M2 12h2"></path>
                              <path d="M6 12h2"></path>
                              <path d="M10 12h2"></path>
                              <path d="M14 12h2"></path>
                              <path d="M18 12h2"></path>
                              <path d="M22 12h2"></path>
                              <path d="M2 12a10 10 0 0 1 20 0"></path>
                            </svg>
                            <div className="text-center">
                              <p className="font-medium">Espectroscopía</p>
                              <p className="text-sm text-muted-foreground">UV-Vis, IR, RMN</p>
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="calorimetry" id="calorimetry" className="peer sr-only" />
                          <Label
                            htmlFor="calorimetry"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mb-3 h-6 w-6"
                            >
                              <path d="M6 9v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9"></path>
                              <path d="M5 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3H5V6Z"></path>
                              <path d="M9 3v3"></path>
                              <path d="M15 3v3"></path>
                              <path d="M9 14h6"></path>
                              <path d="M12 11v6"></path>
                            </svg>
                            <div className="text-center">
                              <p className="font-medium">Calorimetría</p>
                              <p className="text-sm text-muted-foreground">Calor de reacción</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passingGrade">Calificación mínima para aprobar (%)</Label>
                      <Input
                        id="passingGrade"
                        name="passingGrade"
                        type="number"
                        placeholder="70"
                        value={formData.passingGrade}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="rounded-md border p-4 bg-blue-50">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">Integración con 3D Labs</p>
                          <p className="text-sm text-blue-700 mb-2">
                            Este laboratorio se abrirá en 3D Labs para proporcionar una experiencia interactiva en 3D.
                          </p>
                          <Button variant="outline" size="sm" className="bg-white">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            Configurar parámetros avanzados en 3D Labs
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("general")}>
                      Anterior: Información General
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("resources")}>
                      Siguiente: Recursos
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Recursos del laboratorio</CardTitle>
                    <CardDescription>Añade imágenes y documentos para el laboratorio</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Imagen de portada</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="labImage"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted"
                        >
                          {formData.previewImage ? (
                            <div className="relative w-full h-full">
                              <img
                                src={formData.previewImage || "/placeholder.svg"}
                                alt="Vista previa"
                                className="h-full w-full object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                <p className="text-white text-sm font-medium">Cambiar imagen</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                              </p>
                              <p className="text-xs text-muted-foreground">PNG, JPG (Recomendado: 800x400px)</p>
                            </div>
                          )}
                          <input
                            id="labImage"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "labImage")}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Guía de laboratorio (PDF)</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="labGuide"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted"
                        >
                          {formData.labGuide ? (
                            <div className="flex items-center gap-3 p-4">
                              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-6 w-6 text-red-600"
                                >
                                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                  <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{formData.labGuide.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {(formData.labGuide.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                              </p>
                              <p className="text-xs text-muted-foreground">PDF con instrucciones detalladas</p>
                            </div>
                          )}
                          <input
                            id="labGuide"
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, "labGuide")}
                          />
                        </label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("configuration")}>
                      Anterior: Configuración
                    </Button>
                    <Button type="submit">Crear laboratorio</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
          </div>
        </form>
      </Tabs>
    </DashboardShell>
  )
}
