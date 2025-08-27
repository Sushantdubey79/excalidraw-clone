import axios from "axios";
import ChatComponentServer from "../../components/ChatComponentServer";

async function getId(slug : string){

    const url = process.env.NEXT_PUBLIC_HTTP_URL;

    const data = await axios.get(`${url}/room/${slug}` , {
        headers : {
            authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc1NjI0MzEyOX0.YVBLc35GZnxXU8Zm5QIOyouCUegHVUh6C2EjH_AYkVA"
        }
    });


    console.log("data -- > " + JSON.stringify(data.data));

    return data.data.roomId

}


export default async function GetChat({ params } : { params: { slug: string }}) {

    const slug = (await params).slug;


    const id = await getId(slug) as unknown as number;


    return (
        <ChatComponentServer id={id} ></ChatComponentServer>
    )
    

}