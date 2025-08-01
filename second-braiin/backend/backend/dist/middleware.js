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
exports.userMiddleware = userMiddleware;
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "second_brain";
function userMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(411).json({
                msg: "Please provide your token"
            });
        }
        const actualToken = token.split(" ");
        const webToken = actualToken[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(webToken, JWT_SECRET);
            const username = yield db_1.userModel.findById(decoded.userId).select("username");
            if (!username) {
                return res.status(403).json({
                    msg: "user not found"
                });
            }
            req.userId = decoded.userId;
            req.username = username.username;
            next();
        }
        catch (e) {
            return res.status(403).json({
                msg: "Invalid token"
            });
        }
    });
}
