"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Html, useGLTF, Text } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Info, ZoomIn, ZoomOut, RotateCcw, Eye, Layers } from "lucide-react"
import type * as THREE from "three"

// Tipos para los modelos 3D
interface ModelProps {
  url: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  onClick?: () => void
  isSelected?: boolean
}

// Componente para renderizar un modelo 3D
function Model({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, onClick, isSelected }: ModelProps) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  // Efecto de rotación suave para el modelo seleccionado
  useFrame((state) => {
    if (modelRef.current && isSelected) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <group
      ref={modelRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <primitive object={scene.clone()} />
      {isSelected && (
        <Html position={[0, 2, 0]} center>
          <Badge className="bg-primary text-primary-foreground">Seleccionado</Badge>
        </Html>
      )}
    </group>
  )
}

// Componente para controlar la cámara
function CameraController() {
  const { camera, gl } = useThree()
  const controlsRef = useRef<any>(null)

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={20}
    />
  )
}

// Componente principal del visor 3D
interface ModelViewer3DProps {
  title?: string
  description?: string
  modelUrls?: string[]
  initialModelIndex?: number
  showControls?: boolean
  showInfo?: boolean
  onModelSelect?: (index: number) => void
}

export function ModelViewer3D({
  title = "Visor de Modelos 3D",
  description = "Explora modelos moleculares en 3D",
  modelUrls = ["/assets/3d/duck.glb"], // Modelo de ejemplo por defecto
  initialModelIndex = 0,
  showControls = true,
  showInfo = true,
  onModelSelect,
}: ModelViewer3DProps) {
  const [selectedModelIndex, setSelectedModelIndex] = useState(initialModelIndex)
  const [zoom, setZoom] = useState(1)
  const [showLabels, setShowLabels] = useState(true)
  const [showWireframe, setShowWireframe] = useState(false)
  const [activeTab, setActiveTab] = useState("view")

  // Información de ejemplo para moléculas
  const moleculeInfo = [
    {
      name: "Molécula de Agua (H₂O)",
      formula: "H₂O",
      description: "El agua es un compuesto químico formado por dos átomos de hidrógeno y uno de oxígeno.",
      properties: [
        "Estado natural: Líquido a temperatura ambiente",
        "Punto de ebullición: 100°C",
        "Punto de fusión: 0°C",
        "Densidad: 1 g/cm³",
      ],
    },
    {
      name: "Dióxido de Carbono (CO₂)",
      formula: "CO₂",
      description: "El dióxido de carbono es un gas incoloro formado por un átomo de carbono y dos de oxígeno.",
      properties: [
        "Estado natural: Gas a temperatura ambiente",
        "Punto de sublimación: -78.5°C",
        "Densidad: 1.98 g/L a 25°C",
      ],
    },
    {
      name: "Modelo 3D",
      formula: "",
      description: "Modelo 3D genérico para visualización.",
      properties: [],
    },
  ]

  // Obtener la información del modelo seleccionado
  const currentModelInfo = moleculeInfo[selectedModelIndex] || moleculeInfo[moleculeInfo.length - 1]

  // Manejar el cambio de modelo seleccionado
  const handleModelSelect = (index: number) => {
    setSelectedModelIndex(index)
    if (onModelSelect) {
      onModelSelect(index)
    }
  }

  // Manejar el zoom
  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  // Resetear la vista
  const resetView = () => {
    setZoom(1)
    setShowLabels(true)
    setShowWireframe(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {showControls && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="view">Vista</TabsTrigger>
                <TabsTrigger value="models">Modelos</TabsTrigger>
                <TabsTrigger value="info">Información</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-[500px] bg-muted/20 rounded-md overflow-hidden">
          <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <CameraController />
            <Environment preset="studio" />

            {/* Renderizar el modelo seleccionado */}
            {modelUrls.map((url, index) => (
              <Model
                key={index}
                url={url}
                position={[index * 4 - (modelUrls.length - 1) * 2, 0, 0]}
                scale={zoom}
                isSelected={index === selectedModelIndex}
                onClick={() => handleModelSelect(index)}
              />
            ))}

            {/* Etiquetas para los átomos si showLabels está activado */}
            {showLabels && selectedModelIndex < 2 && (
              <>
                {selectedModelIndex === 0 ? (
                  <>
                    <Text
                      position={[0, 1.5, 0]}
                      color="black"
                      fontSize={0.5}
                      font="/fonts/Inter_Regular.json"
                      anchorX="center"
                      anchorY="middle"
                    >
                      O
                    </Text>
                    <Text
                      position={[-1, 0.5, 0]}
                      color="black"
                      fontSize={0.5}
                      font="/fonts/Inter_Regular.json"
                      anchorX="center"
                      anchorY="middle"
                    >
                      H
                    </Text>
                    <Text
                      position={[1, 0.5, 0]}
                      color="black"
                      fontSize={0.5}
                      font="/fonts/Inter_Regular.json"
                      anchorX="center"
                      anchorY="middle"
                    >
                      H
                    </Text>
                  </>
                ) : selectedModelIndex === 1 ? (
                  <>
                    <Text
                      position={[0, 0, 0]}
                      color="black"
                      fontSize={0.5}
                      font="/fonts/Inter_Regular.json"
                      anchorX="center"
                      anchorY="middle"
                    >
                      C
                    </Text>
                    <Text
                      position={[0, 1, 0]}
                      color="black"
                      fontSize={0.5}
                      font="/fonts/Inter_Regular.json"
                      anchorX="center"
                      anchorY="middle"
                    >
                      O
                    </Text>
                    <Text
                      position={[0, -1, 0]}
                      color="black"
                      fontSize={0.5}
                      font="/fonts/Inter_Regular.json"
                      anchorX="center"
                      anchorY="middle"
                    >
                      O
                    </Text>
                  </>
                ) : null}
              </>
            )}
          </Canvas>

          {/* Controles superpuestos */}
          {showControls && (
            <>
              {activeTab === "view" && (
                <div className="absolute bottom-4 right-4 bg-background/90 p-4 rounded-lg border shadow-sm">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="zoom">Zoom</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                          >
                            <ZoomOut className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                          >
                            <ZoomIn className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Slider id="zoom" min={0.5} max={2} step={0.1} value={[zoom]} onValueChange={handleZoomChange} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="labels" checked={showLabels} onCheckedChange={setShowLabels} />
                        <Label htmlFor="labels" className="flex items-center gap-1">
                          <Eye className="h-4 w-4" /> Etiquetas
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="wireframe" checked={showWireframe} onCheckedChange={setShowWireframe} />
                        <Label htmlFor="wireframe" className="flex items-center gap-1">
                          <Layers className="h-4 w-4" /> Wireframe
                        </Label>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full" onClick={resetView}>
                      <RotateCcw className="mr-2 h-4 w-4" /> Resetear vista
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "models" && (
                <div className="absolute bottom-4 right-4 bg-background/90 p-4 rounded-lg border shadow-sm w-64">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Modelos disponibles</h3>
                    <div className="grid gap-2">
                      {modelUrls.map((_, index) => (
                        <Button
                          key={index}
                          variant={index === selectedModelIndex ? "default" : "outline"}
                          size="sm"
                          className="justify-start"
                          onClick={() => handleModelSelect(index)}
                        >
                          {index === 0
                            ? "Molécula de Agua (H₂O)"
                            : index === 1
                              ? "Dióxido de Carbono (CO₂)"
                              : `Modelo ${index + 1}`}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "info" && showInfo && (
                <div className="absolute bottom-4 right-4 bg-background/90 p-4 rounded-lg border shadow-sm w-80">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium flex items-center gap-1">
                        <Info className="h-4 w-4" /> {currentModelInfo.name}
                      </h3>
                      {currentModelInfo.formula && (
                        <p className="text-sm font-bold text-muted-foreground">{currentModelInfo.formula}</p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{currentModelInfo.description}</p>
                    {currentModelInfo.properties.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium mb-1">Propiedades:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {currentModelInfo.properties.map((prop, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-1">•</span> {prop}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Info className="h-4 w-4 mr-1" />
          {currentModelInfo.name}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetView}>
            <RotateCcw className="mr-2 h-4 w-4" /> Resetear
          </Button>
          <Button size="sm">
            <Eye className="mr-2 h-4 w-4" /> Vista completa
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
