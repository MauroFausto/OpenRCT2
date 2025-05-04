/**
 * Coleta todos os dados do parque
 * @returns {object} Objeto com os dados do parque
 */
export function getParkData() {
    return {
        name: park.name,
        cash: park.cash,
        rating: park.rating,
        guests: park.guests,
        totalRideCount: park.totalRideCount,
        value: park.value,
        entranceFee: park.entranceFee,
        age: park.parkAgeInMonths,
        size: {
            x: map.size.x,
            y: map.size.y
        }
    };
}

/**
 * Coleta dados sobre a configuração do parque
 * @returns {object} Configurações do parque
 */
export function getParkConfiguration() {
    return {
        openStatus: park.getFlag("open"),
        freeParkEntry: park.getFlag("freeParkEntry"),
        forbidHighConstruction: park.getFlag("forbidHighConstruction"),
        forbidLandscapeChanges: park.getFlag("forbidLandscapeChanges"),
        forbidTreeRemoval: park.getFlag("forbidTreeRemoval"),
        forbidMarketingCampaigns: park.getFlag("forbidMarketingCampaigns"),
        preferLessIntenseRides: park.getFlag("preferLessIntenseRides"),
        preferMoreIntenseRides: park.getFlag("preferMoreIntenseRides")
    };
}

/**
 * Calcula a distribuição de visitantes no parque
 * @returns {object} Estatísticas de distribuição
 */
export function getGuestDistribution() {
    // Inicializa contadores
    const distribution = {
        onRides: 0,
        inQueues: 0,
        onPaths: 0,
        inShops: 0,
        lookingAtScenery: 0,
        lostOrStuck: 0
    };

    // Conta os visitantes em cada categoria
    map.getAllEntities("guest").forEach(guest => {
        if (guest.rideId !== null && guest.isOnRide) {
            distribution.onRides++;
        } else if (guest.rideId !== null) {
            distribution.inQueues++;
        } else if (guest.isInShop) {
            distribution.inShops++;
        } else if (guest.isLookingAtScenery) {
            distribution.lookingAtScenery++;
        } else if (guest.lostCountdown > 0) {
            distribution.lostOrStuck++;
        } else {
            distribution.onPaths++;
        }
    });

    return distribution;
}
