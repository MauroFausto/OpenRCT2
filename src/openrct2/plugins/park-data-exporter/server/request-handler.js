import { getParkData }     from "../data/park-data.js";
import { getRidesData }    from "../data/ride-data.js";
import { getGuestsData }   from "../data/guest-data.js";
import { getFinancialData }from "../data/finance-data.js";
import { getMapData }      from "../data/map-data.js";

export function handleApiRequest(path, query) {
    // Simples roteamento por caminho
    switch (path) {
        case "/api/park":      return JSON.stringify(getParkData());
        case "/api/rides":     return JSON.stringify(getRidesData());
        case "/api/guests":    return JSON.stringify(getGuestsData());
        case "/api/finances":  return JSON.stringify(getFinancialData());
        case "/api/map":
            // Parâmetro ?sample=N
            const s = parseInt(query.sample, 10) || 4;
            return JSON.stringify(getMapData(s));
        case "/api/all":       // pacote completo
        default:
            return JSON.stringify({
                parkData:      getParkData(),
                ridesData:     getRidesData(),
                guestsData:    getGuestsData(),
                financialData: getFinancialData(),
                mapData:       getMapData()
            });
    }
}
