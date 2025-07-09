const mongoose = require("./mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./userRoute")
const questionRouter = require("./fetchQuestion");
const resultRouter = require("./result")

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use("/",userRouter);
app.use("/",questionRouter);  
app.use("/",resultRouter)  

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});