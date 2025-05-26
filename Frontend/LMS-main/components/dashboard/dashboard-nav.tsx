"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  BookOpen,
  Users,
  FileText,
  ClipboardCheck,
  Bell,
  HelpCircle,
  FolderOpen,
  UserPlus,
  ShieldCheck,
  LayoutDashboard,
  School,
  Settings,
} from "lucide-react"

interface DashboardNavProps {
  userRole?: "estudiante" | "docente" | "administrador"
}

export function DashboardNav({ userRole = "estudiante" }: DashboardNavProps) {
  const pathname = usePathname()

  // Elementos de navegación basados en el rol del usuario
  const navItems = [
    {
      title: "Panel",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      roles: ["estudiante", "docente", "administrador"],
    },
    {
      title: "Cursos",
      href: "/dashboard/cursos",
      icon: <BookOpen className="h-5 w-5" />,
      roles: ["estudiante", "docente", "administrador"],
    },
    {
      title: "Materiales",
      href: "/dashboard/materiales",
      icon: <FolderOpen className="h-5 w-5" />,
      roles: ["docente", "administrador"],
    },
    {
      title: "Estudiantes",
      href: "/dashboard/estudiantes",
      icon: <Users className="h-5 w-5" />,
      roles: ["docente", "administrador"],
    },
    {
      title: "Informes",
      href: "/dashboard/informes",
      icon: <FileText className="h-5 w-5" />,
      roles: ["estudiante", "docente", "administrador"],
    },
    {
      title: "Evaluaciones",
      href: "/dashboard/evaluaciones",
      icon: <ClipboardCheck className="h-5 w-5" />,
      roles: ["estudiante", "docente", "administrador"],
    },
    {
      title: "Soporte",
      href: "/dashboard/soporte",
      icon: <HelpCircle className="h-5 w-5" />,
      roles: ["estudiante", "docente", "administrador"],
    },
    {
      title: "Notificaciones",
      href: "/dashboard/notificaciones",
      icon: <Bell className="h-5 w-5" />,
      roles: ["estudiante", "docente", "administrador"],
    },
    // Sección exclusiva para administradores
    {
      title: "Gestión de Usuarios",
      href: "/dashboard/administracion/usuarios",
      icon: <UserPlus className="h-5 w-5" />,
      roles: ["administrador"],
    },
    {
      title: "Gestión de Cursos",
      href: "/dashboard/administracion/cursos",
      icon: <BookOpen className="h-5 w-5" />,
      roles: ["administrador"],
    },
    {
      title: "Registro de Usuarios",
      href: "/dashboard/administracion/registro",
      icon: <UserPlus className="h-5 w-5" />,
      roles: ["administrador"],
    },
    {
      title: "Gestión Académica",
      href: "/dashboard/administracion/academica",
      icon: <School className="h-5 w-5" />,
      roles: ["administrador"],
    },
    {
      title: "Permisos y Roles",
      href: "/dashboard/administracion/permisos",
      icon: <ShieldCheck className="h-5 w-5" />,
      roles: ["administrador"],
    },
    {
      title: "Configuración 3D Lab",
      href: "/dashboard/administracion/config3dlab",
      icon: <Settings className="h-5 w-5" />,
      roles: ["administrador"],
    },
    {
      title: "Analíticas",
      href: "/dashboard/administracion/analiticas",
      icon: <BarChart3 className="h-5 w-5" />,
      roles: ["administrador", "docente"],
    },
  ]

  // Filtrar elementos según el rol del usuario
  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

  return (
    <nav className="space-y-1 px-2">
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href || pathname.startsWith(`${item.href}/`)
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
