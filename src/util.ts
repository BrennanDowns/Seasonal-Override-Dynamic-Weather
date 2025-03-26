import { stormyWeatherPercentChance } from "../config/config.json";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { defaultWeather, stormWeather } from "./weathervalues";

export const SeasonMap = ["SUMMER", "AUTUMN", "WINTER", "SPRING", "AUTUMN_LATE", "SPRING_EARLY", "STORM"];

export const setWeatherValues = (WeatherValues: IWeatherConfig) => {
    let randomChance = Math.floor(Math.random() * 100 + 1)
    if (stormyWeatherPercentChance > randomChance) {
        console.log("Weather is stormy!");
        WeatherValues.weather = {
            ...WeatherValues.weather,
            ...stormWeather,
        };
    } else {
        console.log("Weather is normal!");
        WeatherValues.weather = {
            ...WeatherValues.weather,
            ...defaultWeather,
        };
    }
};