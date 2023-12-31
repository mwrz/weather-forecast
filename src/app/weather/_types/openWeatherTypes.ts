interface WeatherDataOpenWeather {
    icon: string;
}

interface ForecastDataOpenWeather {
    dt_txt: string;
    weather: WeatherDataOpenWeather[];
    main: {
        temp_min: number;
        temp_max: number;
    }
}