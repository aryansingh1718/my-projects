import express from "express";
import connectDB from "./db";
import userSignup from "./userSignup";
import userSignin from "./userSignin"
import content from "./content"
import shareLink from "./shareLink"

const app = express();
app.use(express.json());

connectDB().then(() => {
  console.log("Connected to DB. Starting server...");
}).catch((err) => {
  console.error("Failed to connect to DB", err);
});

app.use(userSignup);
app.use(userSignin);
app.use(content);
app.use(shareLink);


app.listen(3000);