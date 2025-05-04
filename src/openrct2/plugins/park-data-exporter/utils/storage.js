import { STORAGE_KEY, SERVER_CONFIG_KEY, DEFAULT_PORT } from "../config.js";

/**
 * Carrega a configuração do servidor
 * @returns {object} Configuração do servidor
 */
export function loadServerConfig() {
    const storedConfig = context.sharedStorage.get(STORAGE_KEY + "." + SERVER_CONFIG_KEY);

    if (!storedConfig) {
        return {
            port: DEFAULT_PORT,
            running: false,
            allowExternalConnections: false
        };
    }

    try {
        return JSON.parse(storedConfig);
    } catch (error) {
        console.log(`Erro ao carregar configuração do servidor: ${error.message}`);
        return {
            port: DEFAULT_PORT,
            running: false,
            allowExternalConnections: false
        };
    }
}

/**
 * Salva a configuração do servidor
 * @param {object} config - Configuração a ser salva
 */
export function saveServerConfig(config) {
    try {
        context.sharedStorage.set(STORAGE_KEY + "." + SERVER_CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
        console.log(`Erro ao salvar configuração do servidor: ${error.message}`);
    }
}

/**
 * Carrega dados salvos anteriormente
 * @param {string} key - Chave para carregar os dados
 * @param {any} defaultValue - Valor padrão caso não existam dados
 * @returns {any} Dados armazenados ou valor padrão
 */
export function loadData(key, defaultValue = null) {
    const storedData = context.sharedStorage.get(STORAGE_KEY + "." + key);

    if (!storedData) {
        return defaultValue;
    }

    try {
        return JSON.parse(storedData);
    } catch (error) {
        console.log(`Erro ao carregar dados: ${error.message}`);
        return defaultValue;
    }
}

/**
 * Salva dados para uso posterior
 * @param {string} key - Chave para armazenar os dados
 * @param {any} data - Dados a serem armazenados
 */
export function saveData(key, data) {
    try {
        context.sharedStorage.set(STORAGE_KEY + "." + key, JSON.stringify(data));
    } catch (error) {
        console.log(`Erro ao salvar dados: ${error.message}`);
    }
}
