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
exports.linkModel = exports.tagsModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
// connectDB.ts
const mongoose_2 = __importDefault(require("mongoose"));
const MONGO_URL = "mongodb+srv://aryansingh1718:aryan1718@cluster0.73kqjde.mongodb.net/secondBrain?retryWrites=true&w=majority";
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_2.default.connect(MONGO_URL);
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error(" MongoDB connection failed:", err);
        process.exit(1);
    }
});
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String
});
exports.userModel = (0, mongoose_1.model)("User", userSchema);
const contentSchema = new mongoose_1.Schema({
    type: { type: String },
    url: { type: String },
    title: { type: String },
    tags: [{
            type: mongoose_2.default.Schema.Types.ObjectId,
            ref: "Tags"
        }],
    userId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.contentModel = (0, mongoose_1.model)("Content", contentSchema);
const tagsSchema = new mongoose_1.Schema({
    title: { type: String }
});
exports.tagsModel = (0, mongoose_1.model)("Tags", tagsSchema);
const linkSchema = new mongoose_1.Schema({
    hash: String,
    userId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.linkModel = (0, mongoose_1.model)("Link", linkSchema);
exports.default = connectDB;
