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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const zod_1 = require("./zod");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/api/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const safeUsername = zod_1.userSchema.safeParse(req.body);
    if (!safeUsername.success) {
        return res.status(411).json({
            msg: "you sent the wrong inputs"
        });
    }
    else {
        const userExists = yield db_1.userModel.findOne({
            username: req.body.username
        });
        if (userExists) {
            res.status(403).json({
                msg: "User with this username already exists"
            });
        }
        else {
            yield db_1.userModel.create({
                username: req.body.username,
                password: req.body.password
            });
            res.json({
                msg: "user signed up"
            });
        }
    }
}));
exports.default = router;
