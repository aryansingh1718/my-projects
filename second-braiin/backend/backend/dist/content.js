"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const zod_1 = require("./zod");
const db_2 = require("./db");
const router = (0, express_1.default)();
router.post("/api/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedContent = zod_1.contentSchema.safeParse(req.body);
    if (!parsedContent.success) {
        return res.status(411).json({
            msg: "enter correct inputs"
        });
    }
    else {
        const { type, url, title, tags } = parsedContent.data;
        const userId = req.userId;
        try {
            const tagsId = yield Promise.all(tags.map((tagTitle) => __awaiter(void 0, void 0, void 0, function* () {
                const existingTag = yield db_2.tagsModel.findOne({
                    title: tagTitle
                });
                if (existingTag) {
                    return existingTag._id;
                }
                else {
                    const newTag = yield db_2.tagsModel.create({
                        title: tagTitle
                    });
                    return newTag._id;
                }
            })));
            yield db_1.contentModel.create({
                type,
                url,
                title,
                tags: tagsId,
                userId
            });
            res.json({
                msg: "content added"
            });
        }
        catch (e) {
            res.status(500).json({
                msg: "Internal server error"
            });
        }
    }
}));
router.get("/api/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const contents = yield db_1.contentModel.find({ userId }).populate({
            path: "tags",
            select: "title -_id"
        });
        res.json({
            contents
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "failed to get the content"
        });
    }
}));
router.delete("/api/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const contentId = req.query.id;
    if (!contentId) {
        return res.status(400).json({ msg: "Content ID is required" });
    }
    try {
        const content = yield db_1.contentModel.findOne({ _id: contentId, userId });
        if (!content) {
            return res.status(404).json({ msg: "Content not found or unauthorized" });
        }
        yield db_1.contentModel.deleteOne({ _id: contentId });
        return res.json({
            msg: "Content deleted successfully"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}));
exports.default = router;
