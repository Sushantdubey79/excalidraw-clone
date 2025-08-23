import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config"


const ws = new WebSocketServer({port: 8080});

ws.on("connection", (socket ,request) => {

    socket.send("websocket connected");

    const url = request.url;

    if(!url){
        return;
    }

    const queryParam = new URLSearchParams(url.split("?")[1]);

    let token = queryParam.get("token");

    if  (token){

        try {

            const valid = jwt.verify(token, JWT_SECRET) as JwtPayload;
            
            const username = valid.username;

            

        }
        catch(e){

            ws.close();
            return;

        }
    }

    else{
        ws.close();
        return;
    }

    // socket.on("message", (m) => {
    //     socket.send(`message recieved with ${m.toString()}`);
    // })
})