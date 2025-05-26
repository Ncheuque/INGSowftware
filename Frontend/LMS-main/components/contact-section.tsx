"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, FlaskRoundIcon as Flask } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    })
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contacta con nuestro equipo</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              ¿Tienes preguntas sobre nuestro simulador de laboratorio? Estamos aquí para ayudarte.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-muted-foreground">soporte@3dlabquimica.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-medium">Teléfono</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-medium">Dirección</h3>
                <p className="text-muted-foreground">Calle Principal 123, Ciudad, País</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Flask className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-medium">Soporte Técnico</h3>
                <p className="text-muted-foreground">Lunes a Viernes, 9:00 - 18:00</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="¿En qué podemos ayudarte?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.message}
                onChange={handleChange}
                required
                className="min-h-[120px]"
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar mensaje
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
