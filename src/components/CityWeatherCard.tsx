import { useEffect, useState } from "react";
import {
    MapPin,
    Clock,
    Trash2,
    Wind,
    Navigation,
    Calendar,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import type { CityData } from "../types/CityData";
import type { WeatherDataApiResponse } from "../types/WeatherData";
import ForecastCard from "./ForecastCard";
import WeatherIcon from "./WeatherIcon";
import { formatDailyForecast, type ForecastDay } from "../utils/weatherUtils";
import getWeatherCodeDescription from "../utils/getWeatherCodeDescription";
import getWindDescription from "../utils/getWindDescription";
import { useWeather } from "../context/WeatherContext/WeatherContext";

type Props = {
    city: CityData;
};

export function CityWeatherCard({ city }: Props) {
    const { removeSelectedCity } = useWeather();
    const [weatherData, setWeatherData] = useState<WeatherDataApiResponse | null>(null);
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentTime, setCurrentTime] = useState<string>("");

    const forecast_days = 5;

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setCurrentTime(`${hours}:${minutes}`);
        };
        updateTime();
        const intervalId = setInterval(updateTime, 1000 * 30);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const fetchWeatherData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=${forecast_days}`
                );
                const data = await response.json();
                if (isMounted) {
                    setWeatherData(data);
                    setForecast(formatDailyForecast(data.daily));
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };
        fetchWeatherData();

        return () => {
            isMounted = false;
        };
    }, [city.latitude, city.longitude]);

    if (isLoading || !weatherData) {
        return (
            <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs animate-pulse mb-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-1/3"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-20"></div>
                </div>
                <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/4 mb-4"></div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-24 bg-slate-100 dark:bg-slate-700/50 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    const todayForecast = forecast[0];
    const nextDaysForecast = forecast.slice(1);
    const windInfo = getWindDescription(weatherData.current_weather.windspeed);
    const weatherCode = weatherData.current_weather.weathercode;

    return (
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all duration-300 mb-6">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <MapPin size={20} className="text-sky-500 dark:text-sky-400 shrink-0" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            {city.name}
                        </h2>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                            {city.country}
                        </span>
                    </div>
                    {city.admin1 && city.admin1 !== city.name && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 ml-7 mt-0.5">
                            {city.admin1}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-700/50 px-2.5 py-1.5 rounded-lg">
                        <Clock size={14} className="text-slate-400 dark:text-slate-400" />
                        <span className="font-medium">{currentTime}</span>
                        {todayForecast && (
                            <>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <span>{todayForecast.dayName}, {todayForecast.dayAndMonth}</span>
                            </>
                        )}
                    </div>
                    <button
                        onClick={() => removeSelectedCity(city.id)}
                        type="button"
                        aria-label={`Remove ${city.name}`}
                        title={`Remove ${city.name}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Current Weather Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 items-center">
                {/* Temperature and Condition */}
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/50">
                        <WeatherIcon code={weatherCode} size={48} />
                    </div>
                    <div>
                        <div className="flex items-baseline">
                            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                {Math.round(weatherData.current_weather.temperature)}
                            </span>
                            <span className="text-2xl font-light text-slate-400 dark:text-slate-500 ml-0.5">°C</span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                            {getWeatherCodeDescription(weatherCode)}
                        </p>
                    </div>
                </div>

                {/* High / Low Temperature Badges */}
                {todayForecast && (
                    <div className="flex items-center justify-start md:justify-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
                            <ArrowUp size={16} className="text-amber-500 dark:text-amber-400" />
                            <div className="text-xs">
                                <span className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase font-semibold">High</span>
                                <span className="font-bold text-sm">{Math.round(todayForecast.maxTemp)}°C</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-500/10 dark:bg-sky-400/10 border border-sky-500/20 text-sky-700 dark:text-sky-300">
                            <ArrowDown size={16} className="text-sky-500 dark:text-sky-400" />
                            <div className="text-xs">
                                <span className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase font-semibold">Low</span>
                                <span className="font-bold text-sm">{Math.round(todayForecast.minTemp)}°C</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Wind Metrics */}
                <div className="flex items-center justify-start md:justify-end gap-3">
                    <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/50">
                        <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                            <Wind size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs text-slate-500 dark:text-slate-400">Wind:</span>
                                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                                    {weatherData.current_weather.windspeed} km/h
                                </span>
                                <Navigation
                                    size={14}
                                    className="text-sky-500 dark:text-sky-400 transition-transform"
                                    style={{
                                        transform: `rotate(${weatherData.current_weather.winddirection}deg)`,
                                    }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {windInfo.label} • {weatherData.current_weather.winddirection}°
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-sky-500 dark:text-sky-400 hidden" />
                    {/* <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        5-Day Forecast
                    </h3> */}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                    {nextDaysForecast.map((day) => (
                        <ForecastCard key={day.date} day={day} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CityWeatherCard;