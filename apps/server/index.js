const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");;

app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
    host: 'o2olb7w3xv09alub.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: "3306",
    user: 'wy26e4zi1loz8tt3',
    password: 'zqywhctc0gyll5j1',
    database: 'd6zyum8s6qpze3jj'
  });

app.get("/nba_player",(req,res,next)=>{
    connection.query("SELECT * FROM `nba_player_info`",(err,results)=>{
        res.json(results);
    })
});

app.listen("3008", ()=>{
    console.log("HELLO SERVER");
});