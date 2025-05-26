"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserPlus, Search, MoreHorizontal, Edit, Trash2, UserCog, ShieldAlert, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

// Datos de ejemplo para usuarios
const mockUsers = [
  { id: 1, name: "Ana García", email: "ana.garcia@ejemplo.com", role: "estudiante", status: "activo" },
  { id: 2, name: "Carlos Rodríguez", email: "carlos.rodriguez@ejemplo.com", role: "docente", status: "activo" },
  { id: 3, name: "María López", email: "maria.lopez@ejemplo.com", role: "administrador", status: "activo" },
  { id: 4, name: "Juan Pérez", email: "juan.perez@ejemplo.com", role: "estudiante", status: "inactivo" },
  { id: 5, name: "Laura Martínez", email: "laura.martinez@ejemplo.com", role: "docente", status: "activo" },
  { id: 6, name: "Roberto Sánchez", email: "roberto.sanchez@ejemplo.com", role: "estudiante", status: "activo" },
  { id: 7, name: "Elena Fernández", email: "elena.fernandez@ejemplo.com", role: "estudiante", status: "activo" },
  { id: 8, name: "Miguel Torres", email: "miguel.torres@ejemplo.com", role: "docente", status: "inactivo" },
]

export default function UsuariosPage() {
  const router = useRouter()
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // Verificar si el usuario es administrador
    const role = localStorage.getItem("userRole")
    setUserRole(role)

    if (role !== "administrador") {
      toast({
        title: "Acceso denegado",
        description: "Solo los administradores pueden acceder a esta sección.",
        variant: "destructive",
      })

      router.push("/dashboard")
    }
  }, [router])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteUser = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      setUsers(users.filter((user) => user.id !== id))
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado correctamente.",
      })
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "administrador":
        return (
          <Badge variant="default" className="bg-red-500 hover:bg-red-600">
            <ShieldAlert className="mr-1 h-3 w-3" /> Administrador
          </Badge>
        )
      case "docente":
        return (
          <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
            <UserCog className="mr-1 h-3 w-3" /> Docente
          </Badge>
        )
      case "estudiante":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            <GraduationCap className="mr-1 h-3 w-3" /> Estudiante
          </Badge>
        )
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "activo" ? (
      <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
        Activo
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20">
        Inactivo
      </Badge>
    )
  }

  // Si el usuario no es administrador, no mostramos nada
  if (userRole !== "administrador") {
    return null
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Administración de Usuarios</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar usuarios..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/dashboard/administracion/usuarios/nuevo">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios del Sistema</CardTitle>
          <CardDescription>
            Gestiona los usuarios de la plataforma 3D Lab LMS. Puedes crear, editar y eliminar usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/dashboard/administracion/usuarios/editar/${user.id}`)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No se encontraron usuarios que coincidan con la búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
