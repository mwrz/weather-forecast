interface WeatherData {
    city: string;
    country: string;
    icon: string;
    temp: number;
    pressure: number;
    cloudiness: number;
    windSpeed: number;
}

interface ForecastData {
    tempMin: number;
    tempMax: number;
    icon: string;
    date: string;
}

interface GroupedForecastData {
    tempMin: number;
    tempMax: number;
    icons: { [key: string]: number; };
    date: string;
}