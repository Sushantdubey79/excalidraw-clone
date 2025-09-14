import { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from 'jsonwebtoken'
import { prismaClient } from "@repo/db/db";

const ws = new WebSocketServer({port: 8080});

const users : any = [];

// interface message{

//     "action" : "join" | "leave" | "chat",
//     "roomId"? : string,
//     "message"? : string
    
// }


ws.on("connection", (socket,request) => {

    socket.send("websocket connected");

    const url = request.url as string;

    const queryParam = new URLSearchParams(url.split("?")[1]);

    const token = queryParam.get("token") ?? "";


    let userId = authMiddleWare(token);

    if (userId == null){
        ws.close();
        return;
    }


    users.push({

        userId,
        rooms : [],
        socket
    
    })
    

    socket.on("message", async (m) => {

        try{
            let message = JSON.parse(m as unknown as string)


            if (message.action === "join"){
                const user = users.find((x : any) => x.socket === socket);
                user.rooms.push(message.roomId);
            }
            
            if (message.action === "leave"){
                const user = users.find((x : any) => x.socket === socket);
                console.log(user.rooms);
                if (!user){
                    return;
                }

                user.rooms = user.rooms.filter((x : any) => x !== message.roomId);
                console.log(user.rooms);
            }

            if (message.action === "chat"){
                const addPrisma = await prismaClient.chat.create({
                    data : {
                        message : message.message,
                        roomId : message.roomId,
                        userId : userId

                    }
                })

                users.forEach((element : any) => {
                    if (element.rooms.includes(message.roomId)){

                        element.socket.send(message.message);

                    }
                });
                
            }

        }
        catch(e){
            console.log(e);
            socket.send("unable to process the request");

            }
        
        })
    })



interface decodedToken{

    userId : number

}


const authMiddleWare = (token : string) => {

        let jwtSecret = process.env.JWT_SECRET;
        

        if (jwtSecret != undefined) {

            try{

                let valid = jwt.verify(token , JWT_SECRET) as decodedToken;

                let userId = valid.userId

                return userId;

            }
            catch(e){
                console.log(e);
                return null;
            }
        }
        else{
            return null;
        }
    }
