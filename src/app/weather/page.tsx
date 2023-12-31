"use client"

import { useSearchParams } from "next/navigation";
import { Forecast } from "./_components/Forecast";
import { Weather } from "./_components/Weather";
import { Alert, Link } from "@mui/material";
import { useState } from "react";

export default function Page() {
    const [error, setError] = useState(null);

    const searchParams = useSearchParams();
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (error || !(lat && lon)) return (
        <main className="flex flex-col flex-auto items-center justify-center min-h-screen min-w-screen gap-y-6">
            <Alert severity="error" data-testid='alert' className="mx-8">
                {error || 'One or more of the coordinates are missing. Please provide the correct location.'}
            </Alert>
            <Link href="/">Change location</Link>
        </main >
    );
    return (
        <main className="flex flex-col flex-auto items-center justify-center min-h-screen min-w-screen gap-y-12 p-4">
            <Weather lat={lat} lon={lon} setError={setError} />
            <Forecast lat={lat} lon={lon} setError={setError} />
        </main>
    );
}