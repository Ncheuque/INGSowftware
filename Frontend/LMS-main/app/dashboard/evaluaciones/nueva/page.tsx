"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewEvaluationPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    type: "lab",
    dueDate: "",
    totalPoints: "100",
    passingGrade: "60",
    allowLateSubmissions: true,
    questions: [{ id: 1, question: "", points: "10", type: "text" }],
    students: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, allowLateSubmissions: checked }))
  }

  const handleQuestionChange = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    }))
  }

  const addQuestion = () => {
    const newId = formData.questions.length > 0 ? Math.max(...formData.questions.map((q) => q.id)) + 1 : 1

    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { id: newId, question: "", points: "10", type: "text" }],
    }))
  }

  const removeQuestion = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para crear la evaluación
    toast({
      title: "Evaluación creada",
      description: "La evaluación ha sido creada exitosamente",
    })
    // Simulamos redirección a la lista de evaluaciones
    setTimeout(() => {
      router.push("/dashboard/evaluaciones")
    }, 1500)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Crear nueva evaluación" text="Añade una evaluación para tus estudiantes">
        <Link href="/dashboard/evaluaciones">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
      </DashboardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="questions">Preguntas</TabsTrigger>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de la evaluación</CardTitle>
                <CardDescription>Completa la información básica de la evaluación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la evaluación</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ej. Evaluación de Titulación Ácido-Base"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe el contenido y objetivos de la evaluación"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="min-h-[120px]"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="course">Curso</Label>
                    <Select value={formData.course} onValueChange={(value) => handleSelectChange("course", value)}>
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Selecciona un curso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quimica-general">Química General</SelectItem>
                        <SelectItem value="quimica-analitica">Química Analítica</SelectItem>
                        <SelectItem value="quimica-organica">Química Orgánica</SelectItem>
                        <SelectItem value="fisicoquimica">Fisicoquímica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de evaluación</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab">Laboratorio</SelectItem>
                        <SelectItem value="report">Informe</SelectItem>
                        <SelectItem value="quiz">Cuestionario</SelectItem>
                        <SelectItem value="exam">Examen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Fecha límite</Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalPoints">Puntos totales</Label>
                    <Input
                      id="totalPoints"
                      name="totalPoints"
                      type="number"
                      placeholder="100"
                      value={formData.totalPoints}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passingGrade">Nota de aprobación (%)</Label>
                    <Input
                      id="passingGrade"
                      name="passingGrade"
                      type="number"
                      placeholder="60"
                      value={formData.passingGrade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowLateSubmissions"
                    checked={formData.allowLateSubmissions}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="allowLateSubmissions">Permitir entregas tardías</Label>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button type="button" onClick={() => setActiveTab("questions")}>
                    Siguiente: Preguntas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preguntas de la evaluación</CardTitle>
                <CardDescription>Añade las preguntas que formarán parte de la evaluación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.questions.map((question, index) => (
                  <div key={question.id} className="space-y-4 border p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-medium">Pregunta {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                        disabled={formData.questions.length === 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`question-${question.id}`}>Enunciado</Label>
                      <Textarea
                        id={`question-${question.id}`}
                        value={question.question}
                        onChange={(e) => handleQuestionChange(question.id, "question", e.target.value)}
                        placeholder="Escribe el enunciado de la pregunta"
                        className="min-h-[80px]"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`type-${question.id}`}>Tipo de respuesta</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value) => handleQuestionChange(question.id, "type", value)}
                        >
                          <SelectTrigger id={`type-${question.id}`}>
                            <SelectValue placeholder="Selecciona un tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Texto</SelectItem>
                            <SelectItem value="number">Numérica</SelectItem>
                            <SelectItem value="multiple">Opción múltiple</SelectItem>
                            <SelectItem value="file">Archivo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`points-${question.id}`}>Puntos</Label>
                        <Input
                          id={`points-${question.id}`}
                          type="number"
                          value={question.points}
                          onChange={(e) => handleQuestionChange(question.id, "points", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addQuestion} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir pregunta
                </Button>

                <div className="flex justify-between space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("general")}>
                    Anterior: Información General
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("students")}>
                    Siguiente: Estudiantes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Asignar estudiantes</CardTitle>
                <CardDescription>Selecciona los estudiantes que realizarán esta evaluación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="all-students" />
                    <Label htmlFor="all-students">Asignar a todos los estudiantes del curso</Label>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-md font-medium mb-4">Estudiantes de Química General</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="student-1" />
                        <Label htmlFor="student-1">Carlos Mendoza</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="student-2" />
                        <Label htmlFor="student-2">Ana López</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="student-3" />
                        <Label htmlFor="student-3">Miguel Torres</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="student-4" />
                        <Label htmlFor="student-4">Laura Martínez</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="student-5" />
                        <Label htmlFor="student-5">Pedro Gómez</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("questions")}>
                    Anterior: Preguntas
                  </Button>
                  <Button type="submit">Crear evaluación</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </DashboardShell>
  )
}
