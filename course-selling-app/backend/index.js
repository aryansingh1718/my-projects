require("dotenv").config(); // Optional for local devv


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const { User, Admin, Course } = require("./mongoose");
const adminRouter = require("./adminRoute");
const userRouter = require("./userRoute");

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(" Connected to MongoDB");
}).catch((err) => {
  console.error(" MongoDB connection error:", err.message);
  process.exit(1);
});

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://course-selling-frontend.vercel.app",
      "https://course-selling-frontend-xi.vercel.app"
    ];

    const isAllowed =
      !origin || 
      allowedOrigins.includes(origin) ||
      /^https:\/\/course-selling-frontend.*\.vercel\.app$/.test(origin); // allow all preview Vercel URLs

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
