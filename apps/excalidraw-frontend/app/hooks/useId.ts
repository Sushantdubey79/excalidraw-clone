import { useState , useEffect } from "react";
import axios from "axios";

const http_url = process.env.NEXT_PUBLIC_HTTP_BACKEND_URL;


export default function (roomId : string , token : string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc1NzAxODM4Mn0.iUDIeI-ncOl4hh_M5Z4qf4sx7LJqPvoSxyW5pV7Wf6s"){

    const [idLoading , setIdLoading] = useState<boolean>(true);
    const [id , setId] = useState<number>();
    const [idError, setIdError] = useState<string>();

    const getId = async () => {

        try{
            const data = await axios.get(`${http_url}/room/${roomId}` , {
                headers : {
                    Authorization : token
                }
            })

            const response = data.data;

            setId(response.roomId)
            setIdLoading(false);
        }
        catch(e){

            console.log(e);
            setIdLoading(false);
            setIdError("Something Went wrong ! please try again")

        }
    }


    useEffect(() => {
        
        setIdLoading(true)
        setIdError((e) => undefined)
        getId();

    },[roomId,token])

    return {
        id , idLoading , idError
    }
}