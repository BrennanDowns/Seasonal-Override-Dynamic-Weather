import { ISeasonalValues } from "@spt/models/spt/config/IWeatherConfig";
import { stormyWeatherPercentChance } from "../config/config.json";
import { chosenSeason } from "../config/config.json";
import { defaultWeather, noRainWeather, stormWeather } from "./weathervalues";

export const SeasonMap = [
	"SUMMER",
	"AUTUMN",
	"WINTER",
	"SPRING",
	"AUTUMN_LATE",
	"SPRING_EARLY",
	"STORM",
];

export const checkForWinter = (chosenSeason: number): string => {
	if (chosenSeason === 2) {
		return "WINTER";
	}
	return "default";
};

export const setWeatherValues = (weatherValues: ISeasonalValues): void => {
	const randomChance = Math.floor(Math.random() * 100 + 1);
	switch (true) {
		case stormyWeatherPercentChance === 0:
			console.log("\x1b[35mWeather is never raining!\x1b[0m");
			Object.assign(weatherValues, noRainWeather);
			return;
		case stormyWeatherPercentChance > randomChance && chosenSeason !== 2:
			console.log("\x1b[35mWeather is stormy!\x1b[0m");
			Object.assign(weatherValues, stormWeather);
			return;
		case chosenSeason !== 2:
			console.log("\x1b[35mWeather is normal!\x1b[0m");
			Object.assign(weatherValues, defaultWeather);
			return;
		default:
			console.log("\x1b[35mWeather is winter!\x1b[0m");
			return;
	}
};
