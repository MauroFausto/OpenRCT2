import { DEFAULT_PORT, DEFAULT_HOST } from "../config.js";
import { handleApiRequest } from "./request-handler.js";
import { loadServerConfig, saveServerConfig } from "../utils/storage.js";

// Estado do servidor
let isServerRunning = false;
let serverPort = DEFAULT_PORT;
let serverInterval = null;

/**
 * Inicia o servidor HTTP
 * @param {number} port - Porta do servidor (opcional)
 * @returns {boolean} Verdadeiro se o servidor foi iniciado com sucesso
 */
export function startServer(port = null) {
    if (isServerRunning) {
        return false;
    }

    // Usa a porta especificada ou a configurada
    const config = loadServerConfig();
    serverPort = port || config.port || DEFAULT_PORT;

    // Em um ambiente real, aqui teríamos código para iniciar um servidor HTTP
    // Como estamos dentro do contexto do jogo, vamos simular o servidor com um intervalo
    // que periodicamente verifica se há requisições

    isServerRunning = true;

    // Atualiza a configuração
    config.port = serverPort;
    config.running = true;
    saveServerConfig(config);

    // Inicia um intervalo para processar requisições simuladas
    // (em um plugin real, isso seria a escuta de conexões TCP)
    serverInterval = context.setInterval(() => {
        // Simula o processamento de requisições
        console.log("Servidor processando requisições em http://" + DEFAULT_HOST + ":" + serverPort);
    }, 5000);

    console.log("Servidor HTTP iniciado na porta " + serverPort);
    return true;
}

/**
 * Para o servidor HTTP
 */
export function stopServer() {
    if (!isServerRunning) {
        return;
    }

    // Limpa o intervalo que simula o servidor
    if (serverInterval !== null) {
        context.clearInterval(serverInterval);
        serverInterval = null;
    }

    isServerRunning = false;

    // Atualiza a configuração
    const config = loadServerConfig();
    config.running = false;
    saveServerConfig(config);

    console.log("Servidor HTTP parado");
}

/**
 * Configura o servidor HTTP para iniciar/parar com base na configuração
 */
export function setupHttpServer() {
    const config = loadServerConfig();

    if (config.running) {
        startServer(config.port);
    }
}

/**
 * Verifica se o servidor está em execução
 * @returns {boolean} Verdadeiro se o servidor estiver em execução
 */
export function isServerActive() {
    return isServerRunning;
}

/**
 * Obtém a porta atual do servidor
 * @returns {number} Número da porta
 */
export function getServerPort() {
    return serverPort;
}

/**
 * Define a porta do servidor
 * @param {number} port - Nova porta
 */
export function setServerPort(port) {
    if (!isServerRunning) {
        serverPort = port;

        // Atualiza a configuração
        const config = loadServerConfig();
        config.port = port;
        saveServerConfig(config);
    }
}
