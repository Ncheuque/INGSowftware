"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Camera, Trash2, User, Mail, Building, BookOpen, FlaskRoundIcon as Flask, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  // Datos simulados del usuario
  const [userData, setUserData] = useState({
    nombre: "Ana García",
    usuario: "ana.garcia",
    email: "ana.garcia@universidad.edu",
    departamento: "Facultad de Química",
    avatar: "/placeholder.svg?height=128&width=128",
    rol: "estudiante",
  })

  // Cursos asignados simulados
  const cursosAsignados = [
    {
      id: "1",
      titulo: "Química General I",
      codigo: "QUI-101",
      profesor: "Dr. Juan Rodríguez",
      estado: "En curso",
      progreso: 65,
      labIntegration: true,
    },
    {
      id: "2",
      titulo: "Química Orgánica",
      codigo: "QUI-201",
      profesor: "Dra. María López",
      estado: "En curso",
      progreso: 42,
      labIntegration: true,
    },
    {
      id: "3",
      titulo: "Bioquímica",
      codigo: "QUI-305",
      profesor: "Dr. Carlos Martínez",
      estado: "Próximo",
      progreso: 0,
      labIntegration: false,
    },
  ]

  // Estado para manejar la carga de la imagen
  const [isUploading, setIsUploading] = useState(false)

  // Función para simular la carga de una imagen
  const handleImageUpload = () => {
    setIsUploading(true)
    // Simulamos una carga
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Imagen actualizada",
        description: "Tu foto de perfil ha sido actualizada correctamente.",
      })
    }, 1500)
  }

  // Función para eliminar la imagen de perfil
  const handleRemoveImage = () => {
    setUserData((prev) => ({
      ...prev,
      avatar: "",
    }))
    toast({
      title: "Imagen eliminada",
      description: "Tu foto de perfil ha sido eliminada.",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Mi Perfil" text="Gestiona tu información personal y revisa tus cursos" />

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="personal" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            Información Personal
          </TabsTrigger>
          <TabsTrigger value="cursos" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            Mis Cursos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Foto de Perfil</CardTitle>
                <CardDescription>Actualiza tu foto de perfil</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt="Avatar" />
                  <AvatarFallback className="text-2xl">
                    {userData.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleImageUpload} disabled={isUploading}>
                    <Camera className="mr-2 h-4 w-4" />
                    {isUploading ? "Subiendo..." : "Cambiar foto"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveImage}
                    disabled={!userData.avatar || isUploading}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Tus datos personales en la plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Input id="nombre" value={userData.nombre} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usuario">Nombre de usuario</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Input id="usuario" value={userData.usuario} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input id="email" value={userData.email} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento</Label>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <Input id="departamento" value={userData.departamento} readOnly />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Para actualizar tu información personal, contacta con el administrador del sistema.
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cursos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mis Cursos</CardTitle>
              <CardDescription>Cursos en los que estás inscrito actualmente</CardDescription>
            </CardHeader>
            <CardContent>
              {cursosAsignados.length > 0 ? (
                <div className="space-y-4">
                  {cursosAsignados.map((curso) => (
                    <div key={curso.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{curso.titulo}</h3>
                          <p className="text-sm text-muted-foreground">Código: {curso.codigo}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {curso.estado === "En curso" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <Calendar className="mr-1 h-3 w-3" /> En curso
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <Calendar className="mr-1 h-3 w-3" /> Próximo
                            </Badge>
                          )}

                          {curso.labIntegration && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              <Flask className="mr-1 h-3 w-3" /> 3D Labs
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <p className="text-sm">Profesor: {curso.profesor}</p>
                        {curso.estado === "En curso" && (
                          <div className="flex items-center gap-2">
                            <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${curso.progreso}%` }}></div>
                            </div>
                            <span className="text-xs text-muted-foreground">{curso.progreso}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No estás inscrito en ningún curso</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Actualmente no estás inscrito en ningún curso en la plataforma.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
