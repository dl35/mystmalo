export type BullEcheances = Echeance[]

export interface Echeance {
  titreEcheance: string
  pression?: string
  TS: string
  TexteCumuls?: string
  temperature?: string
  vent: string
  tMin?: string
  tMax?: string
}