"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ModelViewer3D } from "@/components/laboratory/model-viewer-3d"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Download, Share2, BookOpen, CuboidIcon as Cube, Info, FileText, Beaker } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para los modelos
const modelData = {
  agua: {
    id: "agua",
    name: "Molécula de Agua (H₂O)",
    description:
      "La molécula de agua está formada por dos átomos de hidrógeno y uno de oxígeno unidos por enlaces covalentes.",
    category: "moleculas",
    url: "/assets/3d/duck.glb", // Usamos el modelo de ejemplo
    properties: [
      { name: "Fórmula", value: "H₂O" },
      { name: "Masa molar", value: "18.01528 g/mol" },
      { name: "Densidad", value: "1000 kg/m³ (líquido a 4°C)" },
      { name: "Punto de fusión", value: "0°C (273.15 K)" },
      { name: "Punto de ebullición", value: "100°C (373.15 K)" },
    ],
    relatedExperiments: [
      {
        id: "1",
        name: "Titulación Ácido-Base",
        description: "Determinar la concentración de una solución mediante titulación",
      },
      {
        id: "2",
        name: "Electrólisis del Agua",
        description: "Descomposición del agua en hidrógeno y oxígeno mediante electricidad",
      },
    ],
    theory: `
      # Estructura molecular del agua

      El agua (H₂O) es una molécula compuesta por dos átomos de hidrógeno unidos a un átomo de oxígeno mediante enlaces covalentes. La molécula tiene una geometría angular, con un ángulo de enlace de aproximadamente 104.5°.

      ## Propiedades físicas

      El agua es un líquido incoloro, inodoro e insípido a temperatura ambiente. Tiene un alto calor específico, lo que significa que puede absorber o liberar grandes cantidades de calor con cambios relativamente pequeños en su temperatura.

      ## Importancia en química

      El agua es conocida como el "solvente universal" debido a su capacidad para disolver una amplia variedad de sustancias. Esta propiedad es crucial en muchas reacciones químicas y procesos biológicos.
    `,
  },
  co2: {
    id: "co2",
    name: "Dióxido de Carbono (CO₂)",
    description: "El dióxido de carbono es un gas incoloro formado por un átomo de carbono y dos de oxígeno.",
    category: "moleculas",
    url: "/assets/3d/duck.glb", // Usamos el modelo de ejemplo
    properties: [
      { name: "Fórmula", value: "CO₂" },
      { name: "Masa molar", value: "44.01 g/mol" },
      { name: "Densidad", value: "1.98 kg/m³ (gas a 25°C)" },
      { name: "Punto de sublimación", value: "-78.5°C (194.65 K)" },
    ],
    relatedExperiments: [
      {
        id: "3",
        name: "Reacción de Carbonatación",
        description: "Estudio de la formación de carbonatos en soluciones acuosas",
      },
    ],
    theory: `
      # Estructura molecular del CO₂

      El dióxido de carbono (CO₂) es una molécula lineal compuesta por un átomo de carbono unido a dos átomos de oxígeno mediante enlaces dobles. La geometría lineal se debe a la repulsión entre los pares de electrones compartidos.

      ## Propiedades físicas

      El CO₂ es un gas incoloro e inodoro a temperatura y presión estándar. A presiones elevadas, puede existir como líquido o sólido (hielo seco).

      ## Importancia en química

      El dióxido de carbono es un producto común de la combustión y la respiración. Juega un papel crucial en el ciclo del carbono y es uno de los principales gases de efecto invernadero.
    `,
  },
  metano: {
    id: "metano",
    name: "Metano (CH₄)",
    description: "El metano es un hidrocarburo simple formado por un átomo de carbono y cuatro de hidrógeno.",
    category: "moleculas",
    url: "/assets/3d/duck.glb", // Usamos el modelo de ejemplo
    properties: [
      { name: "Fórmula", value: "CH₄" },
      { name: "Masa molar", value: "16.04 g/mol" },
      { name: "Densidad", value: "0.657 kg/m³ (gas a 25°C)" },
      { name: "Punto de fusión", value: "-182.5°C (90.65 K)" },
      { name: "Punto de ebullición", value: "-161.5°C (111.65 K)" },
    ],
    relatedExperiments: [],
    theory: `
      # Estructura molecular del metano

      El metano (CH₄) es el hidrocarburo más simple, con un átomo de carbono unido a cuatro átomos de hidrógeno en una geometría tetraédrica. Los ángulos de enlace son de aproximadamente 109.5°.

      ## Propiedades físicas

      El metano es un gas incoloro e inodoro a temperatura y presión estándar. Es altamente inflamable y forma mezclas explosivas con el aire.

      ## Importancia en química

      El metano es el componente principal del gas natural y un importante combustible. También es un potente gas de efecto invernadero.
    `,
  },
}

export default function ModeloDetallePage() {
  const params = useParams()
  const router = useRouter()
  const [model, setModel] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulamos la carga de datos desde una API
    const id = params.id as string
    setTimeout(() => {
      const modelInfo = modelData[id as keyof typeof modelData]
      if (modelInfo) {
        setModel(modelInfo)
      } else {
        // Redireccionar si no existe el modelo
        router.push("/dashboard/laboratorios/modelos-3d")
      }
      setLoading(false)
    }, 500)
  }, [params.id, router])

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Cargando..." text="Obteniendo información del modelo 3D" />
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={model.name} text={model.description}>
        <Link href="/dashboard/laboratorios/modelos-3d">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a Modelos 3D
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-6">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Cube className="mr-1 h-4 w-4" /> Modelo 3D
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {model.category === "moleculas"
              ? "Molécula"
              : model.category === "equipos"
                ? "Equipo de Laboratorio"
                : "Estructura Cristalina"}
          </Badge>
        </div>

        <Tabs defaultValue="view">
          <TabsList className="mb-4">
            <TabsTrigger value="view" className="flex items-center gap-1">
              <Cube className="h-4 w-4" />
              Visualización 3D
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              Información
            </TabsTrigger>
            <TabsTrigger value="experiments" className="flex items-center gap-1">
              <Beaker className="h-4 w-4" />
              Experimentos Relacionados
            </TabsTrigger>
            <TabsTrigger value="theory" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Teoría
            </TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <Card>
              <CardContent className="p-6">
                <ModelViewer3D
                  title={model.name}
                  description={model.description}
                  modelUrls={[model.url]}
                  showControls={true}
                  showInfo={true}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mr-1" />
                  Utiliza el ratón para rotar, la rueda para hacer zoom y arrastra para mover el modelo.
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar modelo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Propiedades de {model.name}</CardTitle>
                <CardDescription>Información detallada sobre las propiedades físicas y químicas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {model.properties.map((prop: any, index: number) => (
                    <div key={index} className="flex flex-col space-y-1">
                      <h3 className="text-sm font-medium">{prop.name}</h3>
                      <p className="text-sm text-muted-foreground">{prop.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experiments">
            <Card>
              <CardHeader>
                <CardTitle>Experimentos relacionados</CardTitle>
                <CardDescription>Prácticas de laboratorio que utilizan {model.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {model.relatedExperiments && model.relatedExperiments.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {model.relatedExperiments.map((exp: any) => (
                      <Card key={exp.id}>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">{exp.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Link href={`/dashboard/laboratorios/${exp.id}`}>
                            <Button size="sm">Ver experimento</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Beaker className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No hay experimentos relacionados</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Actualmente no hay prácticas de laboratorio que utilicen este modelo.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theory">
            <Card>
              <CardHeader>
                <CardTitle>Fundamentos teóricos</CardTitle>
                <CardDescription>Conceptos científicos relacionados con {model.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {model.theory.split("\n\n").map((paragraph: string, index: number) => {
                    if (paragraph.startsWith("# ")) {
                      return (
                        <h2 key={index} className="text-xl font-bold mt-4 mb-2">
                          {paragraph.substring(2)}
                        </h2>
                      )
                    } else if (paragraph.startsWith("## ")) {
                      return (
                        <h3 key={index} className="text-lg font-bold mt-3 mb-2">
                          {paragraph.substring(3)}
                        </h3>
                      )
                    } else {
                      return (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      )
                    }
                  })}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Ver recursos adicionales
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
