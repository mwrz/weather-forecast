import { AddLocationAltRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";

export const GetLocatedButton = () => {
    const router = useRouter();

    const getLocated = useCallback(() => {
        const errorMessage = 'To use this feature you need to turn on the location in your device.';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (data) => router.push(`/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}`),
                () => enqueueSnackbar(errorMessage)
            );
        } else {
            enqueueSnackbar(errorMessage);
        }
    }, [router]);

    return (
        <Button variant="outlined" onClick={getLocated} data-testid='get-located-button'>
            get located
            <AddLocationAltRounded />
        </Button>
    );
}