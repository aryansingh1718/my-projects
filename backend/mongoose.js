const mongoose = require("mongoose");
//connect to mongodb
mongoose.connect("mongodb+srv://aryansingh1718:aryan1718@cluster0.73kqjde.mongodb.net/quiz-app")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Connection error:", err));

const questionSchema = mongoose.Schema({
    questions: {type: Array, default:[]},
    answers:{type: Array, default:[]}
});

const userSchema = mongoose.Schema({
    username: String,
    passed:{type:Boolean}
})

const resultSchema = mongoose.Schema({
    username:String,
    totalPoints:{type:Number,default:50},
    attainedPoints:{type:Number,default:0},
});

const quiz = mongoose.model('quiz',questionSchema);
const User = mongoose.model('User',userSchema)
const Result = mongoose.model('Result',resultSchema)


module.exports = {
   quiz,
   User,
   Result
}