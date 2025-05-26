"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EvaluationsTable } from "@/components/dashboard/evaluations-table"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  FlaskConical,
  Users,
  Microscope,
  AlertCircle,
  ArrowRight,
  FileCheck,
  Clock,
  BarChart,
  CheckCircle,
  PlusCircle,
  UserPlus,
  School,
  Trash2,
  Edit,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Datos de notificaciones simulados
  const notifications = [
    {
      id: "1",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "CM",
      name: "Carlos Mendoza",
      action: "Ha calificado tu informe de laboratorio",
      time: "Hace 5m",
      type: "evaluation",
    },
    {
      id: "2",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "LR",
      name: "Laura Rodríguez",
      action: "Ha añadido un nuevo material al curso 'Química Orgánica'",
      time: "Hace 15m",
      type: "course",
    },
    {
      id: "3",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "AP",
      name: "Administración",
      action: "Tu solicitud de soporte ha sido respondida",
      time: "Hace 1h",
      type: "support",
    },
    {
      id: "4",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "CM",
      name: "Carlos Mendoza",
      action: "Ha programado una nueva práctica de laboratorio",
      time: "Hace 3h",
      type: "lab",
    },
    {
      id: "5",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "AP",
      name: "Administración",
      action: "Se ha actualizado el sistema 3D Lab",
      time: "Hace 5h",
      type: "system",
    },
    {
      id: "6",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "JD",
      name: "Juan Díaz",
      action: "Completó el curso 'Introducción al Modelado 3D'",
      time: "Hace 6h",
      type: "course",
    },
    {
      id: "7",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "MG",
      name: "María González",
      action: "Solicitó retroalimentación sobre su informe",
      time: "Hace 8h",
      type: "report",
    },
    {
      id: "8",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "AP",
      name: "Ana Pérez",
      action: "Completó todos los módulos del curso",
      time: "Hace 12h",
      type: "course",
    },
    {
      id: "9",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "RV",
      name: "Roberto Vega",
      action: "Ha subido un nuevo modelo 3D al laboratorio",
      time: "Hace 1d",
      type: "lab",
    },
    {
      id: "10",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "LM",
      name: "Luis Martínez",
      action: "Te ha asignado como tutor del curso 'Química Analítica'",
      time: "Hace 1d",
      type: "course",
    },
    {
      id: "11",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "SM",
      name: "Sofía Morales",
      action: "Ha enviado un nuevo informe para revisión",
      time: "Hace 2d",
      type: "report",
    },
    {
      id: "12",
      avatar: "/placeholder.svg?height=36&width=36",
      initials: "AP",
      name: "Administración",
      action: "Mantenimiento programado para el próximo fin de semana",
      time: "Hace 3d",
      type: "system",
    },
  ]

  useEffect(() => {
    // En un sistema real, obtendríamos el rol del usuario de una sesión autenticada
    const role = localStorage.getItem("userRole") || "estudiante"
    setUserRole(role)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-primary rounded-full"></div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex-1 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {userRole === "estudiante" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cursos Inscritos</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">3 en progreso, 1 completado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Experimentos 3D</CardTitle>
                  <Microscope className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">8 completados, 1 en progreso</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Laboratorios Pendientes</CardTitle>
                  <FlaskConical className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Próximo vence en 2 días</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89.5%</div>
                  <p className="text-xs text-muted-foreground">+2.5% respecto al período anterior</p>
                </CardContent>
              </Card>
            </>
          )}

          {userRole === "docente" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">75 estudiantes en total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Experimentos Asignados</CardTitle>
                  <Microscope className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">65% completados por estudiantes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Informes Pendientes</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Pendientes de calificación</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Promedio Curso</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82.3%</div>
                  <p className="text-xs text-muted-foreground">+4.2% respecto al período anterior</p>
                </CardContent>
              </Card>
            </>
          )}

          {userRole === "administrador" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">254</div>
                  <p className="text-xs text-muted-foreground">230 estudiantes, 18 docentes, 6 admin</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 comparado con el semestre anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Integraciones 3D</CardTitle>
                  <Microscope className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">98.5% de disponibilidad</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Aprobación</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.7%</div>
                  <p className="text-xs text-muted-foreground">+5.3% respecto al período anterior</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Últimas notificaciones y eventos</CardDescription>
              </div>
              <Link href="/dashboard/notificaciones">
                <Button variant="outline" size="sm">
                  Ver todas <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-4 rounded-lg p-2 transition-colors hover:bg-muted/50"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={notification.avatar || "/placeholder.svg"} alt={notification.name} />
                        <AvatarFallback>{notification.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">{notification.name}</p>
                          <div className="flex items-center">
                            {notification.type === "evaluation" && (
                              <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200">
                                Evaluación
                              </Badge>
                            )}
                            {notification.type === "lab" && (
                              <Badge variant="outline" className="mr-2 bg-purple-50 text-purple-700 border-purple-200">
                                Laboratorio
                              </Badge>
                            )}
                            {notification.type === "course" && (
                              <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-200">
                                Curso
                              </Badge>
                            )}
                            {notification.type === "support" && (
                              <Badge variant="outline" className="mr-2 bg-amber-50 text-amber-700 border-amber-200">
                                Soporte
                              </Badge>
                            )}
                            {notification.type === "system" && (
                              <Badge variant="outline" className="mr-2 bg-gray-50 text-gray-700 border-gray-200">
                                Sistema
                              </Badge>
                            )}
                            {notification.type === "report" && (
                              <Badge variant="outline" className="mr-2 bg-indigo-50 text-indigo-700 border-indigo-200">
                                Informe
                              </Badge>
                            )}
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {userRole === "estudiante" && (
          <div className="grid gap-4 grid-cols-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Próximos laboratorios</CardTitle>
                  <CardDescription>Laboratorios pendientes en tus cursos</CardDescription>
                </div>
                <Link href="/dashboard/cursos">
                  <Button variant="outline" size="sm">
                    Ver todos <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                        <div className="aspect-video bg-muted">
                          <img
                            src={`/placeholder.svg?height=120&width=240&text=Laboratorio ${i}`}
                            alt={`Laboratorio ${i}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">Titulación Ácido-Base {i}</CardTitle>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Pendiente
                            </Badge>
                          </div>
                          <CardDescription>
                            <span className="block">Curso: Química General I</span>
                            Vence en {i + 1} días
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" /> 45 min
                            </div>
                            <Link href={`/dashboard/cursos/1/laboratorios/lab-00${i}`}>
                              <Button variant="default" size="sm">
                                <Microscope className="mr-2 h-3 w-3" /> Iniciar
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {userRole === "docente" && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Evaluaciones pendientes</CardTitle>
                  <CardDescription>Experimentos e informes pendientes de calificación</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="experiments">
                    <TabsList className="mb-4">
                      <TabsTrigger value="experiments">Experimentos</TabsTrigger>
                      <TabsTrigger value="reports">Informes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="experiments">
                      <EvaluationsTable userRole="profesor" type="labs" />
                    </TabsContent>
                    <TabsContent value="reports">
                      <EvaluationsTable userRole="profesor" type="reports" />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestión de materiales</CardTitle>
                    <CardDescription>Administra los materiales de tus cursos</CardDescription>
                  </div>
                  <Link href="/dashboard/materiales/nuevo">
                    <Button size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Nuevo material
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              {i === 1 ? (
                                <FileCheck className="h-5 w-5 text-primary" />
                              ) : i === 2 ? (
                                <Microscope className="h-5 w-5 text-primary" />
                              ) : (
                                <BookOpen className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">
                                {i === 1
                                  ? "Guía de laboratorio: Titulación"
                                  : i === 2
                                    ? "Modelo 3D: Estructura molecular"
                                    : "Presentación: Equilibrio químico"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {i === 1 ? "Química General I" : i === 2 ? "Química Orgánica" : "Fisicoquímica"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Link href="/dashboard/materiales">
                        <Button variant="outline">Ver todos los materiales</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {userRole === "administrador" && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestión de cursos</CardTitle>
                    <CardDescription>Administra los cursos de la plataforma</CardDescription>
                  </div>
                  <Link href="/dashboard/administracion/cursos/nuevo">
                    <Button size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Nuevo curso
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {i === 1 ? "Química General I" : i === 2 ? "Química Orgánica" : "Fisicoquímica"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {i === 1 ? "45 estudiantes" : i === 2 ? "32 estudiantes" : "28 estudiantes"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/dashboard/administracion/cursos/${i}/asignar`}>
                              <Button variant="outline" size="sm">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Asignar
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Link href="/dashboard/administracion/cursos">
                        <Button variant="outline">Ver todos los cursos</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Registro de usuarios</CardTitle>
                    <CardDescription>Gestiona los usuarios de la plataforma</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/dashboard/administracion/usuarios/nuevo?role=estudiante">
                      <Button size="sm" variant="outline">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Estudiante
                      </Button>
                    </Link>
                    <Link href="/dashboard/administracion/usuarios/nuevo?role=docente">
                      <Button size="sm">
                        <School className="mr-2 h-4 w-4" />
                        Docente
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>{i === 1 ? "MM" : i === 2 ? "FC" : "AP"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {i === 1 ? "Mariano Méndez" : i === 2 ? "Francisco Cañas" : "Ana Pérez"}
                              </p>
                              <div className="flex items-center">
                                <Badge
                                  variant="outline"
                                  className={`mr-2 ${
                                    i === 1
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : i === 2
                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                        : "bg-purple-50 text-purple-700 border-purple-200"
                                  }`}
                                >
                                  {i === 1 ? "Estudiante" : i === 2 ? "Docente" : "Administrador"}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                  {i === 1 ? "4 cursos inscritos" : i === 2 ? "3 cursos asignados" : "Sistema"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Link href="/dashboard/administracion/usuarios">
                        <Button variant="outline">Ver todos los usuarios</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Estado del sistema</CardTitle>
                  <CardDescription>Monitoreo en tiempo real de la plataforma</CardDescription>
                </div>
                <Link href="/dashboard/administracion/analiticas">
                  <Button variant="outline" size="sm">
                    Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Disponibilidad del sistema</div>
                      <div className="text-sm font-medium">99.8%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "99.8%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Conexiones API 3D Lab</div>
                      <div className="text-sm font-medium">98.5%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "98.5%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Uso de recursos</div>
                      <div className="text-sm font-medium">45.2%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "45.2%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Velocidad de carga</div>
                      <div className="text-sm font-medium">1.2s</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardShell>
  )
}
