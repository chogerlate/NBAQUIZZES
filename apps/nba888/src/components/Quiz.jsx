import { useContext, useEffect, useState } from "react";
import { AppBar, Button, Drawer, styled, Toolbar, Typography, Box, Menu, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios"
const useStyles = makeStyles({
  container: {
    display: 'flex',
    marginLeft: "auto",
    marginRight: "auto",
    alignSelft: "center",
    backgroundColor:"white"
},
  Logo: {
    width: "240px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0 10px"
  }
})

const Quiz = () => {
  const [quiz, setQuiz] = useState([
  ])
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);

  function OnStart(){
    getQuiz();
    setTimeout(function() {
      setIscanStart(true);
    }, 7000);
  }

  async function getQuiz() {
    await FetchQuiz();
  }
  function FetchQuiz() {
    const quizAmount = 10;
    for (let i = 0; i < quizAmount; i++) {
      axios.get("http://localhost:3008/quiz_question", { params: { quizAmount } }).then(response => {
        setQuiz(quiz => [...quiz, response.data])
      })
    }
  }
  function NextQuiz() {
    if (quizIndex + 1 < quiz.length) {
      setQuizIndex(quizIndex + 1);
    }
    if (quizIndex + 1 == quiz.length) {
      setQuizIndex(0);
    }
  }

  function OnQuizSubmitAnswer(answer) {
    let solution = quiz[quizIndex].choice_answer;
    if (answer == solution) {
      setScore(score + 1);
    }
    NextQuiz();
  }

  const [isCanStart,setIscanStart] = useState(false);

  const classes = useStyles();
  return (
    <Box sx={{width: "100%"}}>
      <Grid container className={classes.container} sx={{
        width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" },padding:"20px",borderRadius:"20px"
      }}>
        <Grid item xl={12} lg={12} md={12}>
        <Typography sx={{fontSize:"24px",textAlign:"center"}}>SCORE: {score}</Typography>
        {quiz.length>0 && isCanStart==true ?<Typography sx={{fontSize:"24px",textAlign:"center"}}>{quizIndex+1}/{quiz.length}</Typography>:""}
        </Grid>
      <Grid item xl={12} lg={12} md={12}>
      <Button variant="outlined" sx={{padding:"10px 20px"}} onClick={OnStart}>START</Button>
      </Grid>
          {quiz.length>0 && isCanStart==true ? 
          <Grid item xl={12} lg={12} md={12}>
          <Typography sx={{fontSize:"24px"}}>{quiz[quizIndex].question}</Typography>
          <img src={quiz[quizIndex].image_url}/>
          <Typography sx={{fontSize:"20px"}} onClick={()=>{OnQuizSubmitAnswer(quiz[quizIndex].choice_1)}}>{quiz[quizIndex].choice_1}</Typography>
          <Typography sx={{fontSize:"20px"}} onClick={()=>{OnQuizSubmitAnswer(quiz[quizIndex].choice_2)}}>{quiz[quizIndex].choice_2}</Typography>
          <Typography sx={{fontSize:"20px"}} onClick={()=>{OnQuizSubmitAnswer(quiz[quizIndex].choice_3)}}>{quiz[quizIndex].choice_3}</Typography>
          <Typography sx={{fontSize:"20px"}} onClick={()=>{OnQuizSubmitAnswer(quiz[quizIndex].choice_4)}}>{quiz[quizIndex].choice_4}</Typography>
        </Grid>:<div>HELLO</div>}
      </Grid>
    </Box>
  )
};

export default Quiz;
