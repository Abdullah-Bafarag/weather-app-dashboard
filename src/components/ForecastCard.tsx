import WeatherIcon from "./WeatherIcon";
import type { ForecastDay } from "../utils/weatherUtils";

type Props = {
    day: ForecastDay;
};

function ForecastCard({ day }: Props) {
    return (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-xl text-center border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex flex-col items-center justify-between gap-2 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200">
            <p className="font-semibold text-slate-700 dark:text-slate-200 text-xs tracking-wide uppercase">
                {day.dayName}
            </p>
            <div className="my-1 flex items-center justify-center p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <WeatherIcon code={day.weatherCode} size={26} />
            </div>
            <div className="flex items-center gap-1.5 text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-100">{Math.round(day.maxTemp)}°</span>
                <span className="text-slate-400 dark:text-slate-500">/</span>
                <span className="text-slate-500 dark:text-slate-400">{Math.round(day.minTemp)}°</span>
            </div>
        </div>
    );
}

export default ForecastCard;