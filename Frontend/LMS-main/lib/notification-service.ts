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

// Servicio para gestionar notificaciones
export const NotificationService = {
  // Obtener todas las notificaciones
  async getNotifications(
    filter = "all",
    search = "",
  ): Promise<{
    notifications: Notification[]
    unreadCount: number
    total: number
  }> {
    const params = new URLSearchParams()
    if (filter !== "all") params.append("filter", filter)
    if (search) params.append("search", search)

    const response = await fetch(`/api/notifications?${params.toString()}`)
    if (!response.ok) {
      throw new Error("Error al obtener notificaciones")
    }

    return response.json()
  },

  // Marcar una notificación como leída
  async markAsRead(id: string): Promise<{ success: boolean }> {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "markAsRead",
        id,
      }),
    })

    if (!response.ok) {
      throw new Error("Error al marcar notificación como leída")
    }

    return response.json()
  },

  // Marcar una notificación como no leída
  async markAsUnread(id: string): Promise<{ success: boolean }> {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "markAsUnread",
        id,
      }),
    })

    if (!response.ok) {
      throw new Error("Error al marcar notificación como no leída")
    }

    return response.json()
  },

  // Marcar todas las notificaciones como leídas
  async markAllAsRead(): Promise<{ success: boolean }> {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "markAsRead",
      }),
    })

    if (!response.ok) {
      throw new Error("Error al marcar todas las notificaciones como leídas")
    }

    return response.json()
  },

  // Eliminar una notificación
  async deleteNotification(id: string): Promise<{ success: boolean }> {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "delete",
        id,
      }),
    })

    if (!response.ok) {
      throw new Error("Error al eliminar notificación")
    }

    return response.json()
  },

  // Eliminar todas las notificaciones
  async deleteAllNotifications(): Promise<{ success: boolean }> {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "delete",
      }),
    })

    if (!response.ok) {
      throw new Error("Error al eliminar todas las notificaciones")
    }

    return response.json()
  },

  // Crear una nueva notificación
  async createNotification(notification: {
    title: string
    description: string
    type: Notification["type"]
    actionUrl?: string
    sender?: Notification["sender"]
  }): Promise<{ success: boolean }> {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "create",
        ...notification,
      }),
    })

    if (!response.ok) {
      throw new Error("Error al crear notificación")
    }

    return response.json()
  },
}
