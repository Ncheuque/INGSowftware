import { NextResponse } from "next/server"

// Tipos para las notificaciones
interface Notification {
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

// Simulación de una base de datos en memoria
let notifications = [...mockNotifications]

export async function GET(request: Request) {
  // Obtener parámetros de consulta
  const { searchParams } = new URL(request.url)
  const filter = searchParams.get("filter") || "all"
  const search = searchParams.get("search") || ""

  // Filtrar notificaciones
  let filteredNotifications = [...notifications]

  if (filter !== "all") {
    if (filter === "unread") {
      filteredNotifications = filteredNotifications.filter((n) => !n.read)
    } else {
      filteredNotifications = filteredNotifications.filter((n) => n.type === filter)
    }
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredNotifications = filteredNotifications.filter(
      (n) => n.title.toLowerCase().includes(searchLower) || n.description.toLowerCase().includes(searchLower),
    )
  }

  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    notifications: filteredNotifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    total: notifications.length,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Manejar diferentes acciones
  switch (body.action) {
    case "markAsRead":
      if (body.id) {
        // Marcar una notificación como leída
        notifications = notifications.map((n) => (n.id === body.id ? { ...n, read: true } : n))
      } else {
        // Marcar todas como leídas
        notifications = notifications.map((n) => ({ ...n, read: true }))
      }
      break

    case "markAsUnread":
      // Marcar como no leída
      notifications = notifications.map((n) => (n.id === body.id ? { ...n, read: false } : n))
      break

    case "delete":
      if (body.id) {
        // Eliminar una notificación
        notifications = notifications.filter((n) => n.id !== body.id)
      } else {
        // Eliminar todas
        notifications = []
      }
      break

    case "create":
      // Crear una nueva notificación
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: body.title || "Nueva notificación",
        description: body.description || "",
        time: "Ahora",
        read: false,
        type: body.type || "info",
        actionUrl: body.actionUrl,
        sender: body.sender || {
          name: "Sistema",
          role: "system",
        },
      }
      notifications = [newNotification, ...notifications]
      break

    default:
      return NextResponse.json({ error: "Acción no válida" }, { status: 400 })
  }

  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json({
    success: true,
    unreadCount: notifications.filter((n) => !n.read).length,
    total: notifications.length,
  })
}
