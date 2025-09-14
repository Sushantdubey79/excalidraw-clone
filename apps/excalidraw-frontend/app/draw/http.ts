import axios from 'axios';

const base_url = process.env.NEXT_PUBLIC_HTTP_BACKEND_URL;

export async function getShapes(roomId : number){

    try{

        const url = `${base_url}/chats/${roomId}`

        console.log(url);
        const response = await axios.get(url , {
            headers: {
                Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc1NzAxODM4Mn0.iUDIeI-ncOl4hh_M5Z4qf4sx7LJqPvoSxyW5pV7Wf6s"
            }
        });

        const data = response.data;

        return data;

    }
    catch(e){
        console.log("error -->" + e);
        return null;
    }
}
