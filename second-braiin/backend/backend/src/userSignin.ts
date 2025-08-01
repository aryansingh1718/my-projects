import jwt from "jsonwebtoken";
const  JWT_SECRET = "second_brain";
import { Router } from "express";
import { Request, Response } from "express";
import {userModel} from "./db"
import {userSchema} from "./zod";

const router = Router();
router.post("/api/signin",async(req:Request,res:Response) => {
    const safeUsername = userSchema.safeParse(req.body);
    if(!safeUsername.success){
        return res.status(411).json({
            msg:"enter correct inputs"
        });
    }
    else{
        const {username,password} = safeUsername.data;
        const ifExists = await userModel.findOne({
            username,
        })
        if(ifExists){
            const token = jwt.sign({
                userId: ifExists._id
            },JWT_SECRET);
            res.json({
                msg:"Here is your token",
                token
            });
        }
        else{
            res.status(403).json({
                msg:"user with given username doesn't exist"
            });
        }
    }
});
export default router;