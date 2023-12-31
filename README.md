# Weather forecast

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![PlayWright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

Repository contains NextJS application for displaying current weather and a forecast for 5 days. \
\
The user can specify the location in two ways:
* by typing the name of the city in the input, which is saved to `localStorage` and then available in the dropdown options,
* by clicking the GET LOCATED button (only if geolocation is enabled).

![image](https://github.com/mwrz/weather-forecast/assets/18627402/ae9fa281-12ef-4383-bcc5-90c3f2b7e002) ![image](https://github.com/mwrz/weather-forecast/assets/18627402/baeef862-746a-49db-a9eb-79d73ec0a7d8)

## Run the application locally
The application uses the [Open Weather API](https://openweathermap.org/api) to get weather data, so first you need to add the Open Weather API key to the `.env.local` file. \
Then you can start the application with `npm run dev` or a corresponding command if you are using a tool other than npm. \
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run unit tests, use `npm run test`. \
For end-to-end testing, you need to run the application first, and then use `npm run e2e-test` or `npm run e2e-test-ui` to view it in UI mode.

## Deploy
https://weather-forecast-drop.vercel.app/

App deployed with [Vercel](https://vercel.com/).

![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=weather-forecast-drop)


## Libraries and APIs used:

- [MUI](https://mui.com/material-ui/)
- [Open Weather API](https://openweathermap.org/api)
- [notistack](https://github.com/iamhosseindhv/notistack)
- [Tailwind CSS](https://tailwindcss.com/)
- [FlatIcon](https://www.flaticon.com)

\
_This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)._
