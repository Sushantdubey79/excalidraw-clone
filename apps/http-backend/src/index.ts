import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import { authMiddleWare } from './middleware/auth';
import { SignUpSchema , SignInSchema, CreateRoomSchema } from '@repo/common/types'
import { prismaClient } from '@repo/db/db'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '@repo/backend-common/config';


const app = express();

app.use(express.json());

app.use(cors({
    origin : "*",
    allowedHeaders : ["Authorization"]
}))



app.post("/signUp" , async (req : express.Request,res : express.Response) => {

    let body = req.body;

    let {success , data , error} = SignUpSchema.safeParse(body);

    if (success){
        type signUpRequestDataType = typeof data;
        let requestData : signUpRequestDataType = data;


        if (requestData != undefined){
            const hashedPassword = await bcrypt.hash(requestData?.password , 5)

            const adduser = await prismaClient.user.create({
                data: {
                    username : requestData.username,
                    password : hashedPassword,
                    name : requestData.name
                }

            })
        }

        res.json({
            "message" : "Successfully Signed Up"
        });

    }
    else{
        res.json(error);
    }
})


app.post("/signIn" , async (req : express.Request,res : express.Response) => {

    let body = req.body;
    

    let {success , data , error} = SignInSchema.safeParse(body);


    if (success){

        type signInRequestDataType = typeof data;
        let requestData : signInRequestDataType = data;

        let jwtSecret = JWT_SECRET;

        
        if(jwtSecret != undefined && requestData != undefined){

            const resp = await prismaClient.user.findFirst({
                where: {
                "username" : requestData.username
                }
            })

            if (resp == null){

                res.status(404).json({
                    "error" :  "user not found"
                })
                return;
            }

            let jwtToken = jwt.sign({"userId" : resp?.id} , jwtSecret);
            res.json({
                "success" : "user signed up",
                "tokem" : jwtToken
            })

        }
        else{
            res.status(400).json({
                error : "Bad request"
            })
        }

    }
    else{
        console.log(error)
        res.status(404).json({
            "error" : "Bad Request"
        });
    }
})


app.post("/room" ,authMiddleWare , async (req : express.Request,res : express.Response) => {


    const {success , data, error} = CreateRoomSchema.safeParse(req.body);

    if (data == undefined){
        res.status(400).json({
            "error" : "user not found"
        })
        return;
    }

    //@ts-ignore
    let userId = req.userId


    if (userId != undefined) {

        try{

        let roomData = await prismaClient.room.create({
                data : {
                    slug : data?.name,
                    adminId : userId
                }
        })


        res.json({
            "success": "room created succesfully",
            "roomId" : roomData.id
        })

    }

    catch(e){

        console.log(`error ${e}`);

        res.status(409).json({
            "error" : "room already exist"
        });

        }
    }
    else{

        res.status(400).json({
            "error" : "user not found"
        })

    }
    
});

app.get("/chats/:roomId" , authMiddleWare , async (req,res) => {


    console.log()

    const roomId = Number(req.params.roomId);

    const chats =  await prismaClient.chat.findMany({
        where : {
            roomId : roomId
        },
        take : 50
    })

    res.json(chats);

})



app.get("/room/:slug" , authMiddleWare , async (req,res) => {

    const slug = req.params.slug;
    
    const roomInfo =  await prismaClient.room.findFirst({
        where : {
            slug : slug
        }
    })

    res.json({
        roomId : roomInfo?.id
    });

})






app.listen(3001);
