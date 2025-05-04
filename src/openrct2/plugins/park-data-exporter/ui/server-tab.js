import { isServerActive, startServer, stopServer,
    getServerPort, setServerPort } from "../server/http-server.js";

export function createServerTab() {
return [
   { type: "label",  name: "status_lbl", x: 10, y: 30, width: 380, height: 16, text: "" },
   { type: "button", name: "toggle_btn", x: 10, y: 60, width: 120, height: 20,  text: "" },
   { type: "label",  name: "port_lbl",   x: 10, y: 90, width: 50,  height: 16, text: "Porta:" },
   { type: "textBox",name: "port_tb",    x: 70, y: 88, width: 80,  height: 16, text: "" }
];
}

export function updateServerTab(win) {
const running = isServerActive();
win.findWidget("status_lbl").text = running ?
   `Servidor ativo em http://localhost:${getServerPort()}` :
   "Servidor parado";
win.findWidget("toggle_btn").text = running ? "Parar Servidor" : "Iniciar Servidor";
win.findWidget("port_tb").text = getServerPort().toString();

// Eventos dos botões
win.findWidget("toggle_btn").onClick = () => {
   running ? stopServer() : startServer(parseInt(win.findWidget("port_tb").text, 10));
};
win.findWidget("port_tb").onChange = t => setServerPort(parseInt(t, 10) || getServerPort());
}
