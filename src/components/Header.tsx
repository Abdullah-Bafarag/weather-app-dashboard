import { Sun, Moon, CloudSunRain } from "lucide-react";
import { useTheme } from "../context/ThemeContext/ThemeContext";

export function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="mb-6 pb-6 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-linear-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20">
                        <CloudSunRain size={28} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                Weather Dashboard
                            </h1>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span>Live</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Real-time weather data and 4-days forecasts for your favorite cities.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                        onClick={toggleTheme}
                        type="button"
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300/80 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 shadow-xs hover:shadow transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    >
                        {theme === "dark" ? (
                            <>
                                <Sun size={18} className="text-amber-400 animate-spin-slow" />
                                <span className="text-xs font-semibold">Light Mode</span>
                            </>
                        ) : (
                            <>
                                <Moon size={18} className="text-indigo-600 dark:text-indigo-400" />
                                <span className="text-xs font-semibold">Dark Mode</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;