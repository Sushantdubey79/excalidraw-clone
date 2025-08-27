"use client"

import useSocket from "../hooks/useSocket"
import { useEffect , useState } from "react";

export default function ChatComponent({ id , messages } : any){


    const [chat, setChat] = useState<any>([]);
    const [inp , setInp] = useState<any>();

    const {socket,loading} = useSocket();


    useEffect(() => {
        setChat((c : any) => [...c,...messages])
    },[])

    useEffect(() => {
        if (socket && !loading ){

            socket.send(JSON.stringify({
                "action" : "join",
                "roomId" : id
            }))

            socket.onmessage = (m) => {
                const message = m.data.toString();
                setChat((c : any) => [...c,message])
            }
        }

    
        
    }, [socket , loading , id])
    
    const sendMessage = () => {

        if (socket && !loading ){

            socket.send(JSON.stringify({
                "action" : "chat",
                "roomId" : id,
                "message" : inp
            }))
    }
}

    return (
        <div>
            <div>{chat.map((value : string , index : number) => {
                return <div style={{background: "pink" , width:"fit-content"}} key={index}>{value}</div>
            })}
            </div>
            <input onChange={(e) => { setInp(e.target.value)}}></input>
            <button onClick={sendMessage}>Done</button>
        </div>
        
    )

}