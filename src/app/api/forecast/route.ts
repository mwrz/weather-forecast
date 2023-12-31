import { NextRequest } from "next/server";
import { groupForecastDataForDay } from "./utils";

export async function GET(request: NextRequest) {
    const lat = request.nextUrl.searchParams.get("lat");
    const lon = request.nextUrl.searchParams.get("lon");

    const requetUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    const forecastResponse = await fetch(requetUrl, { next: { revalidate: 300 } });
    let forecastData = await forecastResponse.json();

    if (!forecastData) {
        return Response.json({ error: 'Sorry, couldn\'t find forecast data for this location.' }, { status: 404 });
    } else if (forecastData.cod != 200) {
        return Response.json({ error: 'Sorry, something went wrong. Please check that the provided location is correct.' }, { status: forecastData.cod });
    }

    const response = groupForecastDataForDay(forecastData.list);

    return Response.json(response);
}
