import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const lat = request.nextUrl.searchParams.get("lat");
    const lon = request.nextUrl.searchParams.get("lon");

    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    const weatherResponse = await fetch(requestUrl, { next: { revalidate: 300 } });
    const weatherData = await weatherResponse.json();

    if (!weatherData) {
        return Response.json({ error: 'Sorry, couldn\'t find weather data for this location.' }, { status: 404 });
    } else if (weatherData.cod != 200) {
        return Response.json({ error: 'Sorry, something went wrong. Please check that the provided location is correct.' }, { status: weatherData.cod });
    }

    const response: WeatherData = {
        city: weatherData.name,
        country: weatherData.sys.country,
        icon: weatherData.weather[0].icon,
        temp: weatherData.main.temp,
        pressure: weatherData.main.pressure,
        cloudiness: weatherData.clouds.all,
        windSpeed: weatherData.wind.speed
    }
    return Response.json(response);
}