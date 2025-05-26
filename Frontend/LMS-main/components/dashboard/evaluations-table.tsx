"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Award, Eye, MessageSquare, FileText, FlaskConical, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo para evaluaciones
const evaluationData = {
  estudiante: {
    all: [
      {
        id: "1",
        title: "Titulación Ácido-Base",
        type: "Laboratorio",
        course: "Química General",
        date: "25/11/2023",
        score: 90,
        feedback: "Excelente ejecución de la titulación.",
      },
      {
        id: "2",
        title: "Informe Reacciones Redox",
        type: "Informe",
        course: "Química General",
        date: "05/11/2023",
        score: 85,
        feedback: "Buen análisis, falta profundizar en algunas conclusiones.",
      },
      {
        id: "3",
        title: "Equilibrio Químico",
        type: "Laboratorio",
        course: "Química Analítica",
        date: "15/10/2023",
        score: 95,
        feedback: "Análisis detallado y preciso del equilibrio.",
      },
      {
        id: "4",
        title: "Cinética de Reacciones",
        type: "Laboratorio",
        course: "Química Física",
        date: "01/10/2023",
        score: 88,
        feedback: "Buen trabajo experimental. Mejora la interpretación de gráficas.",
      },
    ],
    courses: [
      {
        id: "1",
        title: "Química General",
        labs: 4,
        reports: 4,
        averageScore: 87,
        progress: 85,
      },
      {
        id: "2",
        title: "Química Analítica",
        labs: 3,
        reports: 2,
        averageScore: 92,
        progress: 75,
      },
      {
        id: "3",
        title: "Química Orgánica",
        labs: 2,
        reports: 1,
        averageScore: 90,
        progress: 40,
      },
    ],
    progress: [
      {
        id: "1",
        skill: "Técnicas de titulación",
        description: "Capacidad para realizar titulaciones precisas",
        progress: 90,
        evaluations: 3,
      },
      {
        id: "2",
        skill: "Análisis de datos",
        description: "Habilidad para analizar e interpretar resultados experimentales",
        progress: 85,
        evaluations: 5,
      },
      {
        id: "3",
        skill: "Elaboración de informes",
        description: "Capacidad de escribir informes científicos claros y concisos",
        progress: 80,
        evaluations: 4,
      },
      {
        id: "4",
        skill: "Manejo de instrumentos",
        description: "Habilidad en el uso de instrumentos de laboratorio",
        progress: 95,
        evaluations: 6,
      },
    ],
  },
  profesor: {
    labs: [
      {
        id: "1",
        title: "Titulación Ácido-Base",
        course: "Química General",
        students: 25,
        averageScore: 85,
        completed: 20,
      },
      {
        id: "2",
        title: "Equilibrio Químico",
        course: "Química Analítica",
        students: 18,
        averageScore: 82,
        completed: 15,
      },
      {
        id: "3",
        title: "Cinética de Reacciones",
        course: "Química Física",
        students: 20,
        averageScore: 88,
        completed: 18,
      },
    ],
    reports: [
      {
        id: "1",
        title: "Informes de Titulación",
        course: "Química General",
        submitted: 22,
        evaluated: 18,
        averageScore: 84,
      },
      {
        id: "2",
        title: "Informes de Equilibrio Químico",
        course: "Química Analítica",
        submitted: 15,
        evaluated: 12,
        averageScore: 86,
      },
      {
        id: "3",
        title: "Informes de Cinética Química",
        course: "Química Física",
        submitted: 18,
        evaluated: 15,
        averageScore: 82,
      },
    ],
    students: [
      {
        id: "1",
        name: "Carlos Mendoza",
        course: "Química General",
        labsCompleted: 4,
        reportsSubmitted: 4,
        averageScore: 90,
      },
      {
        id: "2",
        name: "Ana López",
        course: "Química General",
        labsCompleted: 3,
        reportsSubmitted: 3,
        averageScore: 85,
      },
      {
        id: "3",
        name: "Miguel Torres",
        course: "Química Analítica",
        labsCompleted: 2,
        reportsSubmitted: 2,
        averageScore: 92,
      },
      {
        id: "4",
        name: "Laura Martínez",
        course: "Química Física",
        labsCompleted: 3,
        reportsSubmitted: 3,
        averageScore: 88,
      },
    ],
  },
}

interface EvaluationsTableProps {
  userRole: "estudiante" | "profesor"
  type: "all" | "courses" | "progress" | "labs" | "reports" | "students"
}

export function EvaluationsTable({ userRole, type }: EvaluationsTableProps) {
  const [data, setData] = useState(() => {
    if (userRole === "estudiante") {
      return evaluationData.estudiante[type as keyof typeof evaluationData.estudiante]
    } else {
      return evaluationData.profesor[type as keyof typeof evaluationData.profesor]
    }
  })

  // Renderizar tabla según el rol y tipo
  if (userRole === "estudiante") {
    if (type === "all") {
      return (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evaluación</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {item.type === "Laboratorio" ? (
                        <FlaskConical className="h-4 w-4 text-primary" />
                      ) : (
                        <FileText className="h-4 w-4 text-primary" />
                      )}
                      <span>{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.type === "Laboratorio"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-purple-50 text-purple-700 border-purple-200"
                      }
                    >
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Award className="mr-1 h-3 w-3" /> {item.score}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link
                          href={`/dashboard/${item.type === "Laboratorio" ? "laboratorios" : "informes"}/${item.id}`}
                        >
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver detalles</span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Ver retroalimentación</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    } else if (type === "courses") {
      return (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead>Laboratorios</TableHead>
                <TableHead>Informes</TableHead>
                <TableHead>Calificación Media</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.labs}</TableCell>
                  <TableCell>{item.reports}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Award className="mr-1 h-3 w-3" /> {item.averageScore}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={item.progress} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground">{item.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    } else if (type === "progress") {
      return (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competencia</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead>Evaluaciones</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span>{item.skill}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="text-sm text-muted-foreground">{item.description}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={item.progress} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground">{item.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.evaluations}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }
  } else if (userRole === "profesor") {
    if (type === "labs") {
      return (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Laboratorio</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Estudiantes</TableHead>
                <TableHead>Completados</TableHead>
                <TableHead>Calificación Media</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FlaskConical className="h-4 w-4 text-primary" />
                      <span>{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.students}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(item.completed / item.students) * 100} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground">
                        {item.completed}/{item.students}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Award className="mr-1 h-3 w-3" /> {item.averageScore}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    } else if (type === "reports") {
      return (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Informes</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Enviados</TableHead>
                <TableHead>Evaluados</TableHead>
                <TableHead>Calificación Media</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.submitted}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(item.evaluated / item.submitted) * 100} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground">
                        {item.evaluated}/{item.submitted}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Award className="mr-1 h-3 w-3" /> {item.averageScore}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    } else if (type === "students") {
      return (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Laboratorios Completados</TableHead>
                <TableHead>Informes Enviados</TableHead>
                <TableHead>Calificación Media</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.labsCompleted}</TableCell>
                  <TableCell>{item.reportsSubmitted}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Award className="mr-1 h-3 w-3" /> {item.averageScore}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/estudiantes/${item.id}`}>
                      <Button variant="ghost" size="sm">
                        Ver perfil
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }
  }

  return <div>No hay datos disponibles.</div>
}
