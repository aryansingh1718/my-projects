const express = require("express");
const app = express();
const {User,Admin,Course } = require("./mongoose");
const bodyParser = require('body-parser');
const adminRouter = require("./adminRoute");
const userRouter = require("./userRoute");
const cors = require("cors")
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;



app.use(bodyParser.json());
app.use(cors({
  origin: "*",  
}));

app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});