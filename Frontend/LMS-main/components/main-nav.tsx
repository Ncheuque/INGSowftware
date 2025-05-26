"use client"

import Link from "next/link"
import { CuboidIcon as Cube3d } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Cube3d className="h-6 w-6 text-primary" />
        <span className="font-bold text-primary">3DLAB LMS</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Sobre Nosotros</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Cube3d className="h-6 w-6 text-primary" />
                      <div className="mb-2 mt-4 text-lg font-medium">3DLAB LMS</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Simulador de laboratorio desarrollado en Unity
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="/login"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Acceso Estudiantes</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Inicia sesión para acceder a los laboratorios virtuales
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="/login"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Acceso Docentes</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Portal para profesores e instructores
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="#caracteristicas"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Características</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Descubre las funcionalidades del simulador
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#caracteristicas" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Características</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#testimonios" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Testimonios</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#contacto" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contacto</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
