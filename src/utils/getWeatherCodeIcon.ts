function getWeatherCodeIcon(code: number): string {
    switch (code) {
        case 0:
            return "🌤️";
        case 1:
            return "🌤️";
        case 2:
            return "⛅";
        case 3:
            return "☁️";
        case 45:
            return "🌫️";
        case 48:
            return "🌫️";
        case 51:
            return "🌧️";
        case 53:
            return "🌧️";
        case 55:
            return "🌧️";  
        case 56:
            return "🌧️";
        case 57:
            return "🌧️";
        case 61:
            return "🌧️";
        case 63:
            return "🌧️";
        case 65:
            return "🌧️";
        case 66:
            return "🌧️";
        case 67:
            return "🌧️";
        case 71:
            return "🌨️";
        case 73:
            return "🌨️";
        case 75:
            return "🌨️";
        case 77:
            return "🌨️";
        case 80:
            return "🌧️";
        case 81:
            return "🌧️";
        case 82:
            return "🌧️";
        case 83:
            return "🌧️";
        case 84:
            return "🌧️";
        case 85:
            return "🌨️";
        case 86:
            return "🌨️";
        case 95:
            return "🌩️";
        case 96:
            return "🌩️";
        case 99:
            return "🌩️";
        default:
            return "🌤️ Unknown Weather Code";
    }
}

export default getWeatherCodeIcon;



/*

        case 0:
            return "🌤️ Sunny";
        case 1:
            return "🌤️ Mostly Sunny";
        case 2:
            return "⛅ Partly Cloudy";
        case 3:
            return "☁️ Overcast";
        case 45:
            return "🌫️ Foggy";
        case 48:
            return "🌫️ Depositing Fog";
        case 51:
            return "🌧️ Drizzle";
        case 53:
            return "🌧️ Moderate Drizzle";
        case 55:
            return "🌧️ Heavy Drizzle";  
        case 56:
            return "🌧️ Freezing Drizzle";
        case 57:
            return "🌧️ Heavy Freezing Drizzle";
        case 61:
            return "🌧️ Slight Rain";
        case 63:
            return "🌧️ Moderate Rain";
        case 65:
            return "🌧️ Heavy Rain";
        case 66:
            return "🌧️ Freezing Rain";
        case 67:
            return "🌧️ Heavy Freezing Rain";
        case 71:
            return "🌨️ Slight Snowfall";
        case 73:
            return "🌨️ Moderate Snowfall";
        case 75:
            return "🌨️ Heavy Snowfall";
        case 77:
            return "🌨️ Snow Grains";
        case 80:
            return "🌧️ Slight Rain Shower";
        case 81:
            return "🌧️ Moderate Rain Shower";
        case 82:
            return "🌧️ Heavy Rain Shower";
        case 83:
            return "🌧️ Slight Snow Shower";
        case 84:
            return "🌧️ Moderate Snow Shower";
        case 85:
            return "🌨️ Heavy Snow Shower";
        case 86:
            return "🌨️ Heavy Snow Shower";
        case 95:
            return "🌩️ Slight Thunderstorm";
        case 96:
            return "🌩️ Thunderstorm with Hail";
        case 99:
            return "🌩️ Heavy Thunderstorm with Hail";
        default:
            return "🌤️ Unknown Weather Code";

*/