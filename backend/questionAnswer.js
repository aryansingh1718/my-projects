const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://aryansingh1718:aryan1718@cluster0.73kqjde.mongodb.net/quiz-app")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Connection error:", err));
const {quiz} = require("./mongoose")
const questions = [
        {
            id:1,
            question:"Javascript is a ________ language",
            options:[
                'object-oriented',
                'Object-Based',
                'Procedural',

            ]
        },
         {
        id: 2,
        question : "Following methods can be used to display data in some form using Javascript",
        options : [
            'document.write()',
            'console.log()',
            'window.alert()',
        ]
    },
    {
        id: 3,
        question : "When an operator value is NULL, the typeof returned by the unary operator is:",
        options : [
            'Boolean',
            'Undefined',
            'Object',
        ]
    },
    {
        id: 4,
        question : "What does the toString() method return?",
        options : [
            'Return Object',
            'Return String',
            'Return Integer'
        ]
    },
    {
        id: 5,
        question : "Which function is used to serialize an object into a JSON string?",
        options : [
            'stringify()',
            'parse()',
            'convert()',
        ]
    }
];
const answers = [0,1,2,1,0];


const quizData = new quiz({
    questions,
    answers
})
quizData.save()
    .then(() => {
        console.log("Quiz inserted successfully!");
    })
    .catch((err) => {
        console.error("Failed to insert quiz:", err);
    });

module.exports = {
    questions,
    answers
}