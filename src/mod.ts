import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { DependencyContainer } from "tsyringe";
import { chosenSeason } from "../config/config.json";
import { SeasonMap, checkForWinter, setWeatherValues } from "./util";

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

		//set Season on startup
		weatherConf.overrideSeason = chosenSeason;
		console.log(
			"\x1b[35mYour choice of season is:",
			SeasonMap[chosenSeason],
			"\x1b[0m",
		);

		//set Weather on startup
		setWeatherValues(weatherValues[checkForWinter(chosenSeason)]);
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

						//set Weather on raid end
						setWeatherValues(weatherValues[checkForWinter(chosenSeason)]);
						return output;
					},
				},
			],
			"aki",
		);
	}
}

module.exports = { mod: new WeatherAndSeasonControl() };
