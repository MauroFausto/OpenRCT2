export function getGuestsData() {
    return map.getAllEntities("guest").map(g => ({
        id:        g.id,
        name:      g.name,
        cash:      g.cash,
        happiness: g.happiness,
        energy:    g.energy,
        nausea:    g.nausea,
        hunger:    g.hunger,
        thirst:    g.thirst,
        currentRide: g.currentRide
    }));
}
