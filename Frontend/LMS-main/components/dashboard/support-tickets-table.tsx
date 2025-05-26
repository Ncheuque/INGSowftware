"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo
const tickets = [
  {
    id: "1",
    title: "Problema al acceder al curso",
    user: "Juan Pérez",
    email: "juan.perez@example.com",
    status: "open",
    priority: "high",
    createdAt: "Hace 2 horas",
  },
  {
    id: "2",
    title: "Error al subir material",
    user: "María López",
    email: "maria.lopez@example.com",
    status: "in-progress",
    priority: "medium",
    createdAt: "Hace 1 día",
  },
  {
    id: "3",
    title: "Solicitud de información sobre certificados",
    user: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    status: "closed",
    priority: "low",
    createdAt: "Hace 2 semanas",
  },
  {
    id: "4",
    title: "Problema con la reproducción de videos",
    user: "Ana Martínez",
    email: "ana.martinez@example.com",
    status: "open",
    priority: "high",
    createdAt: "Hace 3 horas",
  },
  {
    id: "5",
    title: "Consulta sobre métodos de pago",
    user: "Pedro González",
    email: "pedro.gonzalez@example.com",
    status: "in-progress",
    priority: "medium",
    createdAt: "Hace 2 días",
  },
  {
    id: "6",
    title: "Solicitud de reembolso",
    user: "Laura Sánchez",
    email: "laura.sanchez@example.com",
    status: "closed",
    priority: "high",
    createdAt: "Hace 1 semana",
  },
]

export function SupportTicketsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px] lg:w-[300px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Exportar
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{ticket.title}</span>
                    <span className="text-xs text-muted-foreground">#{ticket.id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&text=${ticket.user.charAt(0)}`}
                        alt={ticket.user}
                      />
                      <AvatarFallback>{ticket.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{ticket.user}</span>
                      <span className="text-xs text-muted-foreground">{ticket.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.status === "open" ? "default" : ticket.status === "in-progress" ? "secondary" : "outline"
                    }
                  >
                    {ticket.status === "open" ? "Abierto" : ticket.status === "in-progress" ? "En progreso" : "Cerrado"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      ticket.priority === "high"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : ticket.priority === "medium"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-green-50 text-green-700 border-green-200"
                    }
                  >
                    {ticket.priority === "high" ? "Alta" : ticket.priority === "medium" ? "Media" : "Baja"}
                  </Badge>
                </TableCell>
                <TableCell>{ticket.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                      <DropdownMenuItem>Responder</DropdownMenuItem>
                      <DropdownMenuItem>Asignar</DropdownMenuItem>
                      <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cerrar ticket</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
