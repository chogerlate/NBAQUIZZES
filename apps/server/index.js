const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors"); 
const { json } = require("express");
const dotenv = require('dotenv');

app.use(cors());
app.use(express.json());

dotenv.config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
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
    const quizType = req.query["QuestionType"];
    const quizOrder = req.query["randomQuestionOrder"];
    let randomQuestionType = 0;
    randomQuestionType = Math.floor(Math.random() * 4) + 1;
    if(quizType==1){
        db.query(`SELECT * FROM question_easy WHERE id = ${quizOrder}`, (err, results) => {
            var data = results[0];
            res.json(data);
        });
    }
    if(quizType==2){
        db.query(`SELECT * FROM question_general WHERE id = ${quizOrder}`, (err, results) => {
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

app.get("/predict_question", (req, res, next) => {
    db.query(`SELECT * FROM question_analyse`, (err, results) => {
        //console.log(results);
        res.json(results);
    });
    console.log("SUCCESS");
    //player_physical_skills
});

app.get("/quiz_vdo", (req, res, next) => {
    db.query(`SELECT * FROM question_nextplay`, (err, results) => {
        //console.log(results);
        res.json(results);
    });
    console.log("SUCCESS");
    //player_physical_skills
});

app.get("/player_info", (req, res, next) => {
    const position = req.query["position"];
    db.query(`SELECT * FROM nba_player_info WHERE position = ${`'${position}'`} `, (err, results) => {
        //console.log(results);
        res.json(results);
    });
    console.log("SUCCESS");
    //player_physical_skills
});

app.get("/player_physical_stat", (req, res, next) => {
    console.log("HELLO");
    const position = req.query["position"];
    console.log(position);
    db.query(`SELECT * FROM nba_player_physical_skills WHERE position = ${`'${position}'`} `, (err, results) => {
        //console.log(results);
        res.json(results);
    });
    console.log("SUCCESS");
    //player_physical_skills
});
app.get("/player_softskill_stat", (req, res, next) => {
    console.log("HELLO");
    const position = req.query["position"];
    console.log(position);
    db.query(`SELECT * FROM nba_player_soft_skill WHERE position = ${`'${position}'`} `, (err, results) => {
        //console.log(results);
        res.json(results);
    });
    console.log("SUCCESS");
    //player_physical_skills
});

app.listen("3008", () => {
    console.log("HELLO SERVER");
});
