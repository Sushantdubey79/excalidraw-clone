import axios from "axios";
import ChatComponent from "./ChatComponent";

export default async function ChatComponentServer({ id } : {id :number} ){

    const url = process.env.NEXT_PUBLIC_HTTP_URL;

    const response = await axios.get(`${url}/chats/${id}`,{ headers : {
            authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc1NjI0MzEyOX0.YVBLc35GZnxXU8Zm5QIOyouCUegHVUh6C2EjH_AYkVA"
        }});

    const chatData = response.data;

    const messageArray = chatData.map((m : any) => {
        return m.message;
    })


    console.log("messageArray --> " + messageArray)


    return (
        <ChatComponent id={id} messages={messageArray} />
    )


}