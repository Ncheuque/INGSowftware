import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ReportsTable } from "@/components/dashboard/reports-table"
import { PlusCircle, Info } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function InformesPage() {
  // En un entorno real, esta información vendría de una API
  const userRole = "profesor" // Cambiar a "profesor" para probar diferentes vistas

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Informes de Laboratorio"
        text={
          userRole === "estudiante"
            ? "Gestiona tus informes de prácticas de laboratorio"
            : "Revisa y califica los informes de tus estudiantes"
        }
      >
        {userRole === "estudiante" && (
          <Link href="/dashboard/informes/nuevo">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo informe
            </Button>
          </Link>
        )}
      </DashboardHeader>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>
          Los informes ahora se gestionan dentro de cada curso. Esta vista muestra todos los informes de todos los
          cursos.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue={userRole === "estudiante" ? "mis-informes" : "pendientes"} className="w-full">
        <TabsList className="mb-4 w-full max-w-md">
          <TabsTrigger value={userRole === "estudiante" ? "mis-informes" : "pendientes"} className="flex-1">
            {userRole === "estudiante" ? "Mis Informes" : "Pendientes"}
          </TabsTrigger>
          <TabsTrigger value="evaluados" className="flex-1">
            Evaluados
          </TabsTrigger>
          <TabsTrigger value={userRole === "estudiante" ? "borradores" : "todos"} className="flex-1">
            {userRole === "estudiante" ? "Borradores" : "Todos"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={userRole === "estudiante" ? "mis-informes" : "pendientes"}>
          <ReportsTable userRole={userRole} status={userRole === "estudiante" ? "enviado" : "pendiente"} />
        </TabsContent>

        <TabsContent value="evaluados">
          <ReportsTable userRole={userRole} status="evaluado" />
        </TabsContent>

        <TabsContent value={userRole === "estudiante" ? "borradores" : "todos"}>
          <ReportsTable userRole={userRole} status={userRole === "estudiante" ? "borrador" : "todos"} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
