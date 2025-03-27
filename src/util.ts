import { ISeasonalValues } from "@spt/models/spt/config/IWeatherConfig";
import { stormyWeatherPercentChance } from "../config/config.json";
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

export const remapSeasonWeights = (seasonWeights: {
	[key: string]: number;
}) => {
	return Object.keys(seasonWeights).reduce(
		(acc, key, index) => {
			acc[index] = seasonWeights[key];
			return acc;
		},
		{} as { [key: number]: number },
	);
};

export const checkForWinter = (season: number): string => {
	if (season === 2) {
		return "WINTER";
	}
	return "default";
};

export const weightedSeason = (SeasonWeight: { [key: number]: number }) => {
	const totalWeight = Object.values(SeasonWeight).reduce((x, y) => x + y, 0);
	const random = Math.floor(Math.random() * totalWeight);
	let cumulative = 0;
	for (let season = 0; season < Object.keys(SeasonWeight).length; season++) {
		cumulative = cumulative + SeasonWeight[season];
		if (random < cumulative) {
			return season;
		}
	}
	return 0; // Defaults to summer
};

export const setWeatherValues = (
	weatherValues: ISeasonalValues,
	isWinter: boolean,
): void => {
	const randomChance = Math.floor(Math.random() * 100 + 1);
	switch (true) {
		case stormyWeatherPercentChance === 0:
			console.log("\x1b[35mWeather is never raining!\x1b[0m");
			Object.assign(weatherValues, noRainWeather);
			return;
		case stormyWeatherPercentChance > randomChance && !isWinter:
			console.log("\x1b[35mWeather is stormy!\x1b[0m");
			Object.assign(weatherValues, stormWeather);
			return;
		case !isWinter:
			console.log("\x1b[35mWeather is normal!\x1b[0m");
			Object.assign(weatherValues, defaultWeather);
			return;
		default:
			console.log("\x1b[35mWeather is winter!\x1b[0m");
			return;
	}
};
