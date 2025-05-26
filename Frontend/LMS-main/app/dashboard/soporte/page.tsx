import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { SupportTicketsTable } from "@/components/dashboard/support-tickets-table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Soporte" text="Gestiona los tickets de soporte de la plataforma">
        <Link href="/dashboard/soporte/nuevo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo ticket
          </Button>
        </Link>
      </DashboardHeader>
      <SupportTicketsTable />
    </DashboardShell>
  )
}
