import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { DependencyContainer } from "tsyringe";
import { seasonWeights } from "../config/config.json";
import {
	SeasonMap,
	checkForWinter,
	setWeatherValues,
	weightedSeason,
	remapSeasonWeights,
} from "./util";

class WeatherAndSeasonControl implements IPreSptLoadMod {
	preSptLoad(container: DependencyContainer): void {
		const serverConf = container.resolve<ConfigServer>("ConfigServer");
		const staticRouterModService = container.resolve<StaticRouterModService>(
			"StaticRouterModService",
		);
		this.setStaticSeason(serverConf);
		this.registerWeatherUpdateRouter(staticRouterModService, container);
	}

	private setStaticSeason(serverConf: ConfigServer): void {
		const weatherConf = serverConf.getConfig<IWeatherConfig>(
			ConfigTypes.WEATHER,
		);
		const weatherValues = weatherConf.weather.seasonValues;
		const season = weightedSeason(remapSeasonWeights(seasonWeights));
		const isWinter = season === 2;

		//set Season on startup
		weatherConf.overrideSeason = season;
		console.log("\x1b[35mSeason is:", SeasonMap[season], "\x1b[0m");

		//set Weather on startup
		setWeatherValues(weatherValues[checkForWinter(season)], isWinter);
	}

	private registerWeatherUpdateRouter(
		staticRouterModService: StaticRouterModService,
		container: DependencyContainer,
	): void {
		staticRouterModService.registerStaticRouter(
			"WeatherAndSeasonControl",
			[
				{
					url: "/client/match/local/end",
					action: async (_url, _info, _sessionId, output) => {
						const configServer =
							container.resolve<ConfigServer>("ConfigServer");
						const weatherConf = configServer.getConfig<IWeatherConfig>(
							ConfigTypes.WEATHER,
						);
						const weatherValues = weatherConf.weather.seasonValues;
						const season = weightedSeason(remapSeasonWeights(seasonWeights));
						const isWinter = season === 2;

						//set Weather on raid end
						console.log("\x1b[35mSeason is now:", SeasonMap[season], "\x1b[0m");
						weatherConf.overrideSeason = season;
						setWeatherValues(weatherValues[checkForWinter(season)], isWinter);
						return output;
					},
				},
			],
			"aki",
		);
	}
}

module.exports = { mod: new WeatherAndSeasonControl() };
