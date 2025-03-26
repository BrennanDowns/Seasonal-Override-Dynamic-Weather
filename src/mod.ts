import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { DependencyContainer } from "tsyringe";
import { chosenSeason } from "../config/config.json";
import { SeasonMap, setWeatherValues } from "./util";

class WeatherAndSeasonControl implements IPreSptLoadMod {
    preSptLoad(container: DependencyContainer): void {
        const serverConf = container.resolve<ConfigServer>("ConfigServer");
        const weatherValues = serverConf.getConfig<IWeatherConfig>(ConfigTypes.WEATHER);
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");

        this.setStaticSeason(serverConf);
        this.registerWeatherUpdateRouter(staticRouterModService, container);
    }

    private setStaticSeason(serverConf: ConfigServer): void {
        const WeatherValues = serverConf.getConfig<IWeatherConfig>(ConfigTypes.WEATHER);
        WeatherValues.overrideSeason = chosenSeason;
        setWeatherValues(WeatherValues);
        console.log("Your choice of season is:", SeasonMap[chosenSeason]);
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
                        const configServer = container.resolve<ConfigServer>("ConfigServer");
                        const WeatherValues = configServer.getConfig<IWeatherConfig>(ConfigTypes.WEATHER);
                        setWeatherValues(WeatherValues);
                        return output;
                    },
                },
            ],
            "aki",
        );
    }
}

module.exports = { mod: new WeatherAndSeasonControl() };
