import axios from 'axios';

const base_url = process.env.HTTP_BACKEND_URL;

export async function getShapes(roomId : number){

    try{

        const url = `${base_url}/chats/${roomId}`
        const response = await axios.get(url , {
            headers: {
                Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc1NjI0MzEyOX0.YVBLc35GZnxXU8Zm5QIOyouCUegHVUh6C2EjH_AYkVA"
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