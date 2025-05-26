import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MaterialsTable } from "@/components/dashboard/materials-table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function MaterialsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Materiales" text="Gestiona todos los materiales de los cursos de química">
        <Link href="/dashboard/materiales/nuevo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo material
          </Button>
        </Link>
      </DashboardHeader>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>
          Los materiales ahora se gestionan dentro de cada curso. Esta vista muestra todos los materiales de todos los
          cursos.
        </AlertDescription>
      </Alert>

      <MaterialsTable />
    </DashboardShell>
  )
}
