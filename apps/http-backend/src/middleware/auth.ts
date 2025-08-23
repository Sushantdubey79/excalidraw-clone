
import {Request , Response , NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config"


interface decodedToken{

    username : string

}

const authMiddleWare = (req : Request, res : Response, next : NextFunction) => {

        let requestBody = req.body;

        let token = requestBody.token ?? "";

        let jwtSecret = process.env.JWT_SECRET;

        

        if (jwtSecret != undefined) {

            try{

                let valid = jwt.verify(token , JWT_SECRET) as decodedToken;

                let username = valid.username;

                //@ts-ignore
                req.username = username;

                next();

            }
            catch(e){
                console.log(e);
                res.status(401).json({
                    "error" : "unauthorized"
                })
            }

            
        }

}


export {
    authMiddleWare
}