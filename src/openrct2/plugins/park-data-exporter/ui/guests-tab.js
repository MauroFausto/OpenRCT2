import { getGuestsData } from "../data/guest-data.js";

export function createGuestsTab() {
    return [
        { type: "listview", name: "guests_list", x: 5, y: 30, width: 390, height: 210,
          columns: [
              { header: "Nome", width: 140 },
              { header: "Dinheiro", width: 70, align: "right" },
              { header: "Felic.", width: 50, align: "right" },
              { header: "Energia", width: 60, align: "right" },
              { header: "Náusea", width: 60, align: "right" }
          ]
        }
    ];
}

export function updateGuestsTab(win) {
    const list = win.findWidget("guests_list");
    const guests = getGuestsData();

    list.itemCount = guests.length;
    list.getItem = i => {
        const g = guests[i];
        return [
            g.name,
            formatCurrency(g.cash),
            g.happiness.toString(),
            g.energy.toString(),
            g.nausea.toString()
        ];
    };
}

function formatCurrency(v) { return v.toLocaleString(); }
