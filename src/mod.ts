import { DependencyContainer } from "tsyringe";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { chosenSeason } from "../config/config.json";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { setWeatherValues, SeasonMap, checkForWinter } from "./util";

class WeatherAndSeasonControl implements IPreSptLoadMod {
    preSptLoad(container: DependencyContainer): void {
        const serverConf = container.resolve<ConfigServer>("ConfigServer");
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        this.setStaticSeason(serverConf);
        this.registerWeatherUpdateRouter(staticRouterModService, container);
    }

    private setStaticSeason(serverConf: ConfigServer): void {
        const WeatherConf = serverConf.getConfig<IWeatherConfig>(ConfigTypes.WEATHER);
        const WeatherValues = WeatherConf.weather.seasonValues;

        //set Season on startup
        WeatherConf.overrideSeason = chosenSeason;
        console.log("Your choice of season is:", SeasonMap[chosenSeason]);

        //set Weather on startup
        setWeatherValues(WeatherValues[checkForWinter(chosenSeason)]);
    }

    private registerWeatherUpdateRouter(
        staticRouterModService: StaticRouterModService,
        container: DependencyContainer
    ): void {
        staticRouterModService.registerStaticRouter(
            "WeatherAndSeasonControl",
            [
                {
                    url: "/client/match/local/end",
                    action: async (_url, _info, _sessionId, output) => {
                        const configServer = container.resolve<ConfigServer>("ConfigServer");
                        const WeatherConf = configServer.getConfig<IWeatherConfig>(ConfigTypes.WEATHER);
                        const WeatherValues = WeatherConf.weather.seasonValues;
                    
                        //set Weather on raid end
                        setWeatherValues(WeatherValues[checkForWinter(chosenSeason)]);
                        return output;
                    },
                },
            ],
            "aki"
        );
    }
}

module.exports = { mod: new WeatherAndSeasonControl() };
