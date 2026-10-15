import { useEffect, useState } from "react";
import { Search as SearchIcon, MapPin, Loader2, X } from "lucide-react";
import { useWeather } from "../context/WeatherContext/WeatherContext";
import type { CityData } from "../types/CityData";

export function Search() {
    const { cities, setCities, setSelectedCities } = useWeather();
    const [query, setQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = (value: string) => {
        setQuery(value);
        if (value.trim().length < 3) {
            setCities([]);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    };

    const handleClear = () => {
        setQuery("");
        setCities([]);
        setIsLoading(false);
    };

    const handleSelectCity = (city: CityData) => {
        setSelectedCities((prev: CityData[]) => {
            const isExists = prev.some((c) => c.id === city.id);
            if (isExists) return prev;
            return [...prev, city];
        });
        setCities([]);
        setQuery("");
        setIsLoading(false);
    };

    useEffect(() => {
        const trimmed = query.trim();
        if (trimmed.length < 3) {
            return;
        }

        let isCancelled = false;
        const timerId = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=5`
                );
                const data = await response.json();
                if (!isCancelled) {
                    setCities(data.results || []);
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error("Error fetching cities:", error);
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        }, 400);

        return () => {
            isCancelled = true;
            clearTimeout(timerId);
        };
    }, [query, setCities]);

    return (
        <div className="relative w-full max-w-7xl mx-auto mb-6">
            <div className="relative flex items-center">
                <SearchIcon
                    size={18}
                    className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none"
                />
                <input
                    type="text"
                    placeholder="Search city by name (e.g., Tokyo, London, Paris)..."
                    className="w-full rounded-xl pl-10 pr-20 py-3 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-700/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-sm sm:text-base"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="absolute right-3 flex items-center gap-1.5">
                    {isLoading && (
                        <Loader2
                            size={18}
                            className="animate-spin text-sky-500 dark:text-sky-400"
                        />
                    )}
                    {query.length > 0 && !isLoading && (
                        <button
                            type="button"
                            onClick={handleClear}
                            aria-label="Clear search"
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {query.trim().length >= 3 && cities.length > 0 && (
                <div className="absolute z-20 left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-lg overflow-hidden backdrop-blur-md">
                    <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {cities.map((city: CityData) => (
                            <li
                                key={city.id}
                                onClick={() => handleSelectCity(city)}
                                className="flex items-center gap-2.5 px-4 py-3 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100/80 dark:hover:bg-slate-700/60 cursor-pointer transition-colors text-sm"
                            >
                                <MapPin size={16} className="text-sky-500 dark:text-sky-400 shrink-0" />
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {city.name}
                                </span>
                                {city.admin1 && (
                                    <span className="text-slate-400 dark:text-slate-400 text-xs">
                                        ({city.admin1})
                                    </span>
                                )}
                                <span className="ml-auto text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    {city.country}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Search;