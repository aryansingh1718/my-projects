const {quiz} = require("./mongoose")
const express = require("express");
const router = express.Router();

router.get("/question/:id",async(req,res) => {
    const questionId = parseInt(req.params.id);
    try{
         const quizDoc = await quiz.findOne();
         
    if (!quizDoc || !quizDoc.questions) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    const question = quizDoc.questions.find(q => q.id === questionId);
    if(!question){
        return res.status(404).json({
            error:"question not found"
        })
    }
    else{
        return res.json({
            question
        })
    }
}
catch(e){
    return res.status(500).json({
        error:"failed to get the question"
    })
}
})
module.exports = router;
  
    
   
