export type MaternalRecord = {
  municipality: string
  region: string
  department: string
  births: number
  lowBirthWeightPct: number
  teenPregnancy10_14: number
  teenPregnancy15_19: number
  maternalMortality: number
  neonatalMortality: number
  childMortality: number
  malnutritionMortality: number
}

export const maternalRecords: MaternalRecord[] = [
  {
    municipality: 'Medellín',
    region: 'Valle de Aburrá',
    department: 'Antioquia',
    births: 18240,
    lowBirthWeightPct: 9.4,
    teenPregnancy10_14: 1.1,
    teenPregnancy15_19: 32.5,
    maternalMortality: 38.4,
    neonatalMortality: 9.2,
    childMortality: 11.8,
    malnutritionMortality: 2.1,
  },
  {
    municipality: 'Bello',
    region: 'Valle de Aburrá',
    department: 'Antioquia',
    births: 7680,
    lowBirthWeightPct: 8.7,
    teenPregnancy10_14: 0.9,
    teenPregnancy15_19: 29.1,
    maternalMortality: 42.3,
    neonatalMortality: 10.5,
    childMortality: 12.6,
    malnutritionMortality: 2.4,
  },
  {
    municipality: 'Itagüí',
    region: 'Valle de Aburrá',
    department: 'Antioquia',
    births: 6540,
    lowBirthWeightPct: 8.1,
    teenPregnancy10_14: 0.8,
    teenPregnancy15_19: 26.4,
    maternalMortality: 36.9,
    neonatalMortality: 9.8,
    childMortality: 11.1,
    malnutritionMortality: 1.9,
  },
  {
    municipality: 'Rionegro',
    region: 'Oriente',
    department: 'Antioquia',
    births: 4280,
    lowBirthWeightPct: 7.5,
    teenPregnancy10_14: 0.6,
    teenPregnancy15_19: 22.7,
    maternalMortality: 33.5,
    neonatalMortality: 8.4,
    childMortality: 10.2,
    malnutritionMortality: 1.6,
  },
  {
    municipality: 'La Ceja',
    region: 'Oriente',
    department: 'Antioquia',
    births: 2890,
    lowBirthWeightPct: 7.9,
    teenPregnancy10_14: 0.5,
    teenPregnancy15_19: 20.3,
    maternalMortality: 31.8,
    neonatalMortality: 7.9,
    childMortality: 9.4,
    malnutritionMortality: 1.4,
  },
  {
    municipality: 'Apartadó',
    region: 'Urabá',
    department: 'Antioquia',
    births: 5120,
    lowBirthWeightPct: 10.6,
    teenPregnancy10_14: 1.3,
    teenPregnancy15_19: 37.2,
    maternalMortality: 47.1,
    neonatalMortality: 11.4,
    childMortality: 13.9,
    malnutritionMortality: 2.8,
  },
  {
    municipality: 'Turbo',
    region: 'Urabá',
    department: 'Antioquia',
    births: 3980,
    lowBirthWeightPct: 10.1,
    teenPregnancy10_14: 1.2,
    teenPregnancy15_19: 34.8,
    maternalMortality: 44.6,
    neonatalMortality: 11.1,
    childMortality: 13.2,
    malnutritionMortality: 2.6,
  },
  {
    municipality: 'Caucasia',
    region: 'Bajo Cauca',
    department: 'Antioquia',
    births: 3360,
    lowBirthWeightPct: 9.8,
    teenPregnancy10_14: 1.0,
    teenPregnancy15_19: 33.1,
    maternalMortality: 43.9,
    neonatalMortality: 10.9,
    childMortality: 12.8,
    malnutritionMortality: 2.5,
  },
]
