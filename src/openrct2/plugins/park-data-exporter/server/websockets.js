// WebSocket versão _mínima_ (somente texto, sem fragmentação/mascara para server->client)

let connections = [];
const GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const crypto = require("crypto"); // Permitido no ambiente Duktape-OpenRCT2

/**
 * Cria um listener TCP em localhost:<port> e aceita conexões WebSocket.
 * Para cada nova conexão, envia dados do parque a cada 'interval' ms.
 */
export function startWebSocketServer(port = 8081, interval = 2500) {
    const server = network.createListener();

    server.on("connection", sock => {
        // Fase de handshake HTTP
        sock.once("data", data => {
            const req = data.toString();
            const keyMatch = req.match(/Sec-WebSocket-Key: (.+)/i);
            if (!keyMatch) { sock.end(); return; }

            const accept = crypto
                .createHash("sha1")
                .update(keyMatch[1].trim() + GUID, "binary")
                .digest("base64");

            sock.write(
                "HTTP/1.1 101 Switching Protocols\r\n" +
                "Upgrade: websocket\r\n" +
                "Connection: Upgrade\r\n" +
                "Sec-WebSocket-Accept: " + accept + "\r\n\r\n"
            );

            // Após handshake, adiciona à lista
            connections.push(sock);
            sock.on("close", () => {
                const idx = connections.indexOf(sock);
                if (idx > -1) connections.splice(idx, 1);
            });
        });
    });
    server.listen(port);
    console.log("WebSocket em ws://localhost:" + port);

    // Timer de broadcast
    context.setInterval(() => {
        const payload = Buffer.from(JSON.stringify(buildBroadcastPayload()));
        const frame   = buildWsFrame(payload);
        connections.forEach(c => c.write(frame));
    }, interval);
}

function buildBroadcastPayload() {
    return {
        timestamp: Date.now(),
        guests: map.getAllEntities("guest").length,
        cash:    park.cash,
        rides:   park.totalRideCount
    };
}

function buildWsFrame(buf) {
    // Só opcode 1 (texto), sem extensão nem máscara
    const len = buf.length;
    const header = [0x81]; // FIN + texto
    if (len < 126)          header.push(len);
    else if (len < 65536) { header.push(126, len >> 8, len & 0xff); }
    else {                  // Não deve acontecer aqui
        header.push(127, 0,0,0,0, (len>>24)&255, (len>>16)&255, (len>>8)&255, len&255);
    }
    return Buffer.concat([Buffer.from(header), buf]);
}
