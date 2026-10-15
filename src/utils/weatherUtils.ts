import type { Daily } from "../types/WeatherData";

export type ForecastDay = {
    date: string;
    dayName: string;
    dayAndMonth: string;
    maxTemp: number;
    minTemp: number;
    weatherCode: number;
};

export const formatDailyForecast = (dailyData?: Daily | null): ForecastDay[] => {
    if (!dailyData || !dailyData.time) return [];

    return dailyData.time.map((dateStr: string, index: number) => {
        const dateObj = new Date(dateStr);
        return {
            date: dateStr,
            dayName: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
            dayAndMonth: dateObj.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
            maxTemp: dailyData.temperature_2m_max[index],
            minTemp: dailyData.temperature_2m_min[index],
            weatherCode: dailyData.weathercode[index],
        };
    });
};