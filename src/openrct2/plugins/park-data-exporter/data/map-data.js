export function getMapData(sample = 4) {
    // Retorna um amostragem de tiles (para não gerar JSON gigante)
    const size = map.size;
    const tiles = [];

    for (let y = 0; y < size.y; y += sample) {
        for (let x = 0; x < size.x; x += sample) {
            const el = map.getTile(x, y).elements[0];
            tiles.push({
                x, y,
                water:   el.type === "surface" ? el.hasWater : false,
                surface: el.type === "surface" ? el.surfaceObject : null
            });
        }
    }
    return { size, sampledTiles: tiles };
}
