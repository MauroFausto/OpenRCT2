export function getRidesData() {
    return map.rides.map(r => ({
        id:             r.id,
        name:           r.name,
        status:         r.status,
        statusText:     ["Fechado","Aberto","Testando"][r.status] || "Desconhecido",
        excitement:     r.excitement,
        intensity:      r.intensity,
        nausea:         r.nausea,
        totalCustomers: r.totalCustomers,
        totalProfit:    r.totalProfit,
        age:            r.age,
        runningCost:    r.runningCost,
        price:          r.price,
        secondaryPrice: r.secondaryPrice
    }));
}
