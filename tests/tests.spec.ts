import { test, expect, Page } from '@playwright/test';

test('Shows all elements of the first page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText("To use this feature you need to turn on the location in your device.")).not.toBeVisible();
  await expect(page.getByText("Sorry, couldn't find this location.")).not.toBeVisible();
  await expect(page.getByTestId('app-icon')).toBeVisible();
  await expect(page.getByTestId('app-header')).toBeVisible();
  await expect(page.getByTestId('city-input')).toBeVisible();
  await expect(page.getByTestId('get-located-button')).toBeVisible();
});

test('Shows error when trying to use turned off geolocation', async ({ page, context }) => {
  await page.goto('/');
  await context.clearPermissions();
  const getLocatedButton = page.getByTestId('get-located-button');
  await getLocatedButton.click();

  await expect(page.getByText("To use this feature you need to turn on the location in your device.")).toBeVisible();
});

test('Shows error when provided city is not valid and doesn\'t add it to local storage', async ({ page }) => {
  await page.goto('/');
  await checkCitiesInLocalStorageAreEmpty(page);

  const cityInput = page.getByTestId('city-input').locator("input");
  await cityInput.fill('not existing city');
  await page.keyboard.press('Enter');

  await expect(page.getByText("Sorry, couldn't find this location.")).toBeVisible();
  await checkCitiesInLocalStorageAreEmpty(page);
});

test('Shows error when one or more coordinates are missing', async ({ page }) => {
  await page.goto('/weather?lat=54.42880315&lon=');

  const alert = page.getByTestId('alert')
  await expect(alert).toBeVisible();
  await expect(alert).toHaveText('One or more of the coordinates are missing. Please provide the correct location.');
  await expect(page.getByTestId('city-name')).not.toBeVisible();
});

test('Shows error when one or more coordinates are invalid', async ({ page }) => {
  await page.goto('/weather?lat=54.42880315&lon=fhgursehfs');

  const alert = page.getByTestId('alert')
  await expect(alert).toBeVisible();
  await expect(alert).toHaveText('Sorry, something went wrong. Please check that the provided location is correct.');
  await expect(page.getByTestId('city-name')).not.toBeVisible();
});

test('Shows proper weather and forecast data for given city and adds it to local storage', async ({ page }) => {
  await mockWeatherData(page);
  await mockForecastData(page);

  await page.goto('/');
  const cityInput = page.getByTestId('city-input').locator("input");
  await cityInput.fill('Gdańsk');
  await page.keyboard.press('Enter');

  await checkWeatherAndForecastData(page);

  await page.goto('/');

  await checkNumberOfCitiesInLocalStorage(page, 1);
  await checkCitiesInLocalStorage(page, 'Gdańsk');

  cityInput.click();
  const chosenCityOption = page.getByText("Gdańsk");

  await expect(chosenCityOption).toBeVisible();
  chosenCityOption.click();

  await checkNumberOfCitiesInLocalStorage(page, 1);
  await checkWeatherAndForecastData(page);
});

test('Shows proper weather and forecast data for given location', async ({ page, context }) => {
  await context.grantPermissions(['geolocation']);
  const coords = { latitude: 54.42880315, longitude: 18.798325902846855 };
  context.setGeolocation(coords);

  await mockWeatherData(page);
  await mockForecastData(page);

  await page.goto('/');
  const getLocatedButton = page.getByTestId('get-located-button');
  await getLocatedButton.click();

  await checkWeatherAndForecastData(page);
});


async function checkCitiesInLocalStorageAreEmpty(page: Page) {
  return await page.waitForFunction(() => {
    return localStorage['cities'] === undefined;
  });
}

async function checkNumberOfCitiesInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['cities']).length === e;
  }, expected);
}

async function checkCitiesInLocalStorage(page: Page, city: string) {
  return await page.waitForFunction(c => {
    return JSON.parse(localStorage['cities']).includes(c);
  }, city);
}

async function mockWeatherData(page: Page) {
  return await page.route('**/api/weather?**', async route => {
    const json = {
      city: 'Gdańsk', country: 'PL', icon: '01d', temp: 15, pressure: 1010, cloudiness: 5, windSpeed: 10
    };
    await route.fulfill({ json });
  });
}

async function mockForecastData(page: Page) {
  page.route('**/api/forecast?**', async route => {
    const json = [{
      tempMin: 10,
      tempMax: 10,
      icon: '02d',
      date: 'Sat, Dec 30',
    }, {
      tempMin: 12,
      tempMax: 15,
      icon: '03d',
      date: 'Sun, Dec 31',
    }];
    await route.fulfill({ json });
  });
}

async function checkWeatherAndForecastData(page: Page) {
  await page.waitForURL('/weather**');

  // weather data
  await expect(page.getByTestId('city-name')).toHaveText('Gdańsk, Poland');
  const weatherIcon = page.getByTestId('weather-icon');
  await expect(weatherIcon).toHaveAttribute('alt', 'Clear sky day');
  await expect(weatherIcon).toHaveAttribute('src', /clear-day.png/);
  await expect(page.getByTestId('temp')).toHaveText('15°C');
  await expect(page.getByText('1010 hPa')).toBeVisible();
  await expect(page.getByText('5%')).toBeVisible();
  await expect(page.getByText('10 m/s')).toBeVisible();

  // forecast data for Sat, Dec 30
  const firstRow = page.locator('tr').nth(0)
  await expect(firstRow.locator('td').nth(0)).toHaveText('Sat Dec 30');
  await expect(firstRow.locator('td').nth(1).locator('img')).toHaveAttribute('alt', 'Few clouds day');
  await expect(firstRow.locator('td').nth(1).locator('img')).toHaveAttribute('src', /partly-cloudy-day.png/);
  await expect(firstRow.locator('td').nth(1).locator('p')).toHaveText('10°C');

  // forecast data for Sun, Dec 31
  const secondRow = page.locator('tr').nth(1)
  await expect(secondRow.locator('td').nth(0)).toHaveText('Sun Dec 31');
  await expect(secondRow.locator('td').nth(1).locator('img')).toHaveAttribute('alt', 'Scattered clouds');
  await expect(secondRow.locator('td').nth(1).locator('img')).toHaveAttribute('src', /cloudy.png/);
  await expect(secondRow.locator('td').nth(1).locator('p')).toHaveText('12°C | 15°C');
}