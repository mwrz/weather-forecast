"use client"

import { SnackbarProvider } from "notistack";
import Image from 'next/image';
import { CityInput } from "./_components/CityInput";
import { GetLocatedButton } from "./_components/GetLocatedButton";

export default function Home() {
  return (
    <main className="flex flex-col flex-auto items-center justify-center min-h-screen min-w-screen gap-y-2 p-4">
      <SnackbarProvider autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} variant='error' disableWindowBlurListener />
      <Image
        src='/partly-cloudy-day.png'
        alt="Weather icon"
        width={130}
        height={130}
        priority
        data-testid='app-icon'
      />
      <h1 className="text-2xl mb-10 text-gray-700 font-medium" data-testid='app-header'>Weather forecast</h1>
      <CityInput />
      <p className="text-gray-600">or</p>
      <GetLocatedButton />
    </main>
  )
}