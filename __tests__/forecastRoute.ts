import '@testing-library/jest-dom';
import { groupForecastDataForDay } from '../src/app/api/forecast/utils'

beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-12-30 10:00:00'));
});

afterAll(() => {
    jest.useRealTimers();
});

describe('Forecast route', () => {
    it('groups properly forecast data for day', () => {
        const expected = [{
            tempMin: 2,
            tempMax: 8,
            icon: '02d',
            date: 'Sun, Dec 31'
        }, {
            tempMin: -1,
            tempMax: 5,
            icon: '01d',
            date: 'Mon, Jan 1'
        }]
        expect(groupForecastDataForDay(openWeatherData)).toStrictEqual(expected);
    })
})

const openWeatherData: ForecastDataOpenWeather[] = [
    {
        main: {
            temp_min: 5,
            temp_max: 7
        },
        weather: [{ icon: '01d' }],
        'dt_txt': '2023-12-30 18:00:00'
    }, {
        main: {
            temp_min: 2,
            temp_max: 2
        },
        weather: [{ icon: '01n' }],
        'dt_txt': '2023-12-31 00:00:00'
    }, {
        main: {
            temp_min: 5,
            temp_max: 7
        },
        weather: [{ icon: '02d' }],
        'dt_txt': '2023-12-31 06:00:00'
    }, {
        main: {
            temp_min: 7,
            temp_max: 8
        },
        weather: [{ icon: '03d' }],
        'dt_txt': '2023-12-31 12:00:00'
    }, {
        main: {
            temp_min: 5,
            temp_max: 7
        },
        weather: [{ icon: '02n' }],
        'dt_txt': '2023-12-31 18:00:00'
    }, {
        main: {
            temp_min: -1,
            temp_max: 0
        },
        weather: [{ icon: '01n' }],
        'dt_txt': '2024-01-01 00:00:00'
    }, {
        main: {
            temp_min: 1,
            temp_max: 3
        },
        weather: [{ icon: '02d' }],
        'dt_txt': '2024-01-01 06:00:00'
    }, {
        main: {
            temp_min: 5,
            temp_max: 5
        },
        weather: [{ icon: '03d' }],
        'dt_txt': '2024-01-01 12:00:00'
    }, {
        main: {
            temp_min: 2,
            temp_max: 3
        },
        weather: [{ icon: '10n' }],
        'dt_txt': '2023-12-31 18:00:00'
    }
]