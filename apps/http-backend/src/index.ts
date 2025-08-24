import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import { authMiddleWare } from './middleware/auth';
import { SignUpSchema , SignInSchema } from '@repo/common/types'
import { prismaClient } from '@repo/db/db'
import bcrypt from 'bcrypt'


const app = express();

app.use(express.json());

app.use(cors({
    origin : "*"
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


app.post("/signIn" , (req : express.Request,res : express.Response) => {

    let body = req.body;
    

    let {success , data , error} = SignInSchema.safeParse(body)

    if (success){

        type signInRequestDataType = typeof data;
        let requestData : signInRequestDataType = data;

        let jwtSecret = process.env.JWT_SECRET;
        
        if(jwtSecret != undefined){

            let jwtToken = jwt.sign({"username" : data?.username} ,jwtSecret, { expiresIn: '10m'});

            res.json({
                "token" : jwtToken
            });
        }
        else{
            res.status(400).json({
                error : "Bad request"
            })
        }

    }
    else{
        res.json(error);
    }
})


app.post("/room" ,authMiddleWare , (req : express.Request,res : express.Response) => {

    //@ts-ignore
    let username = req.username;

    res.send("room connected for userr")
})

app.listen(3001);
