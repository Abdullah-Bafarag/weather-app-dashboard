import { useState } from "react";
import type { CityData } from "../../types/CityData";
import type { WeatherDataApiResponse } from "../../types/WeatherData";
import WeatherContext from "./WeatherContext";

type Props = {
    children: React.ReactNode;
};

export function WeatherProvider({ children }: Props) {
    const [cities, setCities] = useState<CityData[]>([]);

    const [selectedCities, setSelectedCities] = useState<CityData[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherDataApiResponse | null>(null);

    const removeSelectedCity = (id: number) => {
        setSelectedCities((prev) => prev.filter((city) => city.id !== id));
    };

    return (
        <WeatherContext.Provider
            value={{
                cities,
                setCities,
                selectedCities,
                setSelectedCities,
                removeSelectedCity,
                weatherData,
                setWeatherData
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}