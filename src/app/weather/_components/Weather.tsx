import { Link, Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import { handleRequest, getIcon, getIconAlt } from "../utils";
import Image from 'next/image';
import { WeatherInfo } from "./WeatherInfo";

interface WeatherProps {
    lat: string;
    lon: string;
    setError: Function;
}

let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export const Weather = ({ lat, lon, setError }: WeatherProps) => {
    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleRequest(`/api/weather?lat=${lat}&lon=${lon}`, setLoading, setError, setWeatherData);
    }, [lat, lon, setError]);

    useEffect(() => {
        if (weatherData?.city) {
            document.title = `${weatherData.city}, ${regionNames.of(weatherData.country)} weather forecast`;
        }
    }, [weatherData]);

    if (loading) return (
        <section className="flex flex-col items-center justify-center gap-y-5 mb-6">
            <section className="flex flex-col items-center justify-center">
                <Skeleton className="min-w-56 text-4xl" />
                <Skeleton className="min-w-36" />
            </section>
            <Skeleton variant="circular" className="min-w-24 min-h-24" />
            <Skeleton className="min-w-72" />
        </section>
    );

    return weatherData && (
        <section className="flex flex-col items-center justify-center gap-y-6">
            <section className="flex flex-col items-center justify-center">
                <h1 className="text-3xl text-gray-700 font-medium text-balance text-center" data-testid="city-name">{weatherData.city}, {regionNames.of(weatherData.country)}</h1>
                <Link href="/" className="text-xs">Change location</Link>
            </section >
            <section className="flex items-center justify-center gap-x-6">
                <Image
                    src={getIcon(weatherData.icon)}
                    alt={getIconAlt(weatherData.icon)}
                    width={100}
                    height={100}
                    priority
                    data-testid='weather-icon'
                />
                <h2 className="text-2xl text-gray-700" data-testid="temp">{Math.round(weatherData.temp)}°C</h2>
            </section>
            <section className="flex items-center justify-center gap-x-4">
                <WeatherInfo icon='/barometer.png' alt="Pressure" info={`${weatherData.pressure} hPa`} data-testid="pressure" />
                <WeatherInfo icon='/cloud.png' alt="Cloudiness" info={`${weatherData.cloudiness}%`} data-testid="cloudiness" />
                <WeatherInfo icon='/wind.png' alt="Wind speed" info={`${weatherData.windSpeed} m/s`} data-testid="wind-speed" />
            </section>
        </section >
    );
}