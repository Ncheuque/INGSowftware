import { PageHeader } from "@/components/dashboard/page-header"
import { CourseCard } from "@/components/dashboard/course-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  // En un entorno real, estos datos vendrían de una API o base de datos
  const courses = [
    {
      id: "1",
      title: "Química Orgánica",
      description: "Fundamentos de química orgánica y reacciones químicas básicas",
      image: "/placeholder.svg?height=180&width=320",
      students: 24,
      lessons: 12,
      labIntegration: true,
      status: "activo",
    },
    {
      id: "2",
      title: "Biología Celular",
      description: "Estudio de la estructura y función de las células",
      image: "/placeholder.svg?height=180&width=320",
      students: 18,
      lessons: 10,
      labIntegration: true,
      status: "activo",
    },
    {
      id: "3",
      title: "Física Cuántica",
      description: "Introducción a los principios de la física cuántica",
      image: "/placeholder.svg?height=180&width=320",
      students: 15,
      lessons: 14,
      labIntegration: false,
      status: "próximo",
    },
    {
      id: "4",
      title: "Anatomía Humana",
      description: "Estudio de la estructura del cuerpo humano",
      image: "/placeholder.svg?height=180&width=320",
      students: 30,
      lessons: 16,
      labIntegration: true,
      status: "activo",
    },
  ]

  // Verificar el rol del usuario (en un entorno real, esto vendría de una sesión autenticada)
  const userRole = typeof window !== "undefined" ? localStorage.getItem("userRole") || "estudiante" : "estudiante"

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        heading="Cursos"
        text={userRole === "profesor" ? "Gestiona tus cursos y materiales" : "Explora tus cursos inscritos"}
        breadcrumbs={[{ title: "Cursos", href: "/dashboard/cursos" }]}
        actions={
          userRole === "profesor" ? (
            <Button asChild>
              <Link href="/dashboard/cursos/nuevo">
                <Plus className="mr-2 h-4 w-4" /> Nuevo Curso
              </Link>
            </Button>
          ) : null
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            image={course.image}
            students={course.students}
            lessons={course.lessons}
            href={`/dashboard/cursos/${course.id}`}
            labIntegration={course.labIntegration}
            status={course.status as "activo" | "próximo" | "archivado"}
          />
        ))}
      </div>
    </div>
  )
}
