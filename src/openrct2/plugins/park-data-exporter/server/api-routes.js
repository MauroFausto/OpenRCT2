import { getParkData } from "../data/park-data.js";
import { getRidesData } from "../data/ride-data.js";
import { getGuestsData } from "../data/guest-data.js";
import { getFinancialData } from "../data/finance-data.js";
import { getMapData } from "../data/map-data.js";

/**
 * Registra ações personalizadas para acessar os dados via API
 */
export function registerCustomActions() {
    // Ação para obter todos os dados
    context.registerAction(
        "park-data-export",
        (args) => {
            // Função de consulta - verifica se a ação é válida
            return {
                parkData: true,
                ridesData: true,
                guestsData: true,
                staffData: true,
                financialData: true
            };
        },
        (args) => {
            // Função de execução - retorna os dados solicitados
            return collectAllData();
        }
    );

    // Ação para obter apenas os dados do parque
    context.registerAction(
        "park-data",
        (args) => { return true; },
        (args) => { return getParkData(); }
    );

    // Ação para obter apenas os dados de atrações
    context.registerAction(
        "rides-data",
        (args) => { return true; },
        (args) => { return getRidesData(); }
    );

    // Ação para obter apenas os dados de visitantes
    context.registerAction(
        "guests-data",
        (args) => { return true; },
        (args) => { return getGuestsData(); }
    );

    // Ação para obter apenas os dados financeiros
    context.registerAction(
        "financial-data",
        (args) => { return true; },
        (args) => { return getFinancialData(); }
    );

    // Ação para obter apenas os dados do mapa
    context.registerAction(
        "map-data",
        (args) => { return true; },
        (args) => { return getMapData(); }
    );
}

/**
 * Coleta todos os dados disponíveis
 * @returns {object} Objeto com todos os dados
 */
function collectAllData() {
    return {
        parkData: getParkData(),
        ridesData: getRidesData(),
        guestsData: getGuestsData(),
        financialData: getFinancialData(),
        mapData: getMapData(),
        timestamp: Date.now()
    };
}
