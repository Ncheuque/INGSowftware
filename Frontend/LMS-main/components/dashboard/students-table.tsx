"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, UserPlus, Mail, MessageSquare, UserX, FileText, Award, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo
const students = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    courses: 3,
    status: "active",
    lastActive: "Hace 2 horas",
    progress: 75,
    avatar: "/placeholder.svg?height=32&width=32&text=JP",
    grade: 85,
  },
  {
    id: "2",
    name: "María López",
    email: "maria.lopez@example.com",
    courses: 5,
    status: "active",
    lastActive: "Hace 1 día",
    progress: 92,
    avatar: "/placeholder.svg?height=32&width=32&text=ML",
    grade: 92,
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    courses: 2,
    status: "inactive",
    lastActive: "Hace 2 semanas",
    progress: 45,
    avatar: "/placeholder.svg?height=32&width=32&text=CR",
    grade: 68,
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    courses: 4,
    status: "active",
    lastActive: "Hace 3 horas",
    progress: 88,
    avatar: "/placeholder.svg?height=32&width=32&text=AM",
    grade: 90,
  },
  {
    id: "5",
    name: "Pedro González",
    email: "pedro.gonzalez@example.com",
    courses: 1,
    status: "pending",
    lastActive: "Nunca",
    progress: 0,
    avatar: "/placeholder.svg?height=32&width=32&text=PG",
    grade: null,
  },
  {
    id: "6",
    name: "Laura Sánchez",
    email: "laura.sanchez@example.com",
    courses: 6,
    status: "active",
    lastActive: "Hace 5 minutos",
    progress: 95,
    avatar: "/placeholder.svg?height=32&width=32&text=LS",
    grade: 95,
  },
  {
    id: "7",
    name: "Miguel Torres",
    email: "miguel.torres@example.com",
    courses: 2,
    status: "active",
    lastActive: "Hace 1 hora",
    progress: 65,
    avatar: "/placeholder.svg?height=32&width=32&text=MT",
    grade: 78,
  },
  {
    id: "8",
    name: "Sofía Ramírez",
    email: "sofia.ramirez@example.com",
    courses: 3,
    status: "inactive",
    lastActive: "Hace 1 mes",
    progress: 30,
    avatar: "/placeholder.svg?height=32&width=32&text=SR",
    grade: 60,
  },
]

interface StudentsTableProps {
  courseId?: string
  userRole?: "estudiante" | "profesor"
}

export function StudentsTable({ courseId, userRole = "estudiante" }: StudentsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  const filteredStudents = students.filter(
    (student) =>
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || student.status === statusFilter),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      default:
        return ""
    }
  }

  const getStatusName = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      case "pending":
        return "Pendiente"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-full sm:w-[300px]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
            </SelectContent>
          </Select>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode("table")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-list"
                  >
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3" y1="6" y2="6" />
                    <line x1="3" x2="3" y1="12" y2="12" />
                    <line x1="3" x2="3" y1="18" y2="18" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Vista de tabla</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-grid"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Vista de cuadrícula</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Solo mostrar botón de añadir estudiante para profesores */}
          {userRole === "profesor" && (
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Añadir estudiante
            </Button>
          )}
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                {!courseId && <TableHead>Cursos</TableHead>}
                <TableHead>Estado</TableHead>
                <TableHead>Última actividad</TableHead>
                {courseId && <TableHead>Progreso</TableHead>}
                {courseId && <TableHead>Calificación</TableHead>}
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <TableCell className="font-medium p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-primary/10">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium hover:text-primary transition-colors cursor-pointer">
                          {student.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{student.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  {!courseId && <TableCell>{student.courses}</TableCell>}
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(student.status)}>
                      {getStatusName(student.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.lastActive}</TableCell>
                  {courseId && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{student.progress}%</span>
                      </div>
                    </TableCell>
                  )}
                  {courseId && (
                    <TableCell>
                      {student.grade ? (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          <Award className="mr-1 h-3 w-3" /> {student.grade}%
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Sin calificar</span>
                      )}
                    </TableCell>
                  )}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Ver perfil</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver perfil</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {userRole === "profesor" && (
                        <>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Mail className="h-4 w-4" />
                                  <span className="sr-only">Enviar correo</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Enviar correo</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Ver detalles</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Enviar correo</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span>Enviar mensaje</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Ver informes</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center text-destructive">
                                <UserX className="mr-2 h-4 w-4" />
                                <span>Eliminar del curso</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden h-full flex flex-col group">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="h-16 w-16 mb-3 border-2 border-primary/10">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback className="text-lg">{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-base group-hover:text-primary transition-colors">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>

                    <Badge variant="outline" className={`mt-2 ${getStatusColor(student.status)}`}>
                      {getStatusName(student.status)}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Última actividad:</span>
                      <span>{student.lastActive}</span>
                    </div>

                    {courseId && (
                      <>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progreso:</span>
                            <span>{student.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Calificación:</span>
                          <span>
                            {student.grade ? (
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                <Award className="mr-1 h-3 w-3" /> {student.grade}%
                              </Badge>
                            ) : (
                              "Sin calificar"
                            )}
                          </span>
                        </div>
                      </>
                    )}

                    {!courseId && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cursos:</span>
                        <span>{student.courses}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="mr-1 h-3 w-3" />
                      Ver perfil
                    </Button>
                    {userRole === "profesor" && (
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="mr-1 h-3 w-3" />
                        Contactar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
