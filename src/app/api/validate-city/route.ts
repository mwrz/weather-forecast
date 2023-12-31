import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const city = request.nextUrl.searchParams.get("city");

    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    const geocodingResponse = await fetch(requestUrl, { next: { revalidate: 300 } });
    const geocodingData = await geocodingResponse.json();

    if (!geocodingData.length) {
        return Response.json({ error: 'Sorry, couldn\'t find this location.' }, { status: 404 });
    }

    const lat = geocodingData[0].lat;
    const lon = geocodingData[0].lon;

    redirect(`/weather?lat=${lat}&lon=${lon}`);
}