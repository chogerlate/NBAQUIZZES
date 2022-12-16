const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors"); 
const { json } = require("express");

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'o2olb7w3xv09alub.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: "3306",
    user: 'wy26e4zi1loz8tt3',
    password: 'zqywhctc0gyll5j1',
    database: 'd6zyum8s6qpze3jj'
});

app.get("/nba_player", (req, res, next) => {
    db.query("SELECT * FROM `nba_player_info`", (err, results) => {
        res.json(results);
    })
});


/// Type 1 = general question
/// Type 2 = easy question
/// Type 3 = hard question
/// Type 4 = bigfan question
async function TurnBackValue(res,questionType) {
    const data = await getFromTable(res,questionType);
    await PrintData(data);
}
function PrintData(data){
    ///console.log(data);
}
function getFromTable(res,questionType) {
    let randomId = Math.floor(Math.random() * 20) + 1;
    if(questionType==1){
        db.query(`SELECT * FROM question_general WHERE id = ${randomId}`, (err, results) => {
            var data = results[0];
            res.json(data);
        });
    }
    if(questionType==2){
        db.query(`SELECT * FROM question_easy WHERE id = ${randomId}`, (err, results) => {
            var data = results[0];
            res.json(data);
        });
    }
    if(questionType==3){
        db.query(`SELECT * FROM question_hard WHERE id = ${randomId}`, (err, results) => {
            var data = results[0];
            res.json(data);
        });
    }
    if(questionType==4){
        db.query(`SELECT * FROM question_bigfan WHERE id = ${randomId}`, (err, results) => {
            var data = results[0];
            res.json(data);
        });
    }
    
}
app.get("/quiz_question", (req, res, next) => {
    const quizType = req.query["randomQuestionType"];
    const quizOrder = req.query["randomQuestionOrder"];
    let randomQuestionType = 0;
    randomQuestionType = Math.floor(Math.random() * 4) + 1;
    if(quizType==1){
        db.query(`SELECT * FROM question_general WHERE id = ${quizOrder}`, (err, results) => {
            var data = results[0];
            res.json(data);
        });
    }
    if(quizType==2){
        db.query(`SELECT * FROM question_easy WHERE id = ${quizOrder}`, (err, results) => {
            var data = results[0];
            res.json(data);
        });
    }
    if(quizType==3){
        db.query(`SELECT * FROM question_hard WHERE id = ${quizOrder}`, (err, results) => {
            var data = results[0];
            res.json(data);
        });
    }
    if(quizType==4){
        db.query(`SELECT * FROM question_bigfan WHERE id = ${quizOrder}`, (err, results) => {
            var data = results[0];
            res.json(data);
        });
    };
    console.log("SUCCESS");
});
app.listen("3008", () => {
    console.log("HELLO SERVER");
});