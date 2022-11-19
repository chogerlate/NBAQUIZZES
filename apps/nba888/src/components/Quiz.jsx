import { useContext, useEffect, useState } from "react";
import { AppBar, Button, Drawer, styled, Toolbar, Typography, Box, Menu, Grid, TextField ,InputBase} from "@mui/material";
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
  },
  playerProfileImage:{
    marginTop:"10px",
    width:"100px",
    borderRadius:"50%",
    marginLeft:"auto",
    marginRight:"auto",
    ['@media (max-width:1535px)']: {
      width: "75px"
    },
  }
})

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#023E8A",
  fontSize: "16px",
  borderRadius: "20px",
  border: "2px solid #FFD372",
  transition: "0.25s",
  "&:hover": {
    backgroundColor: "#EEF1FF",
    border: "2px solid #FFB200",
  },
}));

const SubmitNameButton = styled(Button)(({ theme }) => ({
  color: "#808080",
  fontSize: "20px",
  border: "2px solid #FFD372",
  borderRadius: "0 20px 20px 0",
  padding: "10px 20px",
  backgroundColor:"#FFD372",
  "&:hover": {
    backgroundColor:"#FFD374",
    color:"	#36454F"
  },
}));

const Quiz = () => {
  const [quiz, setQuiz] = useState([
  ])
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizAmount,setQuizAmount] = useState(10);

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
    const quizAmount = 5;
    for (let i = 0; i < quizAmount; i++) {
      axios.get("http://localhost:3008/quiz_question", { params: { quizAmount} }).then(response => {
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

  function handlePlayerName(e){
    const name = e.target.value;
    setPlayerName(name);
  }
  function handleQuizAmount(e){
    const number = ParseInt(e.target.value);
    setPlayerName(number);
  }
  const [isCanStart, setIscanStart] = useState(false);
  const [playerName,setPlayerName] = useState("");
  const classes = useStyles();
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container className={classes.container} sx={{
        width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" }, padding: "20px", borderRadius: "20px"
        , height: isCanStart ? "100%" : "70vh", position: "relative"
        , boxShadow: "white 0px 4px 8px"
      }}>
        {quiz.length < 1 && isCanStart == false ?
          <Grid item xl={12} lg={12} md={12} sx={{}}>
            <Typography sx={{ fontSize: "30px", textAlign: "center" }}>ไหนดูซิว่าคุณมีความรู้เกี่ยวกับ NBA มากแค่ไหน 🏀</Typography>
          </Grid> : ""}
        {quiz.length < 1 && isCanStart == false ?
          <Grid item xl={6} lg={6} md={6} sx={{ borderRight: "2px solid #DCDCDC", padding: "10px", height: "60vh"}}>
            <Typography sx={{fontSize:"20px",textAlign:"center",color:"#0008C1"}}>เล่นเลย!</Typography>

            <Box>
              <img src="" className={classes.playerProfileImage}/>
            </Box>
            <Typography sx={{fontSize:"20px",textAlign:"left",color:"#0008C1"}}>ชื่อเล่น</Typography>
            <Box sx={{ display: "flex" ,marginTop:"5px"}}>
              <InputBase sx={{width:"75%",backgroundColor:"red",border:"2px solid #FFD372"
              ,backgroundColor:"rgba(255, 211, 114,0.25)",padding:"10px 20px",fontSize:"20px"
              ,borderRadius:"20px 0 0 20px",color:"#808080"}} value={playerName} onChange={handlePlayerName} placeholder="ระบุชื่อเล่น"/>
              <SubmitNameButton>บันทึก</SubmitNameButton>
            </Box>
            <Typography sx={{fontSize:"20px",textAlign:"left",color:"#0008C1",marginTop:"20px"}}>จำนวนข้อ</Typography>
            <Box sx={{ display: "flex",marginTop:"5px"}}>
              <InputBase sx={{width:"50%",backgroundColor:"red",border:"2px solid #FFD372"
              ,backgroundColor:"rgba(255, 211, 114,0.25)",padding:"10px 20px",fontSize:"20px"
              ,borderRadius:"20px 0 0 20px",color:"#808080"}} value={quizAmount} placeholder={`${quizAmount} ข้อ`}/>
              <SubmitNameButton sx={{borderRadius:"0",fontSize:"20px"
              ,backgroundColor:quizAmount>5 ?"":"#E5E4E2",border:quizAmount>5 ?"":"1px solid #E5E4E2","&:hover":{
                border: quizAmount>5 ?"":"1px solid #E5E4E2",
                backgroundColor:quizAmount>5 ?"":"#E5E4E2"
              }}} 
              onClick={()=>{
                if(quizAmount>5){
                  setQuizAmount(amount => amount-1)
                }
              }}>-</SubmitNameButton>
              <SubmitNameButton sx={{fontSize:"20px",borderLeft:"1px solid white",backgroundColor:quizAmount<15 ?"":"#E5E4E2"
              ,border:quizAmount<15 ?"":"1px solid #E5E4E2","&:hover":{
                border: quizAmount<15 ?"":"1px solid #E5E4E2",
                backgroundColor:quizAmount<15 ?"":"#E5E4E2"
              }}} onClick={()=>{
                if(quizAmount<15){
                  setQuizAmount(amount => amount+1)
                }
              }}>+</SubmitNameButton>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
              <CustomButton variant="outlined" sx={{ padding: "10px 30px" }} onClick={OnStart}>เริ่มเกม</CustomButton>
              <CustomButton variant="outlined" sx={{ padding: "10px 30px", marginLeft: "10px" }}>ตั้งค่า</CustomButton>
            </Box>
            
          </Grid> : ""}
        {quiz.length < 1 && isCanStart == false ?
          <Grid item xl={6} lg={6} md={6} sx={{ padding: "10px 10px 10px 20px", height: "50vh" }}>
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
                <Typography sx={{ fontSize: "24px", textAlign: "center" }}>
                  SCORE: {score}
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sx={{ width: "100%", marginTop: "30px" }}>
                <img src={quiz[quizIndex].image_url} className={classes.quizImage} />
              </Grid>
              <Grid container sx={{ width: "100%", marginTop: "20px" }}>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { OnQuizSubmitAnswer(quiz[quizIndex].choice_1) }}>
                  <Box sx={{
                    width: "100%", height: "100%", display: "flex", justifyContent: "center"
                    , alignItems: "center", border: "2px solid #7743DB", borderRadius: "10px"
                  }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_1}</Typography>
                  </Box>
                </Grid>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { OnQuizSubmitAnswer(quiz[quizIndex].choice_2) }}>
                  <Box sx={{
                    width: "100%", backgroundColor: "white", height: "100%", display: "flex", justifyContent: "center"
                    , alignItems: "center", border: "2px solid #7743DB", borderRadius: "10px"
                  }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_2}</Typography>
                  </Box>
                </Grid>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { OnQuizSubmitAnswer(quiz[quizIndex].choice_3) }}>
                  <Box sx={{
                    width: "100%", backgroundColor: "white", height: "100%", display: "flex", justifyContent: "center"
                    , alignItems: "center", border: "2px solid #7743DB", borderRadius: "10px"
                  }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_3}</Typography>
                  </Box>
                </Grid>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { OnQuizSubmitAnswer(quiz[quizIndex].choice_4) }}>
                  <Box sx={{
                    width: "100%", backgroundColor: "white", height: "100%", display: "flex", justifyContent: "center"
                    , alignItems: "center", border: "2px solid #7743DB", borderRadius: "10px"
                  }}>
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
