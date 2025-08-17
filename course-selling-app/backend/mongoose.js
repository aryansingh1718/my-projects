const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://aryansingh1718:aryan1718@cluster0.73kqjde.mongodb.net/my-projects");

const adminSchema = mongoose.Schema({
    username:String,
    password:String
});

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const courseSchema = mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    tutorName:String
});

const Admin = mongoose.model('Admin',adminSchema);
const Course = mongoose.model('Course',courseSchema);
const User = mongoose.model('User',userSchema);

module.exports = {
    User,
    Admin,
    Course
}

