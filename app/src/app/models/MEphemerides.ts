export interface RootEphe {
  geometry: Geometry;
  type: string;
  properties: Properties;
}

export interface Properties {
  ephemeris: Ephemeris;
}

export interface Ephemeris {
  moon_phase: string;
  moon_phase_description: string;
  moonset_time: string;
  sunset_time: string;
  sunrise_time: string;
  moonrise_time: string;
  saint: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}