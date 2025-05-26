import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Datos de ejemplo para diferentes roles
const studentActivities = [
  {
    id: "1",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "CM",
    name: "Carlos Mendoza",
    action: "Ha calificado tu informe de laboratorio",
    time: "Hace 5m",
  },
  {
    id: "2",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "LR",
    name: "Laura Rodríguez",
    action: "Ha añadido un nuevo material al curso 'Química Orgánica'",
    time: "Hace 15m",
  },
  {
    id: "3",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "AP",
    name: "Administración",
    action: "Tu solicitud de soporte ha sido respondida",
    time: "Hace 1h",
  },
  {
    id: "4",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "CM",
    name: "Carlos Mendoza",
    action: "Ha programado una nueva práctica de laboratorio",
    time: "Hace 3h",
  },
  {
    id: "5",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "AP",
    name: "Administración",
    action: "Se ha actualizado el sistema 3D Lab",
    time: "Hace 5h",
  },
]

const teacherActivities = [
  {
    id: "1",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "JD",
    name: "Juan Díaz",
    action: "Completó el curso 'Introducción al Modelado 3D'",
    time: "Hace 5m",
  },
  {
    id: "2",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "LR",
    name: "Laura Rodríguez",
    action: "Subió un nuevo informe de laboratorio",
    time: "Hace 15m",
  },
  {
    id: "3",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "CM",
    name: "Carlos Martínez",
    action: "Realizó el experimento de 'Titulación Ácido-Base'",
    time: "Hace 1h",
  },
  {
    id: "4",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "MG",
    name: "María González",
    action: "Solicitó retroalimentación sobre su informe",
    time: "Hace 3h",
  },
  {
    id: "5",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "AP",
    name: "Ana Pérez",
    action: "Completó todos los módulos del curso",
    time: "Hace 5h",
  },
]

const adminActivities = [
  {
    id: "1",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "JD",
    name: "Juan Díaz",
    action: "Completó el curso 'Introducción al Modelado 3D'",
    time: "Hace 5m",
  },
  {
    id: "2",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "LR",
    name: "Laura Rodríguez",
    action: "Subió un nuevo material al curso 'Animación Avanzada'",
    time: "Hace 15m",
  },
  {
    id: "3",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "CM",
    name: "Carlos Martínez",
    action: "Se inscribió en el curso 'Diseño de Personajes 3D'",
    time: "Hace 1h",
  },
  {
    id: "4",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "MG",
    name: "María González",
    action: "Creó un nuevo curso 'Fundamentos de Texturizado'",
    time: "Hace 3h",
  },
  {
    id: "5",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "AP",
    name: "Andrés Pérez",
    action: "Respondió a un ticket de soporte",
    time: "Hace 5h",
  },
]

interface RecentActivityProps {
  userRole?: string
}

export function RecentActivity({ userRole = "estudiante" }: RecentActivityProps) {
  // Seleccionar las actividades según el rol
  const activities =
    userRole === "estudiante"
      ? studentActivities
      : userRole === "docente" || userRole === "profesor"
        ? teacherActivities
        : adminActivities

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar || "/placeholder.svg"} alt="Avatar" />
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
