import { userMiddleware } from "./middleware";
import Router from "express";
import { Request, Response } from "express";
import { contentModel } from "./db";
import { contentSchema, userSchema } from "./zod";
import { AuthenticatedRequest } from "./types"; // or "./types/express"
import { tagsSchema } from "./zod";
import { tagsModel } from "./db";

const router = Router();
router.post("/api/content",userMiddleware, async (req:AuthenticatedRequest,res:Response) =>  {
        const parsedContent = contentSchema.safeParse(req.body);
        if(!parsedContent.success){
           return res.status(411).json({
            msg:"enter correct inputs"
        });
        }
        else{
            const {type,url,title,tags} = parsedContent.data;
            const userId = req.userId;
            try{
                const tagsId = await Promise.all(tags.map(async (tagTitle:string) => {
                    const existingTag = await tagsModel.findOne({
                        title:tagTitle
                    });
                    if(existingTag){
                        return existingTag._id;
                    }
                    else{
                        const newTag = await tagsModel.create({
                            title:tagTitle
                        });
                        return newTag._id
                    }
                }));
                  await contentModel.create({
                type,
                url,
                title,
                tags:tagsId,
                userId
            })
            res.json({
                msg:"content added"
            })
            }catch(e){
                res.status(500).json({
                    msg:"Internal server error"
                })
            }
          
        }
})

router.get("/api/content",userMiddleware,async(req:AuthenticatedRequest,res:Response) => {
    const userId = req.userId
        try{
            const contents = await contentModel.find({userId}).populate({
                path:"tags",
                select:"title -_id"
            });
            res.json({
                contents
            })
        }
        catch(e){
            console.log(e);
            res.status(500).json({
                msg:"failed to get the content"
            })
        }
})

router.delete("/api/content",userMiddleware,async(req:AuthenticatedRequest,res:Response) => {
    const userId = req.userId;
    const contentId = req.query.id as string;
        if (!contentId) {
        return res.status(400).json({ msg: "Content ID is required" });
    }
    try{
        const content = await contentModel.findOne({_id:contentId,userId});
                if (!content) {
            return res.status(404).json({ msg: "Content not found or unauthorized" });
        }
        await contentModel.deleteOne({ _id: contentId });
        return res.json({
            msg:"Content deleted successfully"
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            msg:"Internal server error"
        })
    }

})
export default router;