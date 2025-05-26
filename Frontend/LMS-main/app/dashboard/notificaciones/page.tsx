"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { NotificationItem } from "@/components/notifications/notification-item"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, Trash2, Clock, FlaskConical, FileCheck, Award, MessageSquare } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { Notification } from "@/components/notifications/notification-center"

// Datos de ejemplo para notificaciones
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nuevo laboratorio disponible",
    description: "El laboratorio 'Titulación Ácido-Base' ya está disponible para realizar.",
    time: "Hace 10 minutos",
    read: false,
    type: "lab",
    actionUrl: "/dashboard/laboratorios/1",
    sender: {
      name: "Sistema",
      role: "system",
    },
  },
  {
    id: "2",
    title: "Informe calificado",
    description: "Tu informe 'Reacciones Redox' ha sido calificado con 90/100.",
    time: "Hace 2 horas",
    read: false,
    type: "evaluation",
    actionUrl: "/dashboard/evaluaciones",
    sender: {
      name: "Dra. Laura Martínez",
      avatar: "/placeholder.svg?height=40&width=40&text=LM",
      role: "teacher",
    },
  },
  {
    id: "3",
    title: "Recordatorio de entrega",
    description: "El informe de 'Equilibrio Químico' debe ser entregado en 2 días.",
    time: "Hace 5 horas",
    read: true,
    type: "report",
    actionUrl: "/dashboard/informes",
    sender: {
      name: "Sistema",
      role: "system",
    },
  },
  {
    id: "4",
    title: "Comentario en tu informe",
    description: "El profesor ha dejado un comentario en tu informe de 'Cinética Química'.",
    time: "Ayer",
    read: true,
    type: "message",
    actionUrl: "/dashboard/informes/2",
    sender: {
      name: "Dr. Carlos Rodríguez",
      avatar: "/placeholder.svg?height=40&width=40&text=CR",
      role: "teacher",
    },
  },
  {
    id: "5",
    title: "Nueva evaluación disponible",
    description: "Se ha publicado una nueva evaluación para el laboratorio 'Electroquímica'.",
    time: "Hace 2 días",
    read: true,
    type: "evaluation",
    actionUrl: "/dashboard/evaluaciones",
    sender: {
      name: "Sistema",
      role: "system",
    },
  },
]

export default function NotificacionesPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Cargar notificaciones (simulando una API)
  useEffect(() => {
    // En un entorno real, esto sería una llamada a la API
    setTimeout(() => {
      setNotifications(mockNotifications)
    }, 500)
  }, [])

  // Marcar como leída/no leída
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: !notification.read } : notification,
      ),
    )
    toast({
      title: "Notificación actualizada",
      description: "El estado de la notificación ha sido actualizado",
    })
  }

  // Eliminar notificación
  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    toast({
      title: "Notificación eliminada",
      description: "La notificación ha sido eliminada",
    })
  }

  // Marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "Todas las notificaciones marcadas como leídas",
      description: "Has marcado todas tus notificaciones como leídas",
    })
  }

  // Eliminar todas las notificaciones
  const deleteAll = () => {
    setNotifications([])
    toast({
      title: "Notificaciones eliminadas",
      description: "Has eliminado todas tus notificaciones",
    })
  }

  // Filtrar notificaciones
  const getFilteredNotifications = () => {
    return notifications.filter((notification) => {
      // Filtrar por tipo
      const matchesFilter =
        filter === "all" || (filter === "unread" && !notification.read) || notification.type === filter

      return matchesFilter
    })
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <DashboardShell>
      <DashboardHeader heading="Notificaciones" text="Gestiona todas tus notificaciones y alertas">
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Marcar todas como leídas
          </Button>
          <Button variant="outline" onClick={deleteAll}>
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar todas
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          {/* Barra de búsqueda eliminada para mantener consistencia con otras páginas */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {notifications.filter((n) => !n.read).length} no leídas
            </span>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-7 lg:w-[700px]">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Todas</span>
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">No leídas</span>
            </TabsTrigger>
            <TabsTrigger value="lab" className="flex items-center gap-1">
              <FlaskConical className="h-4 w-4" />
              <span className="hidden sm:inline">Laboratorios</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-1">
              <FileCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Informes</span>
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Evaluaciones</span>
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Mensajes</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Sistema</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredNotifications.length > 0 ? (
              <div>
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay notificaciones</h3>
                <p className="text-sm text-muted-foreground mt-2">No tienes notificaciones en este momento.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="mt-6">
            {filteredNotifications.length > 0 ? (
              <div>
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Check className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay notificaciones sin leer</h3>
                <p className="text-sm text-muted-foreground mt-2">Has leído todas tus notificaciones.</p>
              </div>
            )}
          </TabsContent>

          {/* Contenido similar para las otras pestañas */}
          {["lab", "report", "evaluation", "message", "info"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="mt-6">
              {filteredNotifications.length > 0 ? (
                <div>
                  {filteredNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No hay notificaciones</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    No tienes notificaciones de este tipo en este momento.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardShell>
  )
}
