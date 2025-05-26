import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Beaker, Atom, Cuboid } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                <Cuboid className="mr-1 h-4 w-4" />
                Simulador de Laboratorio Virtual
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Experimenta en un entorno virtual seguro
              </h1>
              <p className="text-muted-foreground text-lg max-w-[600px]">
                Plataforma educativa especializada con integración de laboratorios virtuales 3D Labs. Aprende con
                simulaciones interactivas y experimenta de forma segura en un entorno virtual.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register" className="w-full min-[400px]:w-auto">
                <Button className="w-full" size="lg">
                  <Beaker className="mr-2 h-5 w-5" />
                  Comenzar ahora
                </Button>
              </Link>
              <Link href="/login" className="w-full min-[400px]:w-auto">
                <Button variant="outline" className="w-full" size="lg">
                  <Atom className="mr-2 h-5 w-5" />
                  Acceder
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-2xl opacity-20"></div>
              <div className="relative h-full w-full rounded-xl border bg-card p-4 shadow-xl">
                <div className="h-full w-full overflow-hidden rounded-lg bg-muted">
                  <div className="h-full w-full relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="lab-animation">
                        <div className="beaker">
                          <div className="liquid"></div>
                          <div className="bubbles">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div
                                key={i}
                                className="bubble"
                                style={{
                                  animationDuration: `${2 + Math.random() * 2}s`,
                                  left: `${Math.random() * 100}%`,
                                  animationDelay: `${Math.random() * 2}s`,
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div className="molecules">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className="molecule"
                              style={{
                                animationDuration: `${5 + Math.random() * 5}s`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                              }}
                            >
                              <div className="atom atom-center"></div>
                              <div className="atom atom-orbit1"></div>
                              <div className="atom atom-orbit2"></div>
                              <div className="atom atom-orbit3"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
