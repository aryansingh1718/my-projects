const {User} = require("./mongoose");
const express = require("express");
const router = express.Router();
const z = require("zod");

const userSchema = z.object({
    username:z.string().min(1,"username required")
})

router.post("/signin",async (req,res) => {
    const parsedUserName = userSchema.safeParse(req.body);
    if(!parsedUserName.success){
        return res.status(401).json({
            msg:"Enter valid inputs"
        })
    }
    else{
        const {username} = parsedUserName.data;
        const ifExists = await User.findOne({
            username
        })
        if(ifExists){
            return res.status(401).json({
                msg:"You have already attempted the quiz"
            });
        }
        else{
            await User.create({
           username
        })
        return res.json({
            msg:"welcome to quiz"
        })
        }
       
    }
})

module.exports = router;