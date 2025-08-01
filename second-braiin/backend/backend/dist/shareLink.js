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
const db_1 = require("./db");
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.get("/api/content/share/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.id;
    try {
        const content = yield db_1.contentModel.findById(contentId).populate({
            path: "tags",
            select: "title -_id"
        });
        if (!content) {
            return res.status(404).json({ msg: "Content not found" });
        }
        // Only send safe content info (not userId)
        const { url, type, tags } = content;
        return res.json({ type, url, tags });
    }
    catch (err) {
        return res.status(500).json({ msg: "Something went wrong" });
    }
}));
//in case user doesn't pass any parameter after /share
router.get("/api/content/share", (req, res) => {
    return res.status(400).json({ msg: "Content ID is required in the URL" });
});
exports.default = router;
