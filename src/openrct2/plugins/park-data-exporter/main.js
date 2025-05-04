/// <reference path="../../../../distribution/openrct2.d.ts" />

import { PLUGIN_NAME, PLUGIN_VERSION, API_VERSION } from "./config.js";
import { createMainWindow } from "./ui/main-window.js";
import { setupHttpServer } from "./server/http-server.js";
import { registerCustomActions } from "./server/api-routes.js";

/**
 * Função principal do plugin, executada quando é carregado
 */
function main() {
    console.log(`${PLUGIN_NAME} v${PLUGIN_VERSION} inicializado!`);

    if (typeof ui !== 'undefined') {
        // Registrar item no menu do jogo
        ui.registerMenuItem("Exportador de Dados", () => {
            createMainWindow();
        });
    }

    // Registrar ações personalizadas para uso no modo servidor (headless)
    registerCustomActions();
}

/**
 * Registro do plugin no OpenRCT2
 */
registerPlugin({
    name: PLUGIN_NAME,
    version: PLUGIN_VERSION,
    authors: ["Seu Nome"],
    type: "remote",
    licence: "MIT",
    targetApiVersion: API_VERSION,
    main: main
});
