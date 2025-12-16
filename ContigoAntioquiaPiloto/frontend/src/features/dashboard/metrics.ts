import { MaternalRecord } from '@data/asis-maternal'

export type MaternalKpi = {
  label: string
  value: string
  delta: string
  description: string
}

type TeenPregnancyRow = {
  name: string
  teen10_14: number
  teen15_19: number
}

type MortalityRow = {
  name: string
  maternal: number
  neonatal: number
  child: number
}

type LowWeightSlice = {
  name: string
  cases: number
}

type TableRow = {
  name: string
  births: number
  lowWeightPct: number
  maternal: number
  neonatal: number
  child: number
  malnutrition: number
}

const numberFormatter = new Intl.NumberFormat('es-CO')

const formatDelta = (delta: number) => {
  const rounded = Math.abs(delta).toFixed(1)
  const sign = delta > 0 ? '+' : delta < 0 ? '−' : '±'
  return `${sign}${rounded}% vs promedio`
}

const filterByMunicipality = (records: MaternalRecord[], municipality: string) => {
  if (!municipality || municipality === 'Todos') return records
  return records.filter((item) => item.municipality === municipality)
}

export const getMunicipalityOptions = (records: MaternalRecord[]) => {
  const options = Array.from(new Set(records.map((item) => item.municipality))).sort()
  return ['Todos', ...options]
}

export const buildMaternalKpis = (records: MaternalRecord[], municipality: string): MaternalKpi[] => {
  const scoped = filterByMunicipality(records, municipality)
  const birthsTotal = scoped.reduce((acc, item) => acc + item.births, 0)
  const avgLowWeight = scoped.reduce((acc, item) => acc + item.lowBirthWeightPct, 0) / scoped.length
  const avgMaternal = scoped.reduce((acc, item) => acc + item.maternalMortality, 0) / scoped.length
  const avgNeonatal = scoped.reduce((acc, item) => acc + item.neonatalMortality, 0) / scoped.length
  const baselineLow =
    records.reduce((acc, item) => acc + item.lowBirthWeightPct, 0) / Math.max(records.length, 1)
  const baselineMaternal =
    records.reduce((acc, item) => acc + item.maternalMortality, 0) / Math.max(records.length, 1)
  const baselineNeonatal =
    records.reduce((acc, item) => acc + item.neonatalMortality, 0) / Math.max(records.length, 1)
  const baselineBirths =
    records.reduce((acc, item) => acc + item.births, 0) / Math.max(records.length, 1)

  return [
    {
      label: 'Nacimientos',
      value: numberFormatter.format(birthsTotal),
      delta: formatDelta(((birthsTotal - baselineBirths) / baselineBirths) * 100),
      description: municipality === 'Todos' ? 'Total municipal agregado' : `Ámbito: ${municipality}`,
    },
    {
      label: 'Bajo peso al nacer',
      value: `${avgLowWeight.toFixed(1)}%`,
      delta: formatDelta(((avgLowWeight - baselineLow) / baselineLow) * 100),
      description: 'Promedio municipal',
    },
    {
      label: 'Mortalidad materna',
      value: avgMaternal.toFixed(1),
      delta: formatDelta(((avgMaternal - baselineMaternal) / baselineMaternal) * 100),
      description: 'Razón por 100.000 NV',
    },
    {
      label: 'Mortalidad neonatal',
      value: avgNeonatal.toFixed(1),
      delta: formatDelta(((avgNeonatal - baselineNeonatal) / baselineNeonatal) * 100),
      description: 'Tasa por 1.000 NV',
    },
  ]
}

export const buildTeenPregnancySeries = (
  records: MaternalRecord[],
  municipality: string,
  limit = 6,
): TeenPregnancyRow[] => {
  const scoped = filterByMunicipality(records, municipality)
  return [...scoped]
    .sort((a, b) => b.teenPregnancy15_19 - a.teenPregnancy15_19)
    .slice(0, limit)
    .map((item) => ({
      name: item.municipality,
      teen10_14: item.teenPregnancy10_14,
      teen15_19: item.teenPregnancy15_19,
    }))
}

export const buildMortalitySeries = (
  records: MaternalRecord[],
  municipality: string,
  limit = 6,
): MortalityRow[] => {
  const scoped = filterByMunicipality(records, municipality)
  return [...scoped]
    .sort((a, b) => b.maternalMortality - a.maternalMortality)
    .slice(0, limit)
    .map((item) => ({
      name: item.municipality,
      maternal: item.maternalMortality,
      neonatal: item.neonatalMortality,
      child: item.childMortality,
    }))
}

export const buildLowWeightDistribution = (
  records: MaternalRecord[],
  municipality: string,
  limit = 6,
): LowWeightSlice[] => {
  const scoped = filterByMunicipality(records, municipality)
  return [...scoped]
    .map((item) => ({
      name: item.municipality,
      cases: (item.births * item.lowBirthWeightPct) / 100,
    }))
    .sort((a, b) => b.cases - a.cases)
    .slice(0, limit)
}

export const buildTableRows = (
  records: MaternalRecord[],
  municipality: string,
  limit = 8,
): TableRow[] => {
  const scoped = filterByMunicipality(records, municipality)
  return [...scoped]
    .sort((a, b) => b.maternalMortality - a.maternalMortality)
    .slice(0, limit)
    .map((item) => ({
      name: item.municipality,
      births: item.births,
      lowWeightPct: item.lowBirthWeightPct,
      maternal: item.maternalMortality,
      neonatal: item.neonatalMortality,
      child: item.childMortality,
      malnutrition: item.malnutritionMortality,
    }))
}
