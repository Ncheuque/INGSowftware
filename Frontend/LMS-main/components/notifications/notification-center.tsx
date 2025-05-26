"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"

// Tipos para las notificaciones
export interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error" | "lab" | "report" | "evaluation" | "message"
  actionUrl?: string
  sender?: {
    name: string
    avatar?: string
    role: "system" | "student" | "teacher" | "admin"
  }
}

// Props para el componente
interface NotificationCenterProps {
  initialNotifications?: Notification[]
  onMarkAllAsRead?: () => void
  onClearAll?: () => void
  onNotificationClick?: (notification: Notification) => void
}

export function NotificationCenter({
  initialNotifications,
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick,
}: NotificationCenterProps) {
  // Estado para las notificaciones
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications || [])
  const [unreadCount, setUnreadCount] = useState(0)
  const [filter, setFilter] = useState<string>("all")

  // Calcular el número de notificaciones no leídas
  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications])

  // Función para marcar una notificación como leída
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Función para marcar todas las notificaciones como leídas
  const markAllAsReadHandler = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    if (onMarkAllAsRead) onMarkAllAsRead()
    toast({
      title: "Todas las notificaciones marcadas como leídas",
      description: "Has marcado todas tus notificaciones como leídas",
    })
  }

  // Función para eliminar todas las notificaciones
  const clearAllHandler = () => {
    setNotifications([])
    if (onClearAll) onClearAll()
    toast({
      title: "Notificaciones eliminadas",
      description: "Has eliminado todas tus notificaciones",
    })
  }

  // Función para manejar el clic en una notificación
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (onNotificationClick) onNotificationClick(notification)
  }

  // Filtrar notificaciones según el filtro seleccionado
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.type === filter
  })

  // Obtener el icono según el tipo de notificación
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Bell className="h-4 w-4" />
          </div>
        )
      case "success":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Check className="h-4 w-4" />
          </div>
        )
      case "warning":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            <Bell className="h-4 w-4" />
          </div>
        )
      case "error":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Bell className="h-4 w-4" />
          </div>
        )
      case "lab":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <Bell className="h-4 w-4" />
          </div>
        )
      case "report":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <Bell className="h-4 w-4" />
          </div>
        )
      case "evaluation":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Bell className="h-4 w-4" />
          </div>
        )
      case "message":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600">
            <Bell className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Bell className="h-4 w-4" />
          </div>
        )
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notificaciones</span>
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notificaciones</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {unreadCount} nuevas
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filtrar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter("all")}>Todas</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("unread")}>No leídas</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter("lab")}>Laboratorios</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("report")}>Informes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("evaluation")}>Evaluaciones</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("message")}>Mensajes</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Más opciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={markAllAsReadHandler}>Marcar todas como leídas</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearAllHandler} className="text-destructive">
                  Eliminar todas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Tabs defaultValue="all">
          <div className="border-b px-1">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-3 py-1.5 text-sm data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Todas
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="rounded-none border-b-2 border-transparent px-3 py-1.5 text-sm data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                No leídas
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="m-0">
            {filteredNotifications.length > 0 ? (
              <ScrollArea className="h-[300px]">
                <div className="flex flex-col gap-1 p-1">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-muted ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {notification.sender ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={notification.sender.avatar || "/placeholder.svg?height=32&width=32"}
                            alt={notification.sender.name}
                          />
                          <AvatarFallback>{notification.sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        getNotificationIcon(notification.type)
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {notification.title}
                          </p>
                          <div className="flex items-center gap-1">
                            {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{notification.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay notificaciones</h3>
                <p className="text-sm text-muted-foreground mt-2">No tienes notificaciones en este momento.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            {filteredNotifications.filter((n) => !n.read).length > 0 ? (
              <ScrollArea className="h-[300px]">
                <div className="flex flex-col gap-1 p-1">
                  {filteredNotifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="flex cursor-pointer items-start gap-3 rounded-lg p-2 bg-muted/50 hover:bg-muted"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {notification.sender ? (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={notification.sender.avatar || "/placeholder.svg?height=32&width=32"}
                              alt={notification.sender.name}
                            />
                            <AvatarFallback>{notification.sender.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          getNotificationIcon(notification.type)
                        )}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">{notification.title}</p>
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Check className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay notificaciones sin leer</h3>
                <p className="text-sm text-muted-foreground mt-2">Has leído todas tus notificaciones.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        <Separator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="/dashboard/notificaciones">Ver todas las notificaciones</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
