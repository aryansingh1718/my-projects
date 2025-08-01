"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const userSignup_1 = __importDefault(require("./userSignup"));
const userSignin_1 = __importDefault(require("./userSignin"));
const content_1 = __importDefault(require("./content"));
const shareLink_1 = __importDefault(require("./shareLink"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.default)().then(() => {
    console.log("Connected to DB. Starting server...");
}).catch((err) => {
    console.error("Failed to connect to DB", err);
});
app.use(userSignup_1.default);
app.use(userSignin_1.default);
app.use(content_1.default);
app.use(shareLink_1.default);
app.listen(3000);
