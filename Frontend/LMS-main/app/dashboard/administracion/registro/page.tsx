"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus, School, Users, Search } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function RegistroUsuariosPage() {
  const [activeTab, setActiveTab] = useState("estudiantes")

  // Datos de ejemplo para estudiantes
  const estudiantes = [
    {
      id: "1",
      nombre: "Mariano Méndez",
      email: "mariano.mendez@ejemplo.com",
      cursos: 4,
      estado: "activo",
      fechaRegistro: "15/03/2023",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciales: "MM",
    },
    {
      id: "2",
      nombre: "Laura Rodríguez",
      email: "laura.rodriguez@ejemplo.com",
      cursos: 3,
      estado: "activo",
      fechaRegistro: "22/04/2023",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciales: "LR",
    },
    {
      id: "3",
      nombre: "Carlos Jiménez",
      email: "carlos.jimenez@ejemplo.com",
      cursos: 2,
      estado: "inactivo",
      fechaRegistro: "10/01/2023",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciales: "CJ",
    },
    {
      id: "4",
      nombre: "Ana Pérez",
      email: "ana.perez@ejemplo.com",
      cursos: 5,
      estado: "activo",
      fechaRegistro: "05/02/2023",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciales: "AP",
    },
    {
      id: "5",
      nombre: "Juan Díaz",
      email: "juan.diaz@ejemplo.com",
      cursos: 1,
      estado: "pendiente",
      fechaRegistro: "30/05/2023",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciales: "JD",
    },
  ]

  // Datos de ejemplo para docentes
  const docentes = [
    {
      id: "1",
      nombre: "Dr. Francisco Cañas",
      email: "francisco.canas@ejemplo.com",
      departamento: "Química General",
      cursos: 3,
      estado: "activo",
      fechaRegistro: "10/01/2022",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciales: "FC",
    },
    {
      id: "2",
      nombre: "Dra. María González",
      email: "maria.gonzalez@ejemplo.com",
      departamento: "Química Orgánica",
      cursos: 2,
      estado: "activo",
      fechaRegistro: "15/02/2022",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciales: "MG",
    },
    {
      id: "3",
      nombre: "Dr. Roberto Vega",
      email: "roberto.vega@ejemplo.com",
      departamento: "Fisicoquímica",
      cursos: 4,
      estado: "activo",
      fechaRegistro: "20/03/2022",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciales: "RV",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Registro de Usuarios"
        text="Gestiona los usuarios de la plataforma, registra nuevos estudiantes y docentes."
      >
        <div className="flex gap-2">
          <Link href="/dashboard/administracion/registro/nuevo?role=estudiante">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Estudiante
            </Button>
          </Link>
          <Link href="/dashboard/administracion/registro/nuevo?role=docente">
            <Button variant="outline">
              <School className="mr-2 h-4 w-4" />
              Nuevo Docente
            </Button>
          </Link>
        </div>
      </DashboardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="estudiantes" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Estudiantes
            </TabsTrigger>
            <TabsTrigger value="docentes" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              Docentes
            </TabsTrigger>
          </TabsList>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar usuarios..." className="w-[250px] pl-8" />
          </div>
        </div>

        <TabsContent value="estudiantes">
          <Card>
            <CardHeader>
              <CardTitle>Estudiantes Registrados</CardTitle>
              <CardDescription>
                Lista de estudiantes registrados en la plataforma. Puedes gestionar sus datos y accesos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {estudiantes.map((estudiante) => (
                  <div
                    key={estudiante.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={estudiante.avatar || "/placeholder.svg"} alt={estudiante.nombre} />
                        <AvatarFallback>{estudiante.iniciales}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{estudiante.nombre}</p>
                        <p className="text-sm text-muted-foreground">{estudiante.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <p>{estudiante.cursos} cursos inscritos</p>
                        <p className="text-muted-foreground">Registro: {estudiante.fechaRegistro}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          estudiante.estado === "activo"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : estudiante.estado === "inactivo"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {estudiante.estado === "activo"
                          ? "Activo"
                          : estudiante.estado === "inactivo"
                            ? "Inactivo"
                            : "Pendiente"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Mostrando 5 de 230 estudiantes</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="docentes">
          <Card>
            <CardHeader>
              <CardTitle>Docentes Registrados</CardTitle>
              <CardDescription>
                Lista de docentes registrados en la plataforma. Puedes gestionar sus datos y permisos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {docentes.map((docente) => (
                  <div
                    key={docente.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={docente.avatar || "/placeholder.svg"} alt={docente.nombre} />
                        <AvatarFallback>{docente.iniciales}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{docente.nombre}</p>
                        <p className="text-sm text-muted-foreground">{docente.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <p>{docente.departamento}</p>
                        <p className="text-muted-foreground">{docente.cursos} cursos asignados</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          docente.estado === "activo"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : docente.estado === "inactivo"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {docente.estado === "activo"
                          ? "Activo"
                          : docente.estado === "inactivo"
                            ? "Inactivo"
                            : "Pendiente"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Mostrando 3 de 18 docentes</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
