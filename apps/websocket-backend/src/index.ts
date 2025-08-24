import { WebSocketServer } from "ws";


const ws = new WebSocketServer({port: 8080});

ws.on("connection", (socket) => {
    socket.send("websocket connected");

    socket.on("message", (m) => {
        socket.send(`message recieved with ${m.toString()}`);
    })
})