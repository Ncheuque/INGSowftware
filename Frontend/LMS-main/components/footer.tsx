import Link from "next/link"
import { CuboidIcon as Cube3d } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Cube3d className="h-6 w-6 text-primary" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 3DLAB LMS. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terminos" className="text-sm text-muted-foreground hover:underline hover:text-primary">
            Términos de servicio
          </Link>
          <Link href="/privacidad" className="text-sm text-muted-foreground hover:underline hover:text-primary">
            Política de privacidad
          </Link>
          <Link href="#contacto" className="text-sm text-muted-foreground hover:underline hover:text-primary">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}
