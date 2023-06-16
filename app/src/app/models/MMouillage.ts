export interface Mouillage {
    sonde :number ,
    pied_pilote:number ,
    tirant_eau :number ,
    datas: MouillageData[]
  }
  
  export interface MouillageData {
    day: string,
    marnage: number,
    seuils: SeuilsData[]
  }

  export interface SeuilsData {
    h1: string,
    low: string,
    high: string,
    h2: string,

  }