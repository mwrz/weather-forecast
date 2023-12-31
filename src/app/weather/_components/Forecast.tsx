import { Table, TableBody, TableRow, TableCell, Skeleton } from "@mui/material"
import { getIcon, getIconAlt, handleRequest } from "../utils"
import { useEffect, useState } from "react";
import { WeatherInfo } from "./WeatherInfo";

const getTemperature = (tempMin: number, tempMax: number) => {
    return tempMin !== tempMax ?
        `${Math.round(tempMin)}°C | ${Math.round(tempMax)}°C` :
        `${Math.round(tempMin)}°C`;
}

const getDay = (date: string) => {
    return date.split(', ')[0];
}

const getDate = (date: string) => {
    return date.split(', ')[1];
}

interface ForecastProps {
    lat: string;
    lon: string;
    setError: Function;
}

export const Forecast = ({ lat, lon, setError }: ForecastProps) => {
    const [forecastData, setForecastData] = useState<ForecastData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleRequest(`/api/forecast?lat=${lat}&lon=${lon}`, setLoading, setError, setForecastData);
    }, [lat, lon, setError]);

    if (loading) return (
        <section className="flex flex-col items-center justify-center gap-y-11">
            {Array.from(Array(5).keys()).map(el => <Skeleton key={el} className="min-w-64" />)}
        </section>
    );

    return (
        <Table className="max-w-64">
            <TableBody>
                {forecastData.map((row) => (
                    <TableRow key={row.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                            <strong>{getDay(row.date)} </strong>
                            <p>{getDate(row.date)}</p>
                        </TableCell>
                        <TableCell>
                            <WeatherInfo icon={getIcon(row.icon)} alt={getIconAlt(row.icon)} info={getTemperature(row.tempMin, row.tempMax)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}