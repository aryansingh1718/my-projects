import { contentModel } from "./db";
import Router from "express";
const router = Router();
import { Request,Response } from "express";

router.get("/api/content/share/:id", async (req:Request, res:Response) => {
  const contentId = req.params.id;

  try {
    const content = await contentModel.findById(contentId).populate({
      path: "tags",
      select: "title -_id" 
    });

    if (!content) {
      return res.status(404).json({ msg: "Content not found" });
    }

    // Only send safe content info (not userId)
    const {  url,type,tags } = content;
    return res.json({ type,url,tags});
  } catch (err) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

//in case user doesn't pass any parameter after /share
router.get("/api/content/share", (req: Request, res: Response) => {
  return res.status(400).json({ msg: "Content ID is required in the URL" });
});


export default router;