import { getParkData } from "../data/park-data.js";

/**
 * Cria os widgets para a aba de dados do parque
 * @returns {Array} Array de widgets
 */
export function createParkTab() {
    return [
        { type: "label", name: "park_name_label", x: 10, y: 30, width: 100, height: 20, text: "Nome:" },
        { type: "label", name: "park_name_value", x: 120, y: 30, width: 250, height: 20, text: "" },

        { type: "label", name: "park_value_label", x: 10, y: 50, width: 100, height: 20, text: "Valor:" },
        { type: "label", name: "park_value_value", x: 120, y: 50, width: 250, height: 20, text: "" },

        { type: "label", name: "park_guests_label", x: 10, y: 70, width: 100, height: 20, text: "Visitantes:" },
        { type: "label", name: "park_guests_value", x: 120, y: 70, width: 250, height: 20, text: "" },

        { type: "label", name: "park_rating_label", x: 10, y: 90, width: 100, height: 20, text: "Avaliação:" },
        { type: "label", name: "park_rating_value", x: 120, y: 90, width: 250, height: 20, text: "" },

        { type: "label", name: "park_entrance_fee_label", x: 10, y: 110, width: 100, height: 20, text: "Taxa de entrada:" },
        { type: "label", name: "park_entrance_fee_value", x: 120, y: 110, width: 250, height: 20, text: "" },

        { type: "label", name: "park_age_label", x: 10, y: 130, width: 100, height: 20, text: "Idade (meses):" },
        { type: "label", name: "park_age_value", x: 120, y: 130, width: 250, height: 20, text: "" },
    ];
}

/**
 * Atualiza os dados da aba do parque
 * @param {Window} window - Referência à janela
 */
export function updateParkTab(window) {
    const parkData = getParkData();

    window.findWidget("park_name_value").text = parkData.name;
    window.findWidget("park_value_value").text = formatCurrency(parkData.value);
    window.findWidget("park_guests_value").text = parkData.guests.toString();
    window.findWidget("park_rating_value").text = parkData.rating.toString();
    window.findWidget("park_entrance_fee_value").text = formatCurrency(parkData.entranceFee);
    window.findWidget("park_age_value").text = parkData.age.toString();
}

/**
 * Formata um valor como moeda
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado
 */
function formatCurrency(value) {
    return value.toLocaleString();
}
