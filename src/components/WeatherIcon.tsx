import React from "react";
import {
    Sun,
    CloudSun,
    Cloud,
    CloudFog,
    CloudDrizzle,
    CloudRain,
    CloudHail,
    CloudSnow,
    Snowflake,
    CloudLightning,
    SunDim,
} from "lucide-react";

type Props = {
    code: number;
    size?: number;
    className?: string;
};

export const WeatherIcon: React.FC<Props> = ({ code, size = 24, className = "" }) => {
    switch (code) {
        case 0:
            return <Sun size={size} className={`text-amber-500 dark:text-amber-400 shrink-0 ${className}`} />;
        case 1:
            return <SunDim size={size} className={`text-amber-500 dark:text-amber-400 shrink-0 ${className}`} />;
        case 2:
            return <CloudSun size={size} className={`text-amber-400 dark:text-amber-300 shrink-0 ${className}`} />;
        case 3:
            return <Cloud size={size} className={`text-slate-400 dark:text-slate-300 shrink-0 ${className}`} />;
        case 45:
        case 48:
            return <CloudFog size={size} className={`text-slate-400 dark:text-slate-300 shrink-0 ${className}`} />;
        case 51:
        case 53:
        case 55:
            return <CloudDrizzle size={size} className={`text-sky-400 dark:text-sky-300 shrink-0 ${className}`} />;
        case 56:
        case 57:
            return <CloudHail size={size} className={`text-teal-400 dark:text-teal-300 shrink-0 ${className}`} />;
        case 61:
        case 63:
        case 65:
            return <CloudRain size={size} className={`text-blue-500 dark:text-blue-400 shrink-0 ${className}`} />;
        case 66:
        case 67:
            return <CloudHail size={size} className={`text-cyan-500 dark:text-cyan-400 shrink-0 ${className}`} />;
        case 71:
        case 73:
        case 75:
            return <CloudSnow size={size} className={`text-sky-300 dark:text-sky-200 shrink-0 ${className}`} />;
        case 77:
            return <Snowflake size={size} className={`text-indigo-300 dark:text-indigo-200 shrink-0 ${className}`} />;
        case 80:
        case 81:
        case 82:
            return <CloudRain size={size} className={`text-blue-500 dark:text-blue-400 shrink-0 ${className}`} />;
        case 85:
        case 86:
            return <CloudSnow size={size} className={`text-sky-300 dark:text-sky-200 shrink-0 ${className}`} />;
        case 95:
        case 96:
        case 99:
            return <CloudLightning size={size} className={`text-purple-500 dark:text-purple-400 shrink-0 ${className}`} />;
        default:
            return <Sun size={size} className={`text-amber-400 dark:text-amber-300 shrink-0 ${className}`} />;
    }
};

export default WeatherIcon;
