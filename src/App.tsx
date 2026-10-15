import { MapPin, Compass } from "lucide-react";
import CityWeatherCard from "./components/CityWeatherCard";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { useWeather } from "./context/WeatherContext/WeatherContext";
import type { CityData } from "./types/CityData";

const POPULAR_CITIES: CityData[] = [
    {
        id: 1,
        name: "Riyadh",
        latitude: 24.7136,
        longitude: 46.6753,
        elevation: 650,
        feature_code: "PPL",
        country_code: "SA",
        admin1_id: 2414695,
        timezone: "Asia/Riyadh",
        population: 4261932,
        country_id: 123,
        country: "Saudi Arabia",
        admin1: "Riyadh",
    },
    {
        id: 2,
        name: "London",
        latitude: 51.50853,
        longitude: -0.12574,
        elevation: 25,
        feature_code: "PPLC",
        country_code: "GB",
        admin1_id: 6269131,
        timezone: "Europe/London",
        population: 8961989,
        country_id: 2635167,
        country: "United Kingdom",
        admin1: "England",
    },
    {
        id: 3,
        name: "Tokyo",
        latitude: 35.6895,
        longitude: 139.69171,
        elevation: 40,
        feature_code: "PPLC",
        country_code: "JP",
        admin1_id: 1850144,
        timezone: "Asia/Tokyo",
        population: 13515271,
        country_id: 1861060,
        country: "Japan",
        admin1: "Tokyo",
    },
    {
        id: 4,
        name: "New York",
        latitude: 40.71427,
        longitude: -74.00597,
        elevation: 10,
        feature_code: "PPL",
        country_code: "US",
        admin1_id: 5128638,
        timezone: "America/New_York",
        population: 8804190,
        country_id: 6252001,
        country: "United States",
        admin1: "New York",
    },
];

function App() {
    const { selectedCities, setSelectedCities } = useWeather();

    const handleAddPreset = (city: CityData) => {
        setSelectedCities((prev) => {
            if (prev.some((c) => c.id === city.id)) return prev;
            return [...prev, city];
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-6xl w-full mx-auto transition-colors duration-200">
            <main>
                <Header />
                <Search />

                {selectedCities && selectedCities.length > 0 ? (
                    <div className="space-y-4">
                        {selectedCities.map((city) => (
                            <CityWeatherCard key={city.id} city={city} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xs">
                        <div className="mx-auto w-12 h-12 rounded-full bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-500 dark:text-sky-400 mb-3">
                            <Compass size={24} />
                        </div>
                        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            No cities tracked yet
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                            Search for any city above, or pick one of these popular destinations to get started:
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                            {POPULAR_CITIES.map((city) => (
                                <button
                                    key={city.id}
                                    type="button"
                                    onClick={() => handleAddPreset(city)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                                >
                                    <MapPin size={12} className="text-sky-500" />
                                    <span>{city.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <footer className="mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400 dark:text-slate-500">
                <p>
                    Weather Dashboard app - Powered by{" "}
                    <a
                        href="https://github.com/Abdullah-Bafarag"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-slate-600 dark:hover:text-slate-300"
                    >
                        Abdullah-Bafarag
                    </a>
                    . Real-time updates & 4-days forecasts.
                </p>
            </footer>
        </div>
    );
}

export default App;
