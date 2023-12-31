export const groupForecastDataForDay = (forecastDataOW: ForecastDataOpenWeather[]): ForecastData[] => {
    const groupedForecastData: GroupedForecastData[] = [];
    const today = new Date().toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    forecastDataOW.forEach(data => {
        const date = new Date(data.dt_txt).toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
        if (date !== today) {
            const icon = data.weather[0].icon.slice(0, -1);
            const tempMin = data.main.temp_min;
            const tempMax = data.main.temp_max;

            const found = groupedForecastData.find(f => f.date === date);
            if (found) {
                found.tempMin = Math.min(found.tempMin, tempMin);
                found.tempMax = Math.max(found.tempMax, tempMax);
                (icon in found.icons) ? found.icons[icon] += 1 : found.icons[icon] = 1;
            } else {
                groupedForecastData.push({
                    tempMin: tempMin,
                    tempMax: tempMax,
                    icons: { [icon]: 1 },
                    date: date
                })
            }
        }
    });

    return groupedForecastData.map(f => ({
        tempMin: f.tempMin,
        tempMax: f.tempMax,
        icon: getWeatherIconForDay(f.icons),
        date: f.date
    }));
}

const getWeatherIconForDay = (icons: { [key: string]: number; }) => {
    let icon = '';
    let max = 0;
    Object.entries(icons).forEach(([key, value]) => {
        if (value > max) {
            max = value;
            icon = key;
        }
    });
    return icon + 'd';
}