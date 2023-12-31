const weatherIcons: { [key: string]: { icon: string, alt: string } } = {
    '01d': { icon: 'clear-day.png', alt: 'Clear sky day' },
    '01n': { icon: 'clear-night.png', alt: 'Clear sky night' },
    '02d': { icon: 'partly-cloudy-day.png', alt: 'Few clouds day' },
    '02n': { icon: 'partly-cloudy-night.png', alt: 'Few clouds night' },
    '03': { icon: 'cloudy.png', alt: 'Scattered clouds' },
    '04': { icon: 'cloudy.png', alt: 'Broken clouds' },
    '09': { icon: 'rain.png', alt: 'Shower rain' },
    '10': { icon: 'rain.png', alt: 'Rain' },
    '11': { icon: 'thunder.png', alt: 'Thunderstorm' },
    '13': { icon: 'snow.png', alt: 'Snow' },
    '50': { icon: 'mist.png', alt: 'Mist' },
}

export const getIcon = (apiIcon: string): string => {
    const iconKey = Object.keys(weatherIcons).find(key => apiIcon.includes(key));
    return iconKey ? `/${weatherIcons[iconKey].icon}` : '';
};

export const getIconAlt = (apiIcon: string): string => {
    const iconKey = Object.keys(weatherIcons).find(key => apiIcon.includes(key));
    return iconKey ? `${weatherIcons[iconKey].alt}` : '';
};

export const handleRequest = (url: string, setLoading: Function, setError: Function, dataSetter: Function) => {
    setLoading(true);
    fetch(url)
        .then(async (data) => {
            if (!data.ok) {
                const message = await data.json();
                throw new Error(message.error);
            }
            return data.json();
        })
        .then(data => dataSetter(data))
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => setLoading(false));
}