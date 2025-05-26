"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ModelViewer3D } from "@/components/laboratory/model-viewer-3d"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Download, BookOpen, CuboidIcon as Cube } from "lucide-react"
import Link from "next/link"

export default function Modelos3DPage() {
  const [activeCategory, setActiveCategory] = useState("moleculas")

  // En un entorno real, estos datos vendrían de una base de datos
  const modelCategories = [
    {
      id: "moleculas",
      name: "Moléculas",
      description: "Modelos moleculares para estudio de química",
      models: [
        {
          id: "agua",
          name: "Molécula de Agua (H₂O)",
          description: "Estructura molecular del agua",
          url: "/assets/3d/duck.glb", // Usamos el modelo de ejemplo
        },
        {
          id: "co2",
          name: "Dióxido de Carbono (CO₂)",
          description: "Estructura molecular del CO₂",
          url: "/assets/3d/duck.glb", // Usamos el modelo de ejemplo
        },
        {
          id: "metano",
          name: "Metano (CH₄)",
          description: "Estructura molecular del metano",
          url: "/assets/3d/duck.glb", // Usamos el modelo de ejemplo
        },
      ],
    },
    {
      id: "equipos",
      name: "Equipos de Laboratorio",
      description: "Modelos 3D de equipos utilizados en laboratorios",
      models: [
        {
          id: "bureta",
          name: "Bureta",
          description: "Instrumento de medición de volumen",
          url: "/assets/3d/duck.glb", // Usamos el modelo de ejemplo
        },
        {
          id: "matraz",
          name: "Matraz Erlenmeyer",
          description: "Recipiente cónico para mezclas",
          url: "/assets/3d/duck.glb", // Usamos el modelo de ejemplo
        },
      ],
    },
    {
      id: "cristales",
      name: "Estructuras Cristalinas",
      description: "Modelos de estructuras cristalinas de compuestos",
      models: [
        {
          id: "nacl",
          name: "Cloruro de Sodio (NaCl)",
          description: "Estructura cristalina de la sal común",
          url: "/assets/3d/duck.glb", // Usamos el modelo de ejemplo
        },
      ],
    },
  ]

  // Obtener la categoría activa
  const activeModels = modelCategories.find((cat) => cat.id === activeCategory)?.models || []

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Biblioteca de Modelos 3D"
        text="Explora y visualiza modelos moleculares y equipos de laboratorio en 3D"
      >
        <Link href="/dashboard/laboratorios">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a Laboratorios
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-6">
        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
          <div className="flex items-center justify-between">
            <TabsList>
              {modelCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                  <Cube className="h-4 w-4" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                Guía de uso
              </Button>
            </div>
          </div>

          {modelCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ModelViewer3D
                      title={`Visor de ${category.name}`}
                      description={`Explora modelos 3D de ${category.name.toLowerCase()}`}
                      modelUrls={category.models.map((model) => model.url)}
                      showControls={true}
                      showInfo={true}
                    />
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activeModels.map((model) => (
                    <Card key={model.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <div className="h-full w-full">
                          <ModelViewer3D
                            title=""
                            description=""
                            modelUrls={[model.url]}
                            showControls={false}
                            showInfo={false}
                          />
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <CardDescription>{model.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <div className="flex gap-2 w-full">
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                          </Button>
                          <Link href={`/dashboard/laboratorios/modelos-3d/${model.id}`} className="w-full">
                            <Button size="sm" className="w-full">
                              <Cube className="mr-2 h-4 w-4" />
                              Ver detalle
                            </Button>
                          </Link>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardShell>
  )
}
