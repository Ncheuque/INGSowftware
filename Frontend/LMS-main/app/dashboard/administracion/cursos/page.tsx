"use client"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Search, PlusCircle, UserPlus, Edit, Trash2, Users, Calendar } from "lucide-react"
import Link from "next/link"

export default function GestionCursosPage() {
  // Datos de ejemplo para cursos
  const cursos = [
    {
      id: "1",
      nombre: "Química General I",
      codigo: "QUI-101",
      profesor: "Dr. Francisco Cañas",
      profesorAvatar: "/placeholder.svg?height=40&width=40",
      profesorIniciales: "FC",
      estudiantes: 45,
      estado: "activo",
      fechaInicio: "15/02/2023",
      fechaFin: "30/06/2023",
    },
    {
      id: "2",
      nombre: "Química Orgánica",
      codigo: "QUI-201",
      profesor: "Dra. María González",
      profesorAvatar: "/placeholder.svg?height=40&width=40",
      profesorIniciales: "MG",
      estudiantes: 32,
      estado: "activo",
      fechaInicio: "15/02/2023",
      fechaFin: "30/06/2023",
    },
    {
      id: "3",
      nombre: "Fisicoquímica",
      codigo: "QUI-301",
      profesor: "Dr. Roberto Vega",
      profesorAvatar: "/placeholder.svg?height=40&width=40",
      profesorIniciales: "RV",
      estudiantes: 28,
      estado: "activo",
      fechaInicio: "15/02/2023",
      fechaFin: "30/06/2023",
    },
    {
      id: "4",
      nombre: "Química Analítica",
      codigo: "QUI-202",
      profesor: "Dr. Carlos Mendoza",
      profesorAvatar: "/placeholder.svg?height=40&width=40",
      profesorIniciales: "CM",
      estudiantes: 35,
      estado: "inactivo",
      fechaInicio: "01/08/2023",
      fechaFin: "15/12/2023",
    },
    {
      id: "5",
      nombre: "Bioquímica",
      codigo: "QUI-401",
      profesor: "Dra. Ana Pérez",
      profesorAvatar: "/placeholder.svg?height=40&width=40",
      profesorIniciales: "AP",
      estudiantes: 25,
      estado: "pendiente",
      fechaInicio: "01/08/2023",
      fechaFin: "15/12/2023",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gestión de Cursos"
        text="Administra los cursos de la plataforma, asigna profesores y estudiantes."
      >
        <Link href="/dashboard/administracion/cursos/nuevo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Curso
          </Button>
        </Link>
      </DashboardHeader>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-primary/10 text-primary">
            Todos
          </Button>
          <Button variant="outline" size="sm">
            Activos
          </Button>
          <Button variant="outline" size="sm">
            Inactivos
          </Button>
          <Button variant="outline" size="sm">
            Pendientes
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar cursos..." className="w-[250px] pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cursos Registrados</CardTitle>
          <CardDescription>
            Lista de cursos disponibles en la plataforma. Puedes gestionar sus datos, profesores y estudiantes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cursos.map((curso) => (
              <div
                key={curso.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{curso.nombre}</p>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        {curso.codigo}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarImage src={curso.profesorAvatar || "/placeholder.svg"} alt={curso.profesor} />
                          <AvatarFallback>{curso.profesorIniciales}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{curso.profesor}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{curso.estudiantes} estudiantes</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {curso.fechaInicio} - {curso.fechaFin}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      curso.estado === "activo"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : curso.estado === "inactivo"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                  >
                    {curso.estado === "activo" ? "Activo" : curso.estado === "inactivo" ? "Inactivo" : "Pendiente"}
                  </Badge>
                  <Link href={`/dashboard/administracion/cursos/${curso.id}/asignar`}>
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Mostrando 5 de 12 cursos</div>
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
    </DashboardShell>
  )
}
