import { collectAllData } from "../server/api-routes.js";

/**
 * Exporta os dados para um arquivo
 * @param {string} format - Formato de exportação (JSON, CSV, etc.)
 * @returns {boolean} Verdadeiro se a exportação foi bem-sucedida
 */
export function exportDataToFile(format = "json") {
    try {
        const data = collectAllData();
        const filename = generateFilename(format);

        if (format.toLowerCase() === "json") {
            // Armazena os dados no armazenamento compartilhado
            context.sharedStorage.set('park-data-export', JSON.stringify(data));
            console.log(`Dados exportados para ${filename}`);

            // Mostra mensagem de sucesso
            if (typeof ui !== 'undefined') {
                ui.showInformation("Exportação Concluída",
                    `Os dados foram exportados e estão disponíveis no arquivo plugin.store.json como 'park-data-export'`);
            }

            return true;
        } else {
            console.log(`Formato de exportação ${format} não suportado`);
            return false;
        }
    } catch (error) {
        console.log(`Erro ao exportar dados: ${error.message}`);
        return false;
    }
}

/**
 * Gera um nome de arquivo com base no formato e data atual
 * @param {string} format - Formato do arquivo
 * @returns {string} Nome do arquivo
 */
function generateFilename(format) {
    const date = new Date();
    const timestamp = date.toISOString().replace(/[:.]/g, '-');
    return `park-export-${timestamp}.${format.toLowerCase()}`;
}

/**
 * Converte dados para o formato CSV
 * @param {object} data - Dados a serem convertidos
 * @returns {string} Conteúdo CSV
 */
function convertToCSV(data) {
    // Implementação simplificada de conversão para CSV
    let csv = '';

    // Processa dados do parque
    if (data.parkData) {
        csv += 'Park Data\n';
        for (const key in data.parkData) {
            if (typeof data.parkData[key] !== 'object') {
                csv += `${key},${data.parkData[key]}\n`;
            }
        }
        csv += '\n';
    }

    // Processa dados de atrações
    if (data.ridesData && data.ridesData.length > 0) {
        csv += 'Rides Data\n';

        // Cabeçalhos
        const headers = Object.keys(data.ridesData[0]);
        csv += headers.join(',') + '\n';

        // Dados
        data.ridesData.forEach(ride => {
            csv += headers.map(header => ride[header]).join(',') + '\n';
        });

        csv += '\n';
    }

    return csv;
}
