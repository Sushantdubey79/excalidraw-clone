import { useState , useEffect } from "react";

const ws_url = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

export default function useWebSocket(token : String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc1NzAxODM4Mn0.iUDIeI-ncOl4hh_M5Z4qf4sx7LJqPvoSxyW5pV7Wf6s" ){

    const [loading , setLoading] = useState<boolean>(true);
    const [ws , setWs] = useState<WebSocket>();
    const [error, setError] = useState<string | null>();


    useEffect(() => {
        console.log(ws_url)
        if (ws_url == undefined){
            setLoading(false);
            setError("url is undefined");
            return;
        }

        const socket = new WebSocket(ws_url + "?token="+ token);

        socket.onopen = () => {
            setLoading(false);
            setError(undefined);
            setWs(socket);
        }

        socket.onerror = (e) => {
            setLoading(false);
            setError("error to connect to websocket");
        }


    },[token])

    return {
        ws,loading,error
    }
}