export function getWindDescription(speed: number): { label: string; level: "calm" | "gentle" | "moderate" | "strong" | "gale" | "storm" } {
    if (speed < 0.3) {
        return { label: "Calm", level: "calm" };
    } else if (speed >= 0.3 && speed <= 1.5) {
        return { label: "Light breeze", level: "gentle" };
    } else if (speed >= 1.6 && speed <= 3.3) {
        return { label: "Gentle breeze", level: "gentle" };
    } else if (speed >= 3.4 && speed <= 5.4) {
        return { label: "Moderate breeze", level: "moderate" };
    } else if (speed >= 5.5 && speed <= 7.9) {
        return { label: "Fresh breeze", level: "moderate" };
    } else if (speed >= 8.0 && speed <= 10.7) {
        return { label: "Strong breeze", level: "strong" };
    } else if (speed >= 10.8 && speed <= 13.8) {
        return { label: "Near gale", level: "strong" };
    } else if (speed >= 13.9 && speed <= 17.1) {
        return { label: "Gale", level: "gale" };
    } else if (speed >= 17.2 && speed <= 20.7) {
        return { label: "Strong gale", level: "gale" };
    } else if (speed >= 20.8 && speed <= 24.4) {
        return { label: "Storm", level: "storm" };
    } else if (speed >= 24.5 && speed <= 28.4) {
        return { label: "Violent storm", level: "storm" };
    } else {
        return { label: "Hurricane", level: "storm" };
    }
}

export default getWindDescription;
