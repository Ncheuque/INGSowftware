import { BookOpen, ClipboardCheck, LineChart, Users, TabletsIcon as Devices, CuboidIcon as Cube3d } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Cursos Interactivos",
      description: "Accede a cursos con contenido multimedia, evaluaciones y seguimiento de progreso.",
      icon: BookOpen,
    },
    {
      title: "Laboratorios Virtuales 3D",
      description: "Experimenta con simulaciones de laboratorio realistas gracias a la integración con 3D Labs.",
      icon: Cube3d,
    },
    {
      title: "Evaluaciones Adaptativas",
      description: "Sistema de evaluación que se adapta al nivel de conocimiento de cada estudiante.",
      icon: ClipboardCheck,
    },
    {
      title: "Seguimiento de Progreso",
      description: "Visualiza tu avance en cada curso y recibe retroalimentación personalizada.",
      icon: LineChart,
    },
    {
      title: "Colaboración en Tiempo Real",
      description: "Trabaja en equipo con otros estudiantes en experimentos y proyectos colaborativos.",
      icon: Users,
    },
    {
      title: "Acceso Multiplataforma",
      description: "Accede a tus cursos desde cualquier dispositivo, en cualquier momento y lugar.",
      icon: Devices,
    },
  ]

  return (
    <section id="caracteristicas" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Características
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simulación avanzada de laboratorio virtual
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nuestro simulador desarrollado en Unity ofrece una experiencia inmersiva para el aprendizaje en un entorno
              seguro y controlado.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-colors hover:bg-accent"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
