
export interface RootMarine {
    geometry: Geometry;
    update_time: Date;
    type: string;
    properties: Properties;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Marine {
    wind_speed_kt: number;
    primary_swell_height: number;
    T_sea: number;
    max_wave_height: number;
    primary_swell_direction: number;
    wind_direction: number;
    wind_waves_height: number;
    sea_condition_description: string;
    primary_swell_period: number;
    beaufort_scale: number;
    time: Date;
    wave_height: number;
    sea_condition: number;
}

export interface Properties {
    timezone: string;
    insee: string;
    marine: Marine[];
    name: string;
    zone: string;
}

