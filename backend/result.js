const { quiz, Result } = require("./mongoose");
const express = require("express");
const router = express.Router();

router.post("/result/:id/:option", async (req, res) => {
    const questionNumber = parseInt(req.params.id);
    const selectedOption = parseInt(req.params.option);
    const { username } = req.body; 

    try {
        const quizDoc = await quiz.findOne();

        if (!quizDoc || !quizDoc.answers || !quizDoc.questions) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        const correctAnswer = quizDoc.answers[questionNumber];
        const isCorrect = correctAnswer === selectedOption;

        let resultDoc = await Result.findOne({ username });

        if (!resultDoc) {
            resultDoc = new Result({
                username,
                attainedPoints: (isCorrect ? 10 : 0),
            });
        } else {
            resultDoc.attainedPoints += (isCorrect ? 10 : -10);
        }

        await resultDoc.save();

        return res.json({
            correct: isCorrect,
            attainedPoints: resultDoc.attainedPoints
        });

    } catch (e) {
        return res.status(500).json({ error: "Server error" });
    }
});

router.get("/getResult",async(req,res) => {
        const {username} = req.body;
        try{
            const result = await Result.findOne({
                username
            });
            if(!result){
                return res.status(401).json({
                    msg:"No result present"
                })
            }
            else{
                return res.json({
                    result
                })
            }
        }
        catch(e){
            return res.status(500).json({
                error:"some error occured while loading the result"
            })
        }
})

module.exports = router;
