
import {Request , Response , NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config"


interface decodedToken{

    userId : Number

}

const authMiddleWare = (req : Request, res : Response, next : NextFunction) => {

        let requestHeaders = req.headers;

        let token = requestHeaders.authorization ?? "";

        let jwtSecret = process.env.JWT_SECRET;


        if (jwtSecret != undefined) {

            try{

                let valid = jwt.verify(token , JWT_SECRET) as decodedToken;


                let userId = valid.userId;

                //@ts-ignore
                req.userId = userId;

                next();

            }
            catch(e){
                console.log(e);
                res.status(401).json({
                    "error" : "Not Authenticated"
                })
            }
        }
        else{
            res.status(400).json({
                    "error" : "Bad Request"
                })
        }
    }


export {
    authMiddleWare
}