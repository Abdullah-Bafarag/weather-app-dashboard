import { createContext, useContext } from "react";
import type { WeatherDataApiResponse } from "../../types/WeatherData";
import type { CityData } from "../../types/CityData";

export type WeatherContextType = {
    cities: CityData[];
    setCities: React.Dispatch<React.SetStateAction<CityData[]>>;
    selectedCities: CityData[];
    setSelectedCities: React.Dispatch<React.SetStateAction<CityData[]>>;
    removeSelectedCity: (id: number) => void;
    weatherData: WeatherDataApiResponse | null;
    setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataApiResponse | null>>;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

export function useWeather(): WeatherContextType {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error("useWeather must be used within a WeatherProvider");
    }
    return context;
}

export default WeatherContext;