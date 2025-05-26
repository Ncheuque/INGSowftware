"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BookOpen,
  Users,
  FlaskRoundIcon as Flask,
  FileText,
  Award,
  PlusCircle,
  Calendar,
  Clock,
  ChevronRight,
  ExternalLink,
  Download,
  Eye,
  Settings,
  Video,
  CuboidIcon as Cube,
  FolderOpen,
} from "lucide-react"
import Link from "next/link"
import { MaterialsTable } from "@/components/dashboard/materials-table"
import { ReportsTable } from "@/components/dashboard/reports-table"
import { EvaluationsTable } from "@/components/dashboard/evaluations-table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

// Datos de ejemplo para el curso
const courseData = {
  id: "1",
  title: "Química General I",
  description:
    "Fundamentos de química, estructura atómica y enlaces químicos. Este curso proporciona una introducción completa a los principios básicos de la química moderna.",
  instructor: "Dr. Carlos Mendoza",
  students: 45,
  lessons: 12,
  progress: 65,
  labIntegration: true,
  startDate: "15/02/2023",
  endDate: "30/06/2023",
  image: "/placeholder.svg?height=200&width=400&text=Química+General",
  nextClass: "Equilibrio Químico - Mañana, 10:00 AM",
  announcements: [
    {
      id: "1",
      title: "Práctica de laboratorio programada",
      date: "Hace 2 días",
      content: "La próxima semana tendremos una práctica de titulación ácido-base. Preparen los conceptos previos.",
    },
  ],
}

// Datos de ejemplo para laboratorios
const labsData = [
  {
    id: "1",
    title: "Titulación Ácido-Base",
    description: "Determina la concentración de una solución ácida mediante titulación con una base.",
    image: "/placeholder.svg?height=100&width=250&text=Titulación",
    duration: "45 min",
    difficulty: "Media",
    status: "available",
  },
  {
    id: "2",
    title: "Electrólisis del Agua",
    description: "Observa la descomposición del agua en hidrógeno y oxígeno mediante corriente eléctrica.",
    image: "/placeholder.svg?height=100&width=250&text=Electrólisis",
    duration: "30 min",
    difficulty: "Baja",
    status: "completed",
    score: 92,
  },
  {
    id: "3",
    title: "Calorimetría",
    description: "Mide el calor liberado o absorbido durante reacciones químicas.",
    image: "/placeholder.svg?height=100&width=250&text=Calorimetría",
    duration: "60 min",
    difficulty: "Alta",
    status: "in-progress",
    progress: 45,
  },
]

// Datos de ejemplo para materiales destacados
const featuredMaterials = [
  {
    id: "1",
    title: "Guía de Nomenclatura Química",
    type: "pdf",
    size: "5 MB",
    downloads: 32,
  },
  {
    id: "2",
    title: "Video: Introducción a la Tabla Periódica",
    type: "video",
    duration: "15:30",
    views: 45,
  },
  {
    id: "3",
    title: "Modelo 3D: Orbitales Atómicos",
    type: "3d",
    size: "12 MB",
    interactions: 28,
  },
]

export default function CoursePage({ params }: { params: { id: string } }) {
  const [userRole, setUserRole] = useState<"estudiante" | "profesor">("estudiante")
  const [activeTab, setActiveTab] = useState("general")
  const [progressAnimation, setProgressAnimation] = useState(0)

  // Obtener el rol del usuario del localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole")
    if (savedRole === "profesor" || savedRole === "estudiante") {
      setUserRole(savedRole as "estudiante" | "profesor")
    }
  }, [])

  // Animación para la barra de progreso
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressAnimation(courseData.progress)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardShell>
      <DashboardHeader heading={courseData.title} text={courseData.description}>
        <div className="flex items-center gap-2">
          {/* Solo mostrar botón de configuración para profesores */}
          {userRole === "profesor" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/dashboard/cursos/${params.id}/configuracion`}>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Configuración</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configuración del curso</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <Link href="/dashboard/cursos">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a cursos
            </Button>
          </Link>
        </div>
      </DashboardHeader>

      <div className="grid gap-6">
        {/* Pestañas principales */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="modulos" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Módulos</span>
            </TabsTrigger>
            <TabsTrigger value="laboratorios" className="flex items-center gap-1">
              <Flask className="h-4 w-4" />
              <span className="hidden sm:inline">Laboratorios</span>
            </TabsTrigger>
            <TabsTrigger value="materiales" className="flex items-center gap-1">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Materiales</span>
            </TabsTrigger>
            <TabsTrigger value="informes" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Informes</span>
            </TabsTrigger>
            <TabsTrigger value="evaluaciones" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Evaluaciones</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenido de la pestaña General */}
          <TabsContent value="general" className="mt-6 space-y-6">
            {/* Información general del curso */}
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2"
              >
                <Card>
                  <div className="md:grid md:grid-cols-[1fr_300px] overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-2xl font-bold">{courseData.title}</h3>
                        {courseData.labIntegration && (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            <Flask className="mr-1 h-3 w-3" /> 3D Labs
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-6">{courseData.description}</p>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-primary/10">
                            <AvatarImage
                              src="/placeholder.svg?height=40&width=40&text=CM"
                              alt={courseData.instructor}
                            />
                            <AvatarFallback>CM</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Instructor</p>
                            <p className="text-sm text-muted-foreground">{courseData.instructor}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Fechas</p>
                            <p className="text-sm text-muted-foreground">
                              {courseData.startDate} - {courseData.endDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Estudiantes</p>
                            <p className="text-sm text-muted-foreground">{courseData.students}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Lecciones</p>
                            <p className="text-sm text-muted-foreground">{courseData.lessons}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Progreso del curso</span>
                          <span>{courseData.progress}%</span>
                        </div>
                        <Progress value={progressAnimation} className="h-2" />
                      </div>
                    </div>
                    <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
                      <img
                        src={courseData.image || "/placeholder.svg"}
                        alt={courseData.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Próxima clase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{courseData.nextClass.split(" - ")[0]}</p>
                        <p className="text-sm text-muted-foreground">{courseData.nextClass.split(" - ")[1]}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Anuncios recientes</h4>
                      {courseData.announcements.map((announcement) => (
                        <div key={announcement.id} className="border-l-2 border-primary pl-3 py-1">
                          <p className="font-medium text-sm">{announcement.title}</p>
                          <p className="text-xs text-muted-foreground mb-1">{announcement.date}</p>
                          <p className="text-sm">{announcement.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver todos los anuncios
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>

            {/* Sección de materiales destacados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Materiales destacados</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      Ver todos <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {featuredMaterials.map((material) => (
                      <Card key={material.id} className="overflow-hidden group">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center
                              ${
                                material.type === "pdf"
                                  ? "bg-red-500/10"
                                  : material.type === "video"
                                    ? "bg-blue-500/10"
                                    : "bg-primary/10"
                              }`}
                            >
                              {material.type === "pdf" ? (
                                <FileText className="h-5 w-5 text-red-500" />
                              ) : material.type === "video" ? (
                                <Video className="h-5 w-5 text-blue-500" />
                              ) : (
                                <Cube className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                                {material.title}
                              </h4>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-muted-foreground">
                                  {material.type === "pdf" || material.type === "3d"
                                    ? material.size
                                    : material.duration}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {material.type === "pdf"
                                    ? `${material.downloads} descargas`
                                    : material.type === "video"
                                      ? `${material.views} vistas`
                                      : `${material.interactions} interacciones`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <div className="px-4 pb-4 flex gap-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="mr-1 h-3 w-3" />
                            Ver
                          </Button>
                          {material.type !== "video" && (
                            <Button variant="outline" size="sm" className="w-full">
                              <Download className="mr-1 h-3 w-3" />
                              Descargar
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sección de laboratorios recientes */}
            {courseData.labIntegration && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Laboratorios recientes</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-primary"
                        onClick={() => setActiveTab("laboratorios")}
                      >
                        Ver todos <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {labsData.map((lab, index) => (
                        <motion.div
                          key={lab.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                          <Card className="overflow-hidden group h-full flex flex-col">
                            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                              <img
                                src={lab.image || "/placeholder.svg"}
                                alt={lab.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute top-2 right-2">
                                <Badge
                                  variant={
                                    lab.status === "completed"
                                      ? "default"
                                      : lab.status === "in-progress"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className={
                                    lab.status === "completed"
                                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                                      : lab.status === "in-progress"
                                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                        : "bg-primary/10 text-primary border-primary/20"
                                  }
                                >
                                  {lab.status === "completed"
                                    ? "Completado"
                                    : lab.status === "in-progress"
                                      ? "En progreso"
                                      : "Disponible"}
                                </Badge>
                              </div>
                            </div>
                            <CardHeader className="p-4 pb-2">
                              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                {lab.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">{lab.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex-grow">
                              <div className="flex justify-between text-sm text-muted-foreground mb-4">
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-4 w-4" />
                                  {lab.duration}
                                </div>
                                <div>Dificultad: {lab.difficulty}</div>
                              </div>

                              {lab.status === "in-progress" && (
                                <div className="space-y-1 mb-4">
                                  <Progress value={lab.progress} className="h-2" />
                                  <p className="text-xs text-right text-muted-foreground">{lab.progress}% completado</p>
                                </div>
                              )}

                              {lab.status === "completed" && lab.score && (
                                <div className="mb-4 flex justify-end">
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                    <Award className="mr-1 h-3 w-3" /> Calificación: {lab.score}%
                                  </Badge>
                                </div>
                              )}
                            </CardContent>
                            <CardFooter className="p-4 pt-0 mt-auto">
                              <Button className="w-full gap-2">
                                {lab.status === "completed" ? (
                                  <>
                                    <Eye className="h-4 w-4" />
                                    Ver resultados
                                  </>
                                ) : (
                                  <>
                                    <ExternalLink className="h-4 w-4" />
                                    {lab.status === "in-progress" ? "Continuar" : "Abrir"} en 3D Labs
                                  </>
                                )}
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="modulos" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Módulos del curso</h3>
                <p className="text-sm text-muted-foreground">Contenido organizado por módulos</p>
              </div>
              {/* Solo mostrar botón de añadir módulo para profesores */}
              {userRole === "profesor" && (
                <Link href={`/dashboard/cursos/${params.id}/modulos/nuevo`}>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo módulo
                  </Button>
                </Link>
              )}
            </div>

            <div className="space-y-6">
              {/* Ejemplo de módulos */}
              {[1, 2, 3].map((moduleIndex) => (
                <Card key={moduleIndex}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        Módulo {moduleIndex}:{" "}
                        {moduleIndex === 1
                          ? "Fundamentos Básicos"
                          : moduleIndex === 2
                            ? "Reacciones Químicas"
                            : "Equilibrio Químico"}
                      </CardTitle>
                      <Badge variant={moduleIndex === 1 ? "default" : moduleIndex === 2 ? "secondary" : "outline"}>
                        {moduleIndex === 1 ? "Completado" : moduleIndex === 2 ? "En progreso" : "Próximamente"}
                      </Badge>
                    </div>
                    <CardDescription>
                      {moduleIndex === 1
                        ? "Introducción a los conceptos fundamentales de la química"
                        : moduleIndex === 2
                          ? "Estudio de las reacciones químicas y sus mecanismos"
                          : "Análisis del equilibrio en reacciones químicas"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                moduleIndex === 1 || (moduleIndex === 2 && lessonIndex === 1)
                                  ? "bg-green-100 text-green-700"
                                  : moduleIndex === 2 && lessonIndex === 2
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {moduleIndex === 1 || (moduleIndex === 2 && lessonIndex === 1)
                                ? "✓"
                                : moduleIndex === 2 && lessonIndex === 2
                                  ? "→"
                                  : lessonIndex}
                            </div>
                            <div>
                              <p className="font-medium">
                                Lección {lessonIndex}:{" "}
                                {moduleIndex === 1
                                  ? lessonIndex === 1
                                    ? "Estructura atómica"
                                    : lessonIndex === 2
                                      ? "Tabla periódica"
                                      : "Enlaces químicos"
                                  : moduleIndex === 2
                                    ? lessonIndex === 1
                                      ? "Tipos de reacciones"
                                      : lessonIndex === 2
                                        ? "Estequiometría"
                                        : "Cinética química"
                                    : lessonIndex === 1
                                      ? "Principio de Le Chatelier"
                                      : lessonIndex === 2
                                        ? "Constantes de equilibrio"
                                        : "Equilibrios ácido-base"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {moduleIndex === 1 || (moduleIndex === 2 && lessonIndex === 1)
                                  ? "Completado"
                                  : moduleIndex === 2 && lessonIndex === 2
                                    ? "En progreso"
                                    : "Pendiente"}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            {moduleIndex === 1 || (moduleIndex === 2 && lessonIndex === 1)
                              ? "Repasar"
                              : moduleIndex === 2 && lessonIndex === 2
                                ? "Continuar"
                                : "Comenzar"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  {moduleIndex < 3 && (
                    <CardFooter>
                      <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Progress value={moduleIndex === 1 ? 100 : moduleIndex === 2 ? 66 : 0} className="w-32 h-2" />
                          <span className="text-sm text-muted-foreground">
                            {moduleIndex === 1 ? "100%" : moduleIndex === 2 ? "66%" : "0%"}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          {moduleIndex === 1 ? "Ver certificado" : "Ver detalles"}
                        </Button>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contenido de Materiales */}

          <TabsContent value="materiales" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Materiales del curso</h3>
                <p className="text-sm text-muted-foreground">Accede a todos los recursos de aprendizaje</p>
              </div>
              {/* Solo mostrar botón de añadir material para profesores */}
              {userRole === "profesor" && (
                <Link href={`/dashboard/cursos/${params.id}/materiales/nuevo`}>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo material
                  </Button>
                </Link>
              )}
            </div>
            <MaterialsTable courseId={params.id} userRole={userRole} />
          </TabsContent>

          {/* Contenido de Laboratorios */}
          <TabsContent value="laboratorios" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Laboratorios virtuales</h3>
                <p className="text-sm text-muted-foreground">Experimenta con simulaciones interactivas en 3D Labs</p>
              </div>
              {/* Solo mostrar botón de añadir laboratorio para profesores */}
              {userRole === "profesor" && (
                <Link href={`/dashboard/cursos/${params.id}/laboratorios/nuevo`}>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo laboratorio
                  </Button>
                </Link>
              )}
            </div>

            {courseData.labIntegration ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {labsData.map((lab, index) => (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden group h-full flex flex-col">
                      <div className="aspect-video w-full overflow-hidden bg-muted relative">
                        <img
                          src={lab.image || "/placeholder.svg"}
                          alt={lab.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant={
                              lab.status === "completed"
                                ? "default"
                                : lab.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              lab.status === "completed"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : lab.status === "in-progress"
                                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                  : "bg-primary/10 text-primary border-primary/20"
                            }
                          >
                            {lab.status === "completed"
                              ? "Completado"
                              : lab.status === "in-progress"
                                ? "En progreso"
                                : "Disponible"}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {lab.title}
                        </CardTitle>
                        <CardDescription>{lab.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <div className="flex justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {lab.duration}
                          </div>
                          <div>Dificultad: {lab.difficulty}</div>
                        </div>

                        {lab.status === "in-progress" && (
                          <div className="space-y-1 mb-4">
                            <Progress value={lab.progress} className="h-2" />
                            <p className="text-xs text-right text-muted-foreground">{lab.progress}% completado</p>
                          </div>
                        )}

                        {lab.status === "completed" && lab.score && (
                          <div className="mb-4 flex justify-end">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              <Award className="mr-1 h-3 w-3" /> Calificación: {lab.score}%
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 pt-0 mt-auto">
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Guía
                          </Button>
                          <Button>
                            {lab.status === "completed" ? (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Resultados
                              </>
                            ) : (
                              <>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                {lab.status === "in-progress" ? "Continuar" : "Iniciar"}
                              </>
                            )}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-6">
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <Flask className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Este curso no tiene integración con 3D Labs</h3>
                  <p className="text-muted-foreground mb-4">
                    Para habilitar los laboratorios virtuales, activa la integración con 3D Labs en la configuración del
                    curso.
                  </p>
                  {userRole === "profesor" && <Button variant="outline">Habilitar integración con 3D Labs</Button>}
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Contenido de Informes */}
          <TabsContent value="informes" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Informes de laboratorio</h3>
                <p className="text-sm text-muted-foreground">Gestiona los informes de las prácticas realizadas</p>
              </div>
              {/* Solo estudiantes pueden crear nuevos informes */}
              {userRole === "estudiante" && (
                <Link href={`/dashboard/cursos/${params.id}/informes/nuevo`}>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo informe
                  </Button>
                </Link>
              )}
            </div>
            <ReportsTable userRole={userRole} status="todos" />
          </TabsContent>

          {/* Contenido de Evaluaciones */}
          <TabsContent value="evaluaciones" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Evaluaciones</h3>
                <p className="text-sm text-muted-foreground">Gestiona las evaluaciones del curso</p>
              </div>
              {/* Solo profesores pueden crear nuevas evaluaciones */}
              {userRole === "profesor" && (
                <Link href={`/dashboard/cursos/${params.id}/evaluaciones/nueva`}>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nueva evaluación
                  </Button>
                </Link>
              )}
            </div>
            <EvaluationsTable userRole={userRole} type={userRole === "estudiante" ? "all" : "labs"} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
