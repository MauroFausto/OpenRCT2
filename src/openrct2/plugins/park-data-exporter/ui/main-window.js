import { WINDOW_WIDTH, WINDOW_HEIGHT, TAB_NAMES } from "../config.js";
import { createParkTab } from "./park-tab.js";
import { createRidesTab } from "./rides-tab.js";
import { createGuestsTab } from "./guests-tab.js";
import { createFinanceTab } from "./finance-tab.js";
import { createServerTab } from "./server-tab.js";
import { exportDataToFile } from "../utils/export.js";

// Referência à janela aberta
let mainWindow = null;

/**
 * Cria a janela principal do plugin
 */
export function createMainWindow() {
    // Se a janela já estiver aberta, foque nela ao invés de criar outra
    if (mainWindow !== null) {
        mainWindow.bringToFront();
        return;
    }

    // Define os widgets comuns a todas as abas
    const commonWidgets = [
        { type: "button", name: "export", x: WINDOW_WIDTH - 90, y: WINDOW_HEIGHT - 30, width: 80, height: 20, text: "Exportar" }
    ];

    // Cria a janela
    mainWindow = ui.openWindow({
        classification: "park-data-exporter",
        title: "Exportador de Dados",
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        minWidth: 320,
        minHeight: 220,
        maxWidth: 640,
        maxHeight: 600,

        // Define as abas da janela
        tabs: TAB_NAMES.map((name, index) => ({
            image: null,
            text: name,
            widgets: getTabWidgets(index).concat(commonWidgets)
        })),

        onTabChange: (tabIndex) => {
            updateTabContent(tabIndex);
        },

        onUpdate: () => {
            updateWindow();
        },

        onClose: () => {
            mainWindow = null;
        }
    });

    // Configurar callback para o botão de exportação
    mainWindow.findWidget("export").onClick = () => {
        exportDataToFile();
    };

    // Inicializar a primeira aba
    updateTabContent(0);
}

/**
 * Retorna os widgets específicos para uma determinada aba
 * @param {number} tabIndex - Índice da aba
 * @returns {Array} Array de widgets
 */
function getTabWidgets(tabIndex) {
    switch (tabIndex) {
        case 0: return createParkTab();
        case 1: return createRidesTab();
        case 2: return createGuestsTab();
        case 3: return createFinanceTab();
        case 4: return createServerTab();
        default: return [];
    }
}

/**
 * Atualiza o conteúdo da aba atual
 * @param {number} tabIndex - Índice da aba
 */
function updateTabContent(tabIndex) {
    // Atualizar os widgets com base na aba selecionada
    switch (tabIndex) {
        case 0: updateParkTab(mainWindow); break;
        case 1: updateRidesTab(mainWindow); break;
        case 2: updateGuestsTab(mainWindow); break;
        case 3: updateFinanceTab(mainWindow); break;
        case 4: updateServerTab(mainWindow); break;
    }
}

/**
 * Atualiza toda a janela
 */
function updateWindow() {
    if (mainWindow) {
        updateTabContent(mainWindow.tabIndex);
    }
}
