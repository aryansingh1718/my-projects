const express = require("express");
const app = express();
const {User,Admin,Course } = require("./mongoose");
const bodyParser = require('body-parser');
const adminRouter = require("./adminRoute");
const userRouter = require("./userRoute");
const cors = require("cors")

app.use(bodyParser.json());
app.use(cors({}));


app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});