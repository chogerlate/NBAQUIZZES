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
    backgroundColor: "white"
  },
  Logo: {
    width: "240px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0 10px"
  },
  quizImage: {
    width: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    alignSelft: "center",
    borderRadius: "10px",
    ['@media (max-width:1535px)']: {
      width: "450px"
    },
  }
})

const Quiz = () => {
  const [quiz, setQuiz] = useState([
  ])
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);

  function OnStart() {
    getQuiz();
    setTimeout(function () {
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
    setTimeout(function () {
      NextQuiz();
    }, 1000);
  }

  const [isCanStart, setIscanStart] = useState(false);

  const classes = useStyles();
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container className={classes.container} sx={{
        width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" }, padding: "20px", borderRadius: "20px"
        , height: isCanStart ? "100%" : "70vh", position: "relative"
        , boxShadow: "white 0px 4px 8px"
      }}>
        {quiz.length < 1 && isCanStart == false ? <Grid item xl={12} lg={12} md={12}>
          <Button variant="outlined" sx={{ padding: "10px 20px" }} onClick={OnStart}>START</Button>
        </Grid> : ""}
        {quiz.length > 0 && isCanStart == true ?
          <Grid item xl={12} lg={12} md={12} sx={{ width: "100%" }}>
            {quiz.length > 0 && isCanStart == true ? <Typography sx={{ fontSize: "24px", textAlign: "center", position: "absolute", top: "10px", right: "20px" }}>{quizIndex + 1}/{quiz.length}</Typography> : ""}
            <Grid container sx={{ width: "100%", textAlign: "center" }}>
              <Grid item xl={12} lg={12} md={12} sx={{ width: "100%", borderRadius: "20px 20px 0 0", borderBottom: "1px solid #E5E4E2", padding: "0 0 10px 0" }}>
                <Typography sx={{ fontSize: "24px", textAlign: "center" }}>
                  {quizIndex + 1}.) {quiz[quizIndex].question}
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sx={{ width: "100%", marginTop: "30px" }}>
                <img src={quiz[quizIndex].image_url} className={classes.quizImage} />
              </Grid>
              <Grid container sx={{ width: "100%", marginTop: "20px" }}>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px"}} onClick={() => { OnQuizSubmitAnswer(quiz[quizIndex].choice_1) }}>
                  <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center"
                  , alignItems: "center" ,border:"1px solid #7743DB" ,borderRadius:"10px" }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_1}</Typography>
                  </Box>
                </Grid>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { OnQuizSubmitAnswer(quiz[quizIndex].choice_2) }}>
                  <Box sx={{ width: "100%", backgroundColor: "white", height: "100%", display: "flex", justifyContent: "center"
                  , alignItems: "center",border:"1px solid #7743DB" ,borderRadius:"10px" }}>
                    <Typography sx={{ fontSize: "24px", color: "black"}}>{quiz[quizIndex].choice_2}</Typography>
                  </Box>
                </Grid>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { OnQuizSubmitAnswer(quiz[quizIndex].choice_3) }}>
                  <Box sx={{ width: "100%", backgroundColor: "white", height: "100%", display: "flex", justifyContent: "center"
                  , alignItems: "center" ,border:"1px solid #7743DB" ,borderRadius:"10px" }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_3}</Typography>
                  </Box>
                </Grid>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { OnQuizSubmitAnswer(quiz[quizIndex].choice_4) }}>
                  <Box sx={{ width: "100%", backgroundColor: "white", height: "100%", display: "flex", justifyContent: "center"
                  , alignItems: "center",border:"1px solid #7743DB" ,borderRadius:"10px" }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_4}</Typography>
                  </Box>
                </Grid>

              </Grid>
            </Grid>
          </Grid> : ""}
      </Grid>
    </Box>
  )
};

export default Quiz;
