import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StudentsTable } from "@/components/dashboard/students-table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function StudentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Estudiantes" text="Gestiona todos los estudiantes de la plataforma">
        <Link href="/dashboard/estudiantes/nuevo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo estudiante
          </Button>
        </Link>
      </DashboardHeader>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>
          Los estudiantes ahora se gestionan dentro de cada curso. Esta vista muestra todos los estudiantes de todos los
          cursos.
        </AlertDescription>
      </Alert>

      <StudentsTable />
    </DashboardShell>
  )
}
