const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");const { json } = require("express");
;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'o2olb7w3xv09alub.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: "3306",
    user: 'wy26e4zi1loz8tt3',
    password: 'zqywhctc0gyll5j1',
    database: 'd6zyum8s6qpze3jj'
  });

app.get("/nba_player",(req,res,next)=>{
    db.query("SELECT * FROM `nba_player_info`",(err,results)=>{
        res.json(results);
    })
});

app.get("/generel_question",(req,res,next)=>{
    db.query("SELECT * FROM `question_general`",(err,results)=>{
        res.json(results);
    })
});

function getQuizFromTable(){
    var myArray = new Array(1);
    db.query(`SELECT * FROM question_general WHERE id = ${1}`,(err,results)=>{
        getDataFromTable = JSON.stringify(results)
        myArray[0] = getDataFromTable;
        console.log("test: "+myArray);
        return myArray;
    })
}

/// Type 1 = general question
/// Type 2 = easy question
/// Type 3 = hard question
/// Type 4 = bigfan question
app.get("/quiz_question",(req,res,next)=>{
    const quizAmount = req.query["quizAmount"];
    let randomQuestionType = 0;
    var quizPocket = new Array(quizAmount);
    var getDataFromTable = [];
    let i = 0;
    for(i = 0;i<quizAmount;i++){
        quizPocket[i] = randomQuestionType = Math.floor(Math.random() * 4) + 1;
    }
    console.log(quizPocket);
    for(i = 0;i<quizAmount;i++){
        if(quizPocket[i] == 1){
            db.query(`SELECT * FROM question_general WHERE id = ${1}`,(err,results)=>{
            quizPocket[i] = JSON.stringify(results);
            console.log(quizPocket);
        })
        }
    }
    console.log("TEST:" + quizPocket);
    ///db.query(`SELECT * FROM question_general WHERE id = ${1}`,(err,results)=>{
       /// quizPocket.push(JSON.stringify(results));
    ///})
    ///console.log("HELLO HEY --- >", quizPocket)
});
app.listen("3008", ()=>{
    console.log("HELLO SERVER");
});