import { getRidesData } from "../data/ride-data.js";

export function createRidesTab() {
    return [
        { type: "listview", name: "rides_list", x: 5, y: 30, width: 390, height: 210,
          columns: [
              { header: "Nome", width: 150 },
              { header: "Status", width: 70 },
              { header: "Clientes", width: 70, align: "right" },
              { header: "Lucro", width: 90, align: "right" }
          ]
        }
    ];
}

export function updateRidesTab(win) {
    const list = win.findWidget("rides_list");
    const rides = getRidesData();

    list.itemCount = rides.length;
    list.getItem = i => {
        const r = rides[i];
        return [
            r.name,
            r.statusText,
            r.totalCustomers.toString(),
            formatCurrency(r.totalProfit)
        ];
    };
}

function formatCurrency(v) { return v.toLocaleString(); }
