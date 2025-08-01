import { Request,Response,NextFunction } from "express";
import { userModel } from "./db";
import  jwt  from "jsonwebtoken";
const JWT_SECRET = "second_brain";
import express from "express";

 export async function userMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization;
       if(!token || !token.startsWith("Bearer ")){
            return res.status(411).json({
                msg:"Please provide your token"
            })
        }
    const actualToken = token.split(" ");
    const webToken = actualToken[1];

    try{
        const decoded = jwt.verify(webToken,JWT_SECRET) as {userId:string};
        const username = await userModel.findById(decoded.userId).select("username");
        if(!username){
            return res.status(403).json({
                msg:"user not found"
            })
        }
        (req as any).userId = decoded.userId;
        (req as any).username = username.username;
        next();
    }
    catch(e){
        return res.status(403).json({
            msg:"Invalid token"
        });
    }
}