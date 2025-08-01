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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "second_brain";
const express_1 = require("express");
const db_1 = require("./db");
const zod_1 = require("./zod");
const router = (0, express_1.Router)();
router.post("/api/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const safeUsername = zod_1.userSchema.safeParse(req.body);
    if (!safeUsername.success) {
        return res.status(411).json({
            msg: "enter correct inputs"
        });
    }
    else {
        const { username, password } = safeUsername.data;
        const ifExists = yield db_1.userModel.findOne({
            username,
        });
        if (ifExists) {
            const token = jsonwebtoken_1.default.sign({
                userId: ifExists._id
            }, JWT_SECRET);
            res.json({
                msg: "Here is your token",
                token
            });
        }
        else {
            res.status(403).json({
                msg: "user with given username doesn't exist"
            });
        }
    }
}));
exports.default = router;
