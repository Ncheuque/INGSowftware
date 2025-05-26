"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  FileText,
  Download,
  Eye,
  Pencil,
  Check,
  FlaskConical,
  MessageSquare,
  Award,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Datos de ejemplo para informes
const reportData = {
  estudiante: [
    {
      id: "1",
      title: "Informe de Titulación Ácido-Base",
      lab: "Titulación Ácido-Base",
      date: "15/11/2023",
      status: "pendiente",
      score: null,
      feedback: null,
    },
    {
      id: "2",
      title: "Informe de Equilibrio Químico",
      lab: "Equilibrio Químico",
      date: "02/11/2023",
      status: "evaluado",
      score: 85,
      feedback: "Buen trabajo. Mejora la discusión de resultados.",
    },
    {
      id: "3",
      title: "Informe de Reacciones Redox",
      lab: "Reacciones Redox",
      date: "25/10/2023",
      status: "evaluado",
      score: 92,
      feedback: "Excelente análisis y conclusiones.",
    },
    {
      id: "4",
      title: "Informe de Cinética Química",
      lab: "Cinética de Reacciones",
      date: "10/10/2023",
      status: "borrador",
      score: null,
      feedback: null,
    },
  ],
  profesor: [
    {
      id: "1",
      title: "Informe de Titulación Ácido-Base",
      student: "Carlos Mendoza",
      lab: "Titulación Ácido-Base",
      date: "15/11/2023",
      status: "pendiente",
      score: null,
      feedback: null,
    },
    {
      id: "2",
      title: "Informe de Equilibrio Químico",
      student: "Ana López",
      lab: "Equilibrio Químico",
      date: "02/11/2023",
      status: "evaluado",
      score: 85,
      feedback: "Buen trabajo. Mejora la discusión de resultados.",
    },
    {
      id: "3",
      title: "Informe de Termodinámica",
      student: "Miguel Torres",
      lab: "Termodinámica Química",
      date: "05/11/2023",
      status: "pendiente",
      score: null,
      feedback: null,
    },
    {
      id: "4",
      title: "Informe de Electroquímica",
      student: "Laura Martínez",
      lab: "Electroquímica",
      date: "10/11/2023",
      status: "pendiente",
      score: null,
      feedback: null,
    },
    {
      id: "5",
      title: "Informe de Reacciones Redox",
      student: "Pedro Gómez",
      lab: "Reacciones Redox",
      date: "28/10/2023",
      status: "evaluado",
      score: 78,
      feedback: "Faltan algunos cálculos importantes.",
    },
  ],
}

interface ReportsTableProps {
  userRole: "estudiante" | "profesor"
  status: "pendiente" | "evaluado" | "borrador" | "enviado" | "todos"
}

export function ReportsTable({ userRole, status }: ReportsTableProps) {
  const [reports, setReports] = useState(() => {
    const data = userRole === "estudiante" ? reportData.estudiante : reportData.profesor

    if (status === "todos") return data

    // Para estudiantes, "enviado" incluye tanto pendientes como evaluados
    if (userRole === "estudiante" && status === "enviado") {
      return data.filter((report) => report.status === "pendiente" || report.status === "evaluado")
    }

    return data.filter((report) => report.status === status)
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Informe</TableHead>
            {userRole === "profesor" && <TableHead>Estudiante</TableHead>}
            <TableHead className="w-[200px]">Laboratorio</TableHead>
            <TableHead className="w-[120px]">Fecha de entrega</TableHead>
            <TableHead className="w-[150px]">Estado</TableHead>
            {status === "evaluado" && <TableHead className="w-[120px]">Calificación</TableHead>}
            <TableHead className="text-right w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="truncate">{report.title}</span>
                  </div>
                </TableCell>
                {userRole === "profesor" && <TableCell>{report.student}</TableCell>}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{report.lab}</span>
                  </div>
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.status === "pendiente" ? "secondary" : report.status === "evaluado" ? "default" : "outline"
                    }
                    className={
                      report.status === "pendiente"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : report.status === "evaluado"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                    }
                  >
                    {report.status === "pendiente"
                      ? "Pendiente de revisión"
                      : report.status === "evaluado"
                        ? "Evaluado"
                        : "Borrador"}
                  </Badge>
                </TableCell>
                {status === "evaluado" && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        <Award className="mr-1 h-3 w-3" /> {report.score}%
                      </Badge>
                    </div>
                  </TableCell>
                )}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/dashboard/informes/${report.id}`}>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver informe</span>
                        </DropdownMenuItem>
                      </Link>
                      {userRole === "estudiante" && report.status === "borrador" && (
                        <Link href={`/dashboard/informes/${report.id}/editar`}>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Editar informe</span>
                          </DropdownMenuItem>
                        </Link>
                      )}
                      {userRole === "profesor" && report.status === "pendiente" && (
                        <Link href={`/dashboard/informes/${report.id}/evaluar`}>
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4" />
                            <span>Evaluar informe</span>
                          </DropdownMenuItem>
                        </Link>
                      )}
                      {report.status === "evaluado" && (
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Ver retroalimentación</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Descargar PDF</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={userRole === "profesor" ? 7 : 6} className="h-24 text-center">
                No hay informes {status === "pendiente" ? "pendientes" : status === "evaluado" ? "evaluados" : ""}{" "}
                disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
