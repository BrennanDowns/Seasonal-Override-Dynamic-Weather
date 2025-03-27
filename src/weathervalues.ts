import { ISeasonalValues } from "@spt/models/spt/config/IWeatherConfig";

export const defaultWeather = {
    clouds: {
        values: [-1, -0.8, -0.5, 0.1, 0, 0.15, 0.4, 1],
        weights: [22, 22, 22, 15, 15, 15, 5, 4],
    },
    windSpeed: {
        values: [0, 1, 2, 3, 4],
        weights: [4, 2, 2, 1, 1],
    },
    windDirection: {
        values: [1, 2, 3, 4, 5, 6, 7, 8],
        weights: [1, 1, 1, 1, 1, 1, 1, 1],
    },
    windGustiness: {
        min: 0,
        max: 1,
    },
    rain: {
        values: [1, 2, 3, 4, 5],
        weights: [20, 2, 2, 1, 0],
    },
    rainIntensity: {
        min: 0,
        max: 0.4,
    },
    fog: {
        values: [0.0013, 0.0018, 0.002, 0.004, 0.006],
        weights: [8, 6, 4, 3, 1],
    },
    pressure: {
        min: 770,
        max: 780,
    },
    timePeriod: {
        values: [15, 30],
        weights: [1, 2],
    },
} as unknown as Partial<ISeasonalValues>;

export const noRainWeather = {
    clouds: {
        values: [-1, -0.8, -0.5, 0.1, 0, 0.15, 0.4, 1],
        weights: [22, 22, 22, 15, 15, 15, 5, 4],
    },
    windSpeed: {
        values: [0, 1, 2, 3, 4],
        weights: [4, 2, 2, 1, 1],
    },
    windDirection: {
        values: [1, 2, 3, 4, 5, 6, 7, 8],
        weights: [1, 1, 1, 1, 1, 1, 1, 1],
    },
    windGustiness: {
        min: 0,
        max: 1,
    },
    rain: {
        values: [1, 2, 3, 4, 5],
        weights: [1, 0, 0, 0, 0],
    },
    rainIntensity: {
        min: 0,
        max: 0,
    },
    fog: {
        values: [0.0013, 0.0018, 0.002, 0.004, 0.006],
        weights: [8, 6, 4, 3, 1],
    },
    pressure: {
        min: 770,
        max: 780,
    },
    timePeriod: {
        values: [15, 30],
        weights: [1, 2],
    },
} as unknown as Partial<ISeasonalValues>;

export const stormWeather = {
    clouds: {
        values: [0.4, 0.8, 1],
        weights: [1, 1, 1],
    },
    windSpeed: {
        values: [2, 3, 4],
        weights: [1, 1, 1],
    },
    windGustiness: {
        min: 0.6,
        max: 1,
    },
    rain: {
        values: [3, 4, 5],
        weights: [1, 1, 1],
    },
    rainIntensity: {
        min: 0.4,
        max: 1,
    },
    fog: {
        values: [0.004, 0.006, 0.008],
        weights: [2, 3, 2],
    },
    pressure: {
        min: 770,
        max: 780,
    },
} as unknown as Partial<ISeasonalValues>;
