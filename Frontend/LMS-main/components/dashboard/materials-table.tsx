"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Search,
  FileText,
  Video,
  ImageIcon,
  File,
  Atom,
  Download,
  Eye,
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo para materiales de química
const materials = [
  {
    id: "1",
    name: "Introducción a la Tabla Periódica",
    type: "video",
    course: "Química General I",
    size: "120 MB",
    uploadedAt: "12/04/2023",
    description: "Video explicativo sobre la organización y propiedades de la tabla periódica de los elementos.",
    downloads: 45,
  },
  {
    id: "2",
    name: "Guía de Nomenclatura Química",
    type: "pdf",
    course: "Química General I",
    size: "5 MB",
    uploadedAt: "15/04/2023",
    description: "Manual completo con reglas de nomenclatura para compuestos inorgánicos y orgánicos.",
    downloads: 78,
  },
  {
    id: "3",
    name: "Simulación de Reacciones Ácido-Base",
    type: "3d",
    course: "Química Analítica",
    size: "45 MB",
    uploadedAt: "20/04/2023",
    description: "Modelo 3D interactivo para visualizar y manipular reacciones ácido-base.",
    downloads: 32,
  },
  {
    id: "4",
    name: "Tutorial de Balanceo de Ecuaciones",
    type: "video",
    course: "Química General I",
    size: "250 MB",
    uploadedAt: "25/04/2023",
    description: "Video tutorial paso a paso para aprender a balancear ecuaciones químicas.",
    downloads: 56,
  },
  {
    id: "5",
    name: "Imágenes de Estructuras Moleculares",
    type: "image",
    course: "Química Orgánica",
    size: "80 MB",
    uploadedAt: "28/04/2023",
    description: "Colección de imágenes de alta resolución de estructuras moleculares orgánicas.",
    downloads: 41,
  },
  {
    id: "6",
    name: "Ejercicios de Estequiometría",
    type: "pdf",
    course: "Química General I",
    size: "3 MB",
    uploadedAt: "02/05/2023",
    description: "Conjunto de problemas resueltos y por resolver sobre cálculos estequiométricos.",
    downloads: 92,
  },
  {
    id: "7",
    name: "Modelo 3D de Orbitales Atómicos",
    type: "3d",
    course: "Química General I",
    size: "60 MB",
    uploadedAt: "05/05/2023",
    description: "Modelo interactivo en 3D para visualizar y comprender los orbitales atómicos.",
    downloads: 38,
  },
  {
    id: "8",
    name: "Guía de Laboratorio: Titulación",
    type: "pdf",
    course: "Química Analítica",
    size: "15 MB",
    uploadedAt: "10/05/2023",
    description: "Instrucciones detalladas para realizar experimentos de titulación en el laboratorio.",
    downloads: 65,
  },
]

interface MaterialsTableProps {
  courseId?: string
  userRole?: "estudiante" | "profesor"
}

export function MaterialsTable({ courseId, userRole = "estudiante" }: MaterialsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  const filteredMaterials = materials.filter(
    (material) =>
      (material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (courseId ? material.course === materials.find((m) => m.id === courseId)?.course : true) &&
      (typeFilter === "all" || material.type === typeFilter),
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "3d":
        return <Atom className="h-4 w-4 text-green-500" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-purple-500" />
      default:
        return <File className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "pdf":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "3d":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "image":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case "video":
        return "Video"
      case "pdf":
        return "PDF"
      case "3d":
        return "Modelo 3D"
      case "image":
        return "Imagen"
      default:
        return "Otro"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar materiales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-full sm:w-[300px]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="3d">Modelo 3D</SelectItem>
              <SelectItem value="image">Imagen</SelectItem>
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
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                {!courseId && <TableHead>Curso</TableHead>}
                <TableHead>Tamaño</TableHead>
                <TableHead>Fecha de subida</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material, index) => (
                  <motion.tr
                    key={material.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <TableCell className="font-medium p-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(material.type)}
                        <div>
                          <span className="font-medium hover:text-primary transition-colors cursor-pointer">
                            {material.name}
                          </span>
                          <p className="text-xs text-muted-foreground line-clamp-1">{material.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(material.type)}>
                        {getTypeName(material.type)}
                      </Badge>
                    </TableCell>
                    {!courseId && <TableCell>{material.course}</TableCell>}
                    <TableCell>{material.size}</TableCell>
                    <TableCell>{material.uploadedAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Ver</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Ver material</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Descargar</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Descargar material</p>
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
                              <Download className="mr-2 h-4 w-4" />
                              <span>Descargar</span>
                            </DropdownMenuItem>
                            {/* Solo mostrar opciones de edición para profesores */}
                            {userRole === "profesor" && (
                              <>
                                <DropdownMenuItem className="flex items-center">
                                  <Pencil className="mr-2 h-4 w-4" />
                                  <span>Editar</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Eliminar</span>
                                </DropdownMenuItem>
                              </>
                            )}
                            {material.type === "3d" && (
                              <DropdownMenuItem className="flex items-center">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                <span>Abrir en 3D Labs</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={courseId ? 5 : 6} className="h-24 text-center">
                    No se encontraron materiales.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden h-full flex flex-col group">
                  <CardContent className="p-0">
                    <div className="p-4 flex flex-col h-full">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center
                          ${
                            material.type === "pdf"
                              ? "bg-red-500/10"
                              : material.type === "video"
                                ? "bg-blue-500/10"
                                : material.type === "3d"
                                  ? "bg-green-500/10"
                                  : "bg-purple-500/10"
                          }`}
                        >
                          {getTypeIcon(material.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                            {material.name}
                          </h4>
                          <Badge variant="outline" className={getTypeColor(material.type)}>
                            {getTypeName(material.type)}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                        {material.description}
                      </p>

                      <div className="flex justify-between text-xs text-muted-foreground mb-4">
                        <div>Tamaño: {material.size}</div>
                        <div>{material.downloads} descargas</div>
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="mr-1 h-3 w-3" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-1 h-3 w-3" />
                          Descargar
                        </Button>
                        {material.type === "3d" && (
                          <Button variant="outline" size="sm" className="w-9 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-32 border rounded-md">
              <p className="text-muted-foreground">No se encontraron materiales.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
