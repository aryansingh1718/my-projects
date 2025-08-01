import {userModel} from "./db"
import {userSchema} from "./zod";
import { Router } from "express";
import { Request, Response } from "express";


const router = Router()
router.post("/api/signup",async(req:Request,res:Response) => {

    const safeUsername = userSchema.safeParse(req.body); 
    if(!safeUsername.success){
        return res.status(411).json({
            msg:"you sent the wrong inputs"
        })  
      }
      else{
            const userExists = await userModel.findOne({
                username:req.body.username
            })
            if(userExists){
                res.status(403).json({
                    msg:"User with this username already exists"
                })
            }
            else{
            await userModel.create({
                    username : req.body.username,
                    password : req.body.password
                })
                res.json({
                    msg:"user signed up"
                })
            }
    
      }
   
})
export default router;