import {model,mongo,Schema} from "mongoose";
// connectDB.ts
import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://aryansingh1718:aryan1718@cluster0.73kqjde.mongodb.net/secondBrain?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
    process.exit(1);
  }
};

const userSchema = new Schema({
    username:{type: String,unique:true},
    password:String
})
export const userModel =model("User",userSchema)


const contentSchema = new Schema({
    type:{type:String},
    url:{type:String},
    title:{type:String},
    tags:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Tags"
    }],
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
})
export const contentModel = model("Content",contentSchema);


const tagsSchema = new Schema({
    title:{type:String}
})
export const tagsModel = model("Tags",tagsSchema);

const linkSchema = new Schema({
  hash:String,
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
})
export const linkModel = model("Link",linkSchema);



export default connectDB;
