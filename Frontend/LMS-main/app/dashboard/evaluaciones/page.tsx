import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { PlusCircle, Info } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EvaluationsTable } from "@/components/dashboard/evaluations-table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function EvaluacionesPage() {
  // En un entorno real, esta información vendría de una API
  const userRole = "profesor" // Cambiar a "profesor" para probar diferentes vistas

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Evaluaciones"
        text={
          userRole === "estudiante"
            ? "Revisa tus calificaciones y progreso en los laboratorios"
            : "Gestiona las evaluaciones de tus estudiantes"
        }
      >
        {userRole === "profesor" && (
          <Link href="/dashboard/evaluaciones/nueva">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva evaluación
            </Button>
          </Link>
        )}
      </DashboardHeader>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>
          Las evaluaciones ahora se gestionan dentro de cada curso. Esta vista muestra todas las evaluaciones de todos
          los cursos.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue={userRole === "estudiante" ? "mis-evaluaciones" : "laboratorios"} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value={userRole === "estudiante" ? "mis-evaluaciones" : "laboratorios"}>
            {userRole === "estudiante" ? "Mis Evaluaciones" : "Laboratorios"}
          </TabsTrigger>
          <TabsTrigger value={userRole === "estudiante" ? "cursos" : "informes"}>
            {userRole === "estudiante" ? "Por Curso" : "Informes"}
          </TabsTrigger>
          <TabsTrigger value={userRole === "estudiante" ? "progreso" : "estudiantes"}>
            {userRole === "estudiante" ? "Progreso" : "Estudiantes"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={userRole === "estudiante" ? "mis-evaluaciones" : "laboratorios"} className="mt-6">
          <EvaluationsTable userRole={userRole} type={userRole === "estudiante" ? "all" : "labs"} />
        </TabsContent>

        <TabsContent value={userRole === "estudiante" ? "cursos" : "informes"} className="mt-6">
          <EvaluationsTable userRole={userRole} type={userRole === "estudiante" ? "courses" : "reports"} />
        </TabsContent>

        <TabsContent value={userRole === "estudiante" ? "progreso" : "estudiantes"} className="mt-6">
          <EvaluationsTable userRole={userRole} type={userRole === "estudiante" ? "progress" : "students"} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
