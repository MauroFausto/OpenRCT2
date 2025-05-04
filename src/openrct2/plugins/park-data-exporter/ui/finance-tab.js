import { getFinancialData } from "../data/finance-data.js";

export function createFinanceTab() {
    return [
        { type: "label", name: "cash_lbl",       x: 10, y: 30, width: 120, height: 16, text: "Dinheiro:" },
        { type: "label", name: "cash_val",       x: 140, y: 30, width: 240, height: 16, text: "" },
        { type: "label", name: "loan_lbl",       x: 10, y: 50, width: 120, height: 16, text: "Empréstimo:" },
        { type: "label", name: "loan_val",       x: 140, y: 50, width: 240, height: 16, text: "" },
        { type: "label", name: "value_lbl",      x: 10, y: 70, width: 120, height: 16, text: "Valor do parque:" },
        { type: "label", name: "value_val",      x: 140, y: 70, width: 240, height: 16, text: "" },
        { type: "label", name: "entrance_lbl",   x: 10, y: 90, width: 120, height: 16, text: "Taxa entrada:" },
        { type: "label", name: "entrance_val",   x: 140, y: 90, width: 240, height: 16, text: "" }
    ];
}

export function updateFinanceTab(win) {
    const f = getFinancialData();
    win.findWidget("cash_val").text     = formatCurrency(f.cash);
    win.findWidget("loan_val").text     = formatCurrency(f.loan);
    win.findWidget("value_val").text    = formatCurrency(f.currentParkValue);
    win.findWidget("entrance_val").text = formatCurrency(f.entranceFee);
}

function formatCurrency(v) { return v.toLocaleString(); }
