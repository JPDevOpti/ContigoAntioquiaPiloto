"use client"

import { useMemo, useState } from 'react'
import { Activity, BarChart3, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/cn'

type Municipio = {
  nombre: string
  poblacionTotal: number
  poblacionUrbana: number
  poblacionRural: number
  nbi: number
  areaKm2: number
  densidad: number
  corregimientos: number
  viviendas: number
  acueducto: number
  alcantarillado: number
  energia: number
  pdet: boolean
  zomac: boolean
}

const mockMunicipios: Municipio[] = [
  {
    nombre: 'Medellín',
    poblacionTotal: 2498200,
    poblacionUrbana: 2450000,
    poblacionRural: 48200,
    nbi: 9.5,
    areaKm2: 382,
    densidad: 6538,
    corregimientos: 5,
    viviendas: 810000,
    acueducto: 99,
    alcantarillado: 97,
    energia: 99,
    pdet: false,
    zomac: false
  },
  {
    nombre: 'Apartadó',
    poblacionTotal: 210000,
    poblacionUrbana: 165000,
    poblacionRural: 45000,
    nbi: 33.2,
    areaKm2: 600,
    densidad: 350,
    corregimientos: 6,
    viviendas: 62000,
    acueducto: 87,
    alcantarillado: 74,
    energia: 94,
    pdet: true,
    zomac: true
  },
  {
    nombre: 'Turbo',
    poblacionTotal: 200500,
    poblacionUrbana: 98000,
    poblacionRural: 102500,
    nbi: 41.8,
    areaKm2: 3055,
    densidad: 66,
    corregimientos: 23,
    viviendas: 58000,
    acueducto: 69,
    alcantarillado: 52,
    energia: 82,
    pdet: true,
    zomac: true
  },
  {
    nombre: 'Rionegro',
    poblacionTotal: 150000,
    poblacionUrbana: 125000,
    poblacionRural: 25000,
    nbi: 10.4,
    areaKm2: 196,
    densidad: 765,
    corregimientos: 4,
    viviendas: 52000,
    acueducto: 98,
    alcantarillado: 95,
    energia: 99,
    pdet: false,
    zomac: false
  }
]

const resumenDepartamento = {
  municipios: 125,
  poblacion: '6.7M',
  nbi: '18.5%',
  subregiones: 9
}

export default function DashboardPage() {
  const [municipio, setMunicipio] = useState<Municipio>(mockMunicipios[0])

  const highlights = useMemo(
    () => [
      {
        label: 'Cobertura departamental',
        value: `${resumenDepartamento.municipios} municipios`,
        trend: 'Subregiones: 9',
        icon: <Activity className="h-5 w-5 text-primary" />
      },
      {
        label: 'Población monitoreada',
        value: resumenDepartamento.poblacion,
        trend: 'Crecimiento 2.4% YoY',
        icon: <Users className="h-5 w-5 text-primary" />
      },
      {
        label: 'Promedio NBI',
        value: resumenDepartamento.nbi,
        trend: 'Reducción 0.6 pp',
        icon: <BarChart3 className="h-5 w-5 text-primary" />
      }
    ],
    []
  )

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.label}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardDescription>{item.label}</CardDescription>
                <CardTitle className="text-xl">{item.value}</CardTitle>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary-sky text-primary-dark">
                {item.icon}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary-dark">{item.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-2xl">Perfil municipal (mock)</CardTitle>
            <CardDescription>Datos de referencia para pruebas sin conexión a backend.</CardDescription>
          </div>
          <select
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={municipio.nombre}
            onChange={(e) => setMunicipio(mockMunicipios.find((m) => m.nombre === e.target.value) ?? mockMunicipios[0])}
          >
            {mockMunicipios.map((m) => (
              <option key={m.nombre} value={m.nombre}>
                {m.nombre}
              </option>
            ))}
          </select>
        </CardHeader>

        <CardContent className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Mapa interactivo</p>
                <p className="text-xs text-slate-500">Vista referencial de Antioquia</p>
              </div>
              <div className="mt-3 h-[420px] rounded-xl bg-gradient-to-br from-secondary-sky via-white to-primary-light border border-slate-100 grid place-items-center text-sm text-primary-dark">
                Mapa de municipios — marcador de variables pendientes de API
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <InfoBadge label="Población total" value={municipio.poblacionTotal.toLocaleString('es-CO')} />
              <InfoBadge label="Población urbana" value={municipio.poblacionUrbana.toLocaleString('es-CO')} />
              <InfoBadge label="Población rural" value={municipio.poblacionRural.toLocaleString('es-CO')} />
              <InfoBadge label="% NBI" value={`${municipio.nbi}%`} />
              <InfoBadge label="Área (km²)" value={municipio.areaKm2.toLocaleString('es-CO')} />
              <InfoBadge label="Densidad (hab/km²)" value={municipio.densidad.toLocaleString('es-CO')} />
              <InfoBadge label="Corregimientos" value={municipio.corregimientos.toString()} />
              <InfoBadge label="Viviendas" value={municipio.viviendas.toLocaleString('es-CO')} />
            </div>

            <div className="grid gap-3">
              <IndicatorBar label="% acueducto" value={municipio.acueducto} />
              <IndicatorBar label="% alcantarillado" value={municipio.alcantarillado} />
              <IndicatorBar label="% energía" value={municipio.energia} />
              <div className="grid grid-cols-2 gap-3">
                <FlagCard label="¿Es municipio PDET?" value={municipio.pdet ? 'Sí' : 'No'} />
                <FlagCard label="¿Es municipio ZOMAC?" value={municipio.zomac ? 'Sí' : 'No'} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-secondary-sky/60 px-4 py-3 shadow-sm">
      <p className="text-xs font-semibold uppercase text-primary-dark/80">{label}</p>
      <p className="text-lg font-bold text-primary-dark">{value}</p>
    </div>
  )
}

function IndicatorBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
        <span>{label}</span>
        <span className="text-primary-dark">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  )
}

function FlagCard({ label, value }: { label: string; value: string }) {
  const isPositive = value.toLowerCase() === 'sí'
  return (
    <div
      className={cn(
        'rounded-xl border px-4 py-3 text-center shadow-sm',
        isPositive
          ? 'border-primary-light bg-primary/10 text-primary-dark'
          : 'border-slate-200 bg-slate-50 text-slate-700'
      )}
    >
      <p className="text-xs font-semibold uppercase">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  )
}

