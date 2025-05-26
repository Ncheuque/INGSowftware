"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Lun",
    total: 120,
  },
  {
    name: "Mar",
    total: 160,
  },
  {
    name: "Mié",
    total: 180,
  },
  {
    name: "Jue",
    total: 190,
  },
  {
    name: "Vie",
    total: 210,
  },
  {
    name: "Sáb",
    total: 150,
  },
  {
    name: "Dom",
    total: 90,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
