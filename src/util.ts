import { stormyWeatherPercentChance } from "../config/config.json";
import { ISeasonalValues } from "@spt/models/spt/config/IWeatherConfig";
import { defaultWeather, stormWeather } from "./weathervalues";
import { chosenSeason } from "../config/config.json";

export const SeasonMap = ["SUMMER", "AUTUMN", "WINTER", "SPRING", "AUTUMN_LATE", "SPRING_EARLY", "STORM"];

export const checkForWinter = (chosenSeason: number) => {
    if (chosenSeason === 2) {
        console.log("Winter is coming!");
        return "WINTER";
    }
    console.log("Winter is not coming!");
    return "default";
}

export const setWeatherValues = (WeatherValues: ISeasonalValues) => {
    let randomChance = Math.floor(Math.random() * 100 + 1);
    if (stormyWeatherPercentChance > randomChance && chosenSeason !== 2) {
        console.log("Weather is stormy!");
        Object.assign(WeatherValues, stormWeather);
    } else if (chosenSeason !== 2) {
        console.log("Weather is normal!");
        Object.assign(WeatherValues, defaultWeather);
    } else {
        console.log("Weather is winter!");
        return; 
    }
};
