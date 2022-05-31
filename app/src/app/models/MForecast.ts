export interface RootForecast {
  geometry: Geometry;
  update_time: string;
  type: string;
  properties: Properties;
}

export interface Properties {
  insee: string;
  name: string;
  country: string;
  altitude: number;
  rain_product_available: number;
  forecast: Forecast[];
  daily_forecast: Dailyforecast[];
  timezone: string;
  bulletin_cote: number;
  probability_forecast: Probabilityforecast[];
  french_department: string;
}

export interface Probabilityforecast {
  snow_hazard_3h?: number;
  rain_hazard_3h?: number;
  storm_hazard?: number;
  time: string;
  rain_hazard_6h?: number;
  snow_hazard_6h?: number;
  freezing_hazard?: number;
}

export interface Dailyforecast {
  uv_index?: number;
  T_min?: number;
  T_sea?: number;
  daily_weather_icon: string;
  total_precipitation_24h: number;
  sunset_time: string;
  relative_humidity_min: number;
  daily_weather_description: string;
  sunrise_time: string;
  time: string;
  T_max: number;
  relative_humidity_max: number;
}

export interface Forecast {
  rain_snow_limit: number | string;
  wind_direction: number;
  iso0: number;
  T_windchill: number;
  weather_description: string;
  total_cloud_cover: number;
  snow_6h?: number;
  snow_24h?: any;
  rain_1h?: number;
  rain_3h?: number;
  rain_12h?: any;
  snow_12h?: any;
  T: number;
  P_sea: number;
  wind_speed: number;
  weather_icon: string;
  rain_6h?: number;
  relative_humidity: number;
  snow_3h?: number;
  wind_speed_gust: number;
  time: string;
  snow_1h?: number;
  wind_icon: string;
  rain_24h?: any;
  weather_confidence_index?: number;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}
    
