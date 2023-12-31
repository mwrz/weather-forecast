import { AutocompleteRenderInputParams, TextField, Autocomplete } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect, useCallback, SyntheticEvent } from "react";

export const CityInput = () => {
    const router = useRouter();

    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const citiesKey = 'cities';

    useEffect(() => {
        const storedCities = localStorage.getItem(citiesKey);
        if (storedCities) {
            setCities(JSON.parse(storedCities));
        }
    }, []);

    const handleOnChange = useCallback((_: SyntheticEvent<Element, Event>, newValue: string | null) => {
        if (newValue) {
            setLoading(true);
            fetch(`/api/validate-city?city=${newValue}`)
                .then(async (data) => {
                    if (!data.ok) {
                        const message = await data.json();
                        throw new Error(message.error);
                    }
                    setCities(currentCities => {
                        if (!currentCities.some((city) => city === newValue)) {
                            const newCities = [newValue, ...currentCities];
                            localStorage.setItem(citiesKey, JSON.stringify(newCities));
                            return newCities;
                        } else {
                            return currentCities;
                        }
                    })
                    if (data.redirected) {
                        router.push(data.url)
                    }
                    return data;
                })
                .catch((error) => {
                    enqueueSnackbar(error);
                })
                .finally(() => setLoading(false));
        }
    }, [router])

    const renderInput = useCallback((params: AutocompleteRenderInputParams) => (
        <TextField {...params} label="City name" />
    ), []);

    return (
        <Autocomplete
            onChange={handleOnChange}
            renderInput={renderInput}
            options={cities}
            loading={loading}
            selectOnFocus
            clearOnBlur
            freeSolo
            className="min-w-80"
            data-testid='city-input'
        />
    );
};