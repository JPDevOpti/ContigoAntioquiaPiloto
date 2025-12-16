"use client"

import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge } from '@components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { maternalRecords } from '@data/asis-maternal'
import {
  buildLowWeightDistribution,
  buildMaternalKpis,
  buildMortalitySeries,
  buildTeenPregnancySeries,
  buildTableRows,
  getMunicipalityOptions,
} from '@features/dashboard/metrics'

const barPalette = ['#2563eb', '#f97316', '#22c55e', '#0ea5e9', '#a855f7', '#f59e0b']
const piePalette = ['#2563eb', '#0ea5e9', '#14b8a6', '#22c55e', '#f59e0b', '#f97316']

export default function DashboardPage() {
  const [municipality, setMunicipality] = useState<string>('Todos')

  const options = useMemo(() => getMunicipalityOptions(maternalRecords), [])
  const kpis = useMemo(() => buildMaternalKpis(maternalRecords, municipality), [municipality])
  const teenSeries = useMemo(
    () => buildTeenPregnancySeries(maternalRecords, municipality),
    [municipality],
  )
  const mortalitySeries = useMemo(
    () => buildMortalitySeries(maternalRecords, municipality),
    [municipality],
  )
  const lowWeight = useMemo(
    () => buildLowWeightDistribution(maternalRecords, municipality),
    [municipality],
  )
  const tableRows = useMemo(() => buildTableRows(maternalRecords, municipality), [municipality])
  const totalLowWeight = lowWeight.reduce((acc, item) => acc + item.cases, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-semibold text-slate-700">Ámbito</label>
          <select
            value={municipality}
            onChange={(event) => setMunicipality(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-inner outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500">Datos mock a nivel municipal</p>
        </div>
        <Badge variant="info">Actualizado hoy</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <Card key={item.label}>
            <CardContent className="space-y-2">
              <p className="text-sm text-slate-500">{item.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-semibold text-slate-950">{item.value}</p>
                <span className="text-xs font-semibold text-emerald-700">{item.delta}</span>
              </div>
              <p className="text-xs text-slate-500">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-col gap-2 border-b border-slate-100">
            <CardTitle>Embarazo adolescente</CardTitle>
            <p className="text-sm text-slate-500">Tasas por municipio (10-14 vs 15-19 años)</p>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teenSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="teen10_14" name="10 a 14 años" fill={barPalette[0]} />
                  <Bar dataKey="teen15_19" name="15 a 19 años" fill={barPalette[1]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-2 border-b border-slate-100">
            <CardTitle>Mortalidad materna y perinatal</CardTitle>
            <p className="text-sm text-slate-500">Razones/tasas principales por municipio</p>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mortalitySeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="maternal" name="Materna (por 100k NV)" fill={barPalette[0]} />
                  <Bar dataKey="neonatal" name="Neonatal (por 1k NV)" fill={barPalette[1]} />
                  <Bar dataKey="child" name="Niñez (por 1k NV)" fill={barPalette[2]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-col gap-2 border-b border-slate-100">
            <CardTitle>Bajo peso al nacer</CardTitle>
            <p className="text-sm text-slate-500">Distribución estimada de casos</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="h-64 w-full lg:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={lowWeight}
                      dataKey="cases"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      label={(entry) => `${entry.name}`}
                    >
                      {lowWeight.map((entry, index) => (
                        <Cell key={entry.name} fill={piePalette[index % piePalette.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `${value.toFixed(0)} casos`}
                      labelFormatter={(label) => `Municipio: ${label}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-slate-600">
                  Casos estimados: {totalLowWeight.toFixed(0)} nacidos vivos con bajo peso en el
                  ámbito seleccionado.
                </p>
                <div className="space-y-1">
                  {lowWeight.map((slice, index) => (
                    <div key={slice.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: piePalette[index % piePalette.length] }}
                        />
                        <span className="text-slate-700">{slice.name}</span>
                      </div>
                      <span className="font-semibold text-slate-900">{slice.cases.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-2 border-b border-slate-100">
            <CardTitle>Resumen por municipio</CardTitle>
            <p className="text-sm text-slate-500">Indicadores materno-infantiles clave</p>
          </CardHeader>
          <CardContent className="overflow-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="pb-2 pr-4">Municipio</th>
                  <th className="pb-2 pr-4">Nacimientos</th>
                  <th className="pb-2 pr-4">% bajo peso</th>
                  <th className="pb-2 pr-4">Mat. (100k)</th>
                  <th className="pb-2 pr-4">Neo. (1k)</th>
                  <th className="pb-2 pr-4">Niñez (1k)</th>
                  <th className="pb-2 pr-4">Desnut.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableRows.map((row) => (
                  <tr key={row.name} className="align-top">
                    <td className="py-2 pr-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="py-2 pr-4">{row.births.toLocaleString('es-CO')}</td>
                    <td className="py-2 pr-4">{row.lowWeightPct.toFixed(1)}%</td>
                    <td className="py-2 pr-4">{row.maternal.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.neonatal.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.child.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.malnutrition.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
