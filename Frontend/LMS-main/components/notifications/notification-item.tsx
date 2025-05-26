"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, Bell, Check, X, Clock, ExternalLink } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Notification } from "./notification-center"

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Obtener el icono según el tipo de notificación
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Bell className="h-5 w-5" />
          </div>
        )
      case "success":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Check className="h-5 w-5" />
          </div>
        )
      case "warning":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            <Bell className="h-5 w-5" />
          </div>
        )
      case "error":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Bell className="h-5 w-5" />
          </div>
        )
      case "lab":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <Bell className="h-5 w-5" />
          </div>
        )
      case "report":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <Bell className="h-5 w-5" />
          </div>
        )
      case "evaluation":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Bell className="h-5 w-5" />
          </div>
        )
      case "message":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
            <Bell className="h-5 w-5" />
          </div>
        )
      default:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Bell className="h-5 w-5" />
          </div>
        )
    }
  }

  return (
    <Card
      className={`mb-3 transition-all ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {notification.sender ? (
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={notification.sender.avatar || "/placeholder.svg?height=40&width=40"}
                alt={notification.sender.name}
              />
              <AvatarFallback>{notification.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            getNotificationIcon(notification.type)
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className={`text-base font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {notification.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
              </div>
              <div className="flex items-center">
                {!notification.read && <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Opciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!notification.read ? (
                      <DropdownMenuItem onClick={() => onMarkAsRead(notification.id)}>
                        <Check className="mr-2 h-4 w-4" />
                        Marcar como leída
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onMarkAsRead(notification.id)}>
                        <Bell className="mr-2 h-4 w-4" />
                        Marcar como no leída
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onDelete(notification.id)} className="text-destructive">
                      <X className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {notification.time}
              </div>
              {notification.actionUrl && (
                <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-xs">
                  <Link href={notification.actionUrl}>
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Ver detalles
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
