import { useEffect, useState } from "react";

export default function useSocket() {

    const [loading , setLoading] = useState(true);
    const [socket , setSocket]  = useState<WebSocket>();

    

    useEffect(() => {
    const ws_url = process.env.NEXT_PUBLIC_WS_URL;
    
    if (ws_url != undefined){

        const wsc = new WebSocket(ws_url + "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc1NjI0MzEyOX0.YVBLc35GZnxXU8Zm5QIOyouCUegHVUh6C2EjH_AYkVA");
        wsc.onopen = () => {

            setLoading(false);
            setSocket(wsc);
            
            }

        }
    }
    ,[])

    
    return {
        socket, loading
    }


}