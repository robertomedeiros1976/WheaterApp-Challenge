export type CurrentWheaterData = {
    coord: Coord
    weather: WeatherCondition[]
    base: string
    main: MainData
    visibility: number
    wind: WindData
    clouds: CloudsData
    dt: number
    sys: CurrentSys
    timezone: number
    id: number
    name: string
    cod: number
}

export type CurrentSys = {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}


export type WheaterData = {
  cod: string
  message: number
  cnt: number
  list: ForecastList[]
  city: City
}

export type ForecastList = {
  dt: number
  main: MainData
  weather: WeatherCondition[]
  clouds: CloudsData
  wind: WindData
  visibility: number
  pop: number
  sys: Sys
  dt_txt: string
  rain?: RainData
}

export type MainData = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

export type WeatherCondition = {
  id: number
  main: string
  description: string
  icon: string
}

export type CloudsData = {
  all: number
}

export type WindData = {
  speed: number
  deg: number
  gust: number
}

export type Sys = {
  pod: string
}

export type RainData = {
  "3h": number
}

export type City = {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export type Coord = {
  lat: number
  lon: number
}

export type ForecastDayCard = {
    day: string,
    icon: string,
    tempMax: number,
    tempMin: number,
  }


export type DailyForecastMap = {
    [key: string]: ForecastDayCard;
}