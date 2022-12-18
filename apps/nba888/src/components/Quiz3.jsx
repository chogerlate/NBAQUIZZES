import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, styled, Typography, Box, Menu, Grid, TextField
  , InputBase, Dialog, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../App"
import axios from "axios"
import BearAvatarImage from "/images/avatar/bear.png"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ProfileAvatarStore } from "./AvatarStore";
import { AudioStore } from "./AudioStore";
import BrainImage from "../assets/brain.png"
import FastImage from "../assets/fast-time.png"
import ThinkImage from "../assets/thinking.png"
import ReactHowler from "react-howler"
import YouTube from "react-youtube";
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
  playerProfileImage: {
    marginTop: "20px",
    width: "150px",
    borderRadius: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    transition: "0.25s",
    ['@media (max-width:1535px)']: {
      width: "120px"
    },
    "&:hover": {
      opacity: "90%",
      zIndex: "0"
    }
  },
  imageGuidePlay:{
    marginLeft:"auto",
    marginRight:"auto",
    width:"100px",
    ['@media (max-width:1535px)']: {
      width: "80px"
    },
  },
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
  backgroundColor: "#FFD372",
  "&:hover": {
    backgroundColor: "#FFD374",
    color: "	#36454F"
  },
}));
const Quiz3 = () => {
    const [loop,setLoop] = useState(1);
    const videoOptions = {
        height:'300px',
        width:'100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          mute: 0,
          loop: loop
        }
      };
  let navigate = useNavigate();
  ///const [quiz, setQuiz] = useState([]);
  const [quizAmount, setQuizAmount] = useState(5);
  const { playerName, 
    setPlayerName, 
    profileAvatarIndex, 
    setProfileAvatarIndex,
    score,
    setScore,
    totalScore,
  setTotalScore,
  userAnswer,
  setUserAnswer,
  quiz,setQuiz,
  answerOrder,setAnswerOrder,
  countdownQuizTime,setCountdownQuizTime,
  timer,setTimer,
  quizIndex, setQuizIndex,
  timerAnimation,setTimerAnimation,
  toggleSolution, setToggleSolution,
  countdownStartGame, setCountdownStartGame,
  isCanStart, setIscanStart,
  isPlaying,setIsPlaying,
  isPlayingHomeMusic, setIsPlayingHomeMusic

} = useContext(UserContext)
const HomeMusic = new ReactHowler(
  {
    src: AudioStore[0].path,
    html5: true,
  } 
);
const timeVideoManually = [16,16,15,14,14,6,7,10,6,7];
useEffect(()=>{
    setTimer(timeVideoManually[quizIndex]);
    if(quiz.length>0){
        //console.log(timeVideoManually[quizIndex])
        //console.log(quiz[quizIndex].time_video)
        //setTimer(quiz[quizIndex].time_video);
        //console.log(quiz[quizIndex].time_video)
        let quizInterval = setInterval(()=>{
            setTimer(timer=>timer-1)
            //console.log(timer);
    },1000)
    return()=>{
      clearInterval(quizInterval);
    }
    }
    else{
    }
  },[quizIndex])
  useEffect(()=>{
    if(timer==0){
        console.log("HELLO");
        if(loop==1){
            setLoop(0);
        }
        else{
            setLoop(1);
        }
        
        setTimer(timeVideoManually[quizIndex]);
        //setTimer(quiz[quizIndex].time_video);
      //setTimer(20);
    }
  },[timer])
  ///const [userAnswer,setUserAnswer] = useState([]);
  function OnStart() {
    setLoop(0);
    getQuiz();
    setIsPlaying(true);
      setTimeout(function () {
        setQuizIndex(0);
      setIscanStart(true);
      setIsPlayingHomeMusic(false);
      setIsPlaying(false);
      new Audio(AudioStore[2].path).play();
      //setQuizIndex(0);
    }, 6000)
  }
  async function getQuiz() {
    //setCountdownQuiz(10);
    await FetchQuiz();
  }
  useEffect(()=>{
    var count=0;
    if(countdownStartGame>0){
      //new Audio(AudioStore[1].path).play();
      if(isPlaying){
        //console.log(count);
        let myInterval = setInterval(()=>{
          //console.log("HELLO: " + countdownStartGame
          new Audio(AudioStore[1].path).play();   
          setCountdownStartGame(prev=>prev-1);
          
          },1000)
          return()=>{
            clearInterval(myInterval);
          }
      }
    }
  },[isPlaying])
  function FetchQuiz() {
    axios.get("http://localhost:3008/quiz_vdo").then(response => {
          setQuiz(response.data);
          console.log(response.data);
    });
  }
  function NextQuiz(){
    if (quizIndex + 1 < quiz.length) {
      setTimeout(function () {
        setQuizIndex(quizIndex + 1);
      }, 500);
    }
    if (quizIndex + 1 == quiz.length) {
      setTimeout(function () {
        console.log("End of Play");
        setTotalScore(quiz.length);
        navigate("/Quiz3_Result");
        setCountdownQuizTime([]);
      }, 1000);
    }
    //getCountdownQuiz();
  }

  function OnQuizSubmitAnswer(answer) {
    var tempAnswer;
    tempAnswer = answer;
    console.log(tempAnswer);
    //getCountdownQuiz();
    let solution = quiz[quizIndex].choice_answer;
    if (answer == solution) {
      setScore(score + 1);
      setUserAnswer(userAnswer => [...userAnswer , 1])
      setAnswerOrder(answerOrder => [...answerOrder,answer]);
      //userAnswer.push("1");
    }
    else{
      setUserAnswer(userAnswer => [...userAnswer , 0])
      setAnswerOrder(answerOrder => [...answerOrder,answer]);
      //userAnswer.push("0");
    }
    setToggleSolution(toggleSolution=>[...toggleSolution, false])
    //setAnswerOrder(answerOrder => [...answerOrder,answer]);
    setTimeout(function () {
      NextQuiz();
    }, 500);
    //countdownQuiz();
  }
  function SubmitPlayerName() {
    localStorage.setItem("playerName", playerNameChanging);
    setPlayerName(playerNameChanging);
  }

  function SubmitAvatarProfile(avatarIndex) {
    localStorage.setItem("playerAvatar", avatarIndex);
    setProfileAvatarIndex(avatarIndex);
  }

  const [playerNameChanging, setPlayerNameChanging] = useState("");
  function HandlePlayerName(e) {
    setPlayerNameChanging(e.target.value);
  }
  useEffect(() => {
    if (!localStorage["playerName"]) {
      window.localStorage.setItem("playerName", "");
    }
    if (!localStorage["playerAvatar"]) {
      window.localStorage.setItem("playerAvatar", 0);
    }
    else {
      setPlayerNameChanging(window.localStorage.getItem("playerName"));
      setProfileAvatarIndex(window.localStorage.getItem("playerAvatar"));
    }
  }, [])
  const classes = useStyles();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [quizLevel, setQuizLevel] = useState("");
  const [isSelectQuizLevel, setIsSelectQuizLevel] = useState(false);
  useEffect(() => {
    console.log()
  },[quizIndex]);


  return (
    <Box sx={{ width: "100%" }}>

      <Grid container className={classes.container} sx={{
        width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" }, padding: "20px", borderRadius: "20px"
        , height: isCanStart ? "100%" : "75vh", position: "relative"
        , boxShadow: "white 0px 4px 8px",textAlign:"center"
      }}>
        {quiz.length < 1 && isCanStart == false ?
          <Grid item xl={12} lg={12} md={12} sx={{}}>
            <Typography sx={{ fontSize: "30px", textAlign: "center" }}>แบบทดสอบเซนส์ในการเล่นบาสของคุณ ด้วยคลิปไฮไลท์บาส 🏀</Typography>
          </Grid> : ""}
        {quiz.length < 1 && isCanStart == false ?
          <Grid item xl={12} lg={12} md={12} sx={{ padding: "10px", height: "60vh" }}>
            <Typography sx={{ fontSize: "20px", textAlign: "center", color: "#0008C1" ,fontWeight:"600"}}>เล่นเลย!</Typography>

            <Box sx={{ position: "relative" }}>
              <ModeEditIcon sx={{
                position: "absolute", top: "5px", left: "53%", backgroundColor: "#FFD372", borderRadius: "20px"
                , padding: "5px", fontSize: {
                  xl: "40px", lg: "35px", zIndex: "3", "&:hover": {
                    backgroundColor: "#FFCD38"
                  }
                }, border: "4px solid white", cursor: "pointer"
              }}
                onClick={() => { setIsEditingAvatar(value => !value) }} />
              <img src={ProfileAvatarStore[profileAvatarIndex].imageDirectory} className={classes.playerProfileImage} alt="" />
            </Box>
            <Typography sx={{ fontSize: "16px", color: "#0008C1", marginTop: "10px"}}>ชื่อเล่น</Typography>
            <Box sx={{ display: "flex", marginTop: "5px" ,padding:"0 200px"}}>
              <InputBase sx={{
                width: "100%", border: "2px solid #FFD372",marginRight:"auto",marginLeft:"auto"
                , backgroundColor: "rgba(255, 211, 114,0.25)", padding: "10px 20px", fontSize: "20px"
                , borderRadius: "20px 0 0 20px", color: "#808080"
              }} onChange={HandlePlayerName} value={playerNameChanging} placeholder={playerName.length > 0 ? `${playerName}` : "ระบุชื่อเล่น"} />
              <SubmitNameButton sx={{marginRight:"auto",marginLeft:"auto"}} onClick={SubmitPlayerName}>บันทึก</SubmitNameButton>
            </Box>
            <Box sx={{ display: "flex", marginTop: "5px",padding:"0 20px",width:"75%",marginLeft:"auto",marginRight:"auto"}}>
            <Grid container sx={{padding:"0 20px 0 20px"}}>
                <Grid item lg={4} sx={{padding:"10px",display:"flex",flexDirection:"column",textAlign:"center"}}>
                  <img src={ThinkImage} className={classes.imageGuidePlay}/>
                  <Typography sx={{ fontSize: "14px", textAlign: "center", color: "#0008C1", marginTop: "10px" }}>
                    คิดให้ดี
                  </Typography>
                </Grid>
                <Grid item lg={4} sx={{padding:"10px",display:"flex",flexDirection:"column",textAlign:"center"}}>
                  <img src={BrainImage} className={classes.imageGuidePlay}/>
                  <Typography sx={{ fontSize: "14px", textAlign: "center", color: "#0008C1", marginTop: "10px" }}>
                    คิดให้เร็ว
                  </Typography>
                </Grid>
                <Grid item lg={4} sx={{padding:"10px",display:"flex",flexDirection:"column",textAlign:"center"}}>
                  <img src={FastImage} className={classes.imageGuidePlay}/>
                  <Typography sx={{ fontSize: "14px", textAlign: "center", color: "#0008C1", marginTop: "10px" }}>
                    ตอบให้ไว
                  </Typography>
                </Grid>
                </Grid>
               
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <CustomButton variant="outlined" sx={{ padding: "5px 50px",fontSize:"24px"}} onClick={OnStart}>เริ่มเล่น</CustomButton>
              
            </Box>
          </Grid> :
          <Grid>
        </Grid>}
        {isPlaying && quiz.length > 0 ?
            <Typography sx={{fontSize:"350px",marginLeft:"auto",marginRight:"auto",display:"flex"
            ,justifySelf:"center",color:"#7743DB",textShadow:"#FECD70 0px 0px 10px"}}>
              {countdownStartGame>0 ? countdownStartGame:""}  
            </Typography>
        :""}
         


        {quiz.length > 0 && isPlaying==false?
          <Grid container sx={{ width: "100%" }}>
            <Grid item xl={12} lg={12} md={12} sx={{ width: "100%", borderRadius: "20px 20px 0 0", borderBottom: "1px solid #E5E4E2", padding: "0 0 10px 0" }}>
                <Typography sx={{ fontSize: "24px", textAlign: "center" }}>
                  {quiz[quizIndex].question}
                </Typography>
              </Grid>
            <Grid item lg={12} sx={{padding:"10px",width:"100%"}}>
                <Box sx={{width:"75%",marginLeft:"auto",marginRight:"auto"}}>
                    <YouTube videoId={(quiz[quizIndex].video_url_question).slice(17)} opts={videoOptions} />
                </Box>
            </Grid>
            <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px"}} onClick={() => { 
                  new Audio(AudioStore[3].path).play(); 
                  OnQuizSubmitAnswer(quiz[quizIndex].choice_1)
                   }}>
                  <Box sx={{
                    width: "100%", height: "100%", display: "flex", justifyContent: "center"
                    , alignItems: "center", border: "2px solid #7743DB", borderRadius: "10px",backgroundColor:"rgba(119, 67, 219,0.1)","&:hover":{
                      backgroundColor:"rgba(119, 67, 219,0.25)"
                    }
                  }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_1}</Typography>
                  </Box>
                </Grid>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { 
                  new Audio(AudioStore[3].path).play(); 
                  OnQuizSubmitAnswer(quiz[quizIndex].choice_2)
                  }}>
                  <Box sx={{
                    width: "100%", backgroundColor: "white", height: "100%", display: "flex", justifyContent: "center"
                    , alignItems: "center", border: "2px solid #7743DB", borderRadius: "10px",backgroundColor:"rgba(119, 67, 219,0.1)","&:hover":{
                      backgroundColor:"rgba(119, 67, 219,0.25)"
                    }
                  }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_2}</Typography>
                  </Box>
                </Grid>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { 
                  new Audio(AudioStore[3].path).play(); 
                  OnQuizSubmitAnswer(quiz[quizIndex].choice_3)
                  }}>
                  <Box sx={{
                    width: "100%", backgroundColor: "white", height: "100%", display: "flex", justifyContent: "center"
                    , alignItems: "center", border: "2px solid #7743DB", borderRadius: "10px",backgroundColor:"rgba(119, 67, 219,0.1)","&:hover":{
                      backgroundColor:"rgba(119, 67, 219,0.25)"
                    }
                  }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_3}</Typography>
                  </Box>
                </Grid>
                <Grid xl={6} lg={6} sx={{ padding: "10px", cursor: "pointer", height: "100px" }} onClick={() => { 
                  new Audio(AudioStore[3].path).play(); 
                  OnQuizSubmitAnswer(quiz[quizIndex].choice_4)
                  }}>
                  <Box sx={{
                    width: "100%", backgroundColor: "white", height: "100%", display: "flex", justifyContent: "center"
                    , alignItems: "center", border: "2px solid #7743DB", borderRadius: "10px",backgroundColor:"rgba(119, 67, 219,0.1)","&:hover":{
                      backgroundColor:"rgba(119, 67, 219,0.25)"
                    }
                  }}>
                    <Typography sx={{ fontSize: "24px", color: "black" }}>{quiz[quizIndex].choice_4}</Typography>
                  </Box>
                </Grid>
          </Grid> : ""}
      </Grid>
      {/*/Edit Profile Avatar Card*/}
      <Dialog
        open={isEditingAvatar}
        keepMounted
        onClose={() => { setIsEditingAvatar(value => !value) }}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ width: "60vh", height: "50vh", position: "relative" }}>
          <CloseIcon sx={{ fontSize: "40px", position: "absolute", right: "7px", top: "10px", color: "#B2B2B2", cursor: "pointer" }}
            onClick={() => { setIsEditingAvatar(false) }} />
          <Typography sx={{ textAlign: "center", marginTop: "20px", fontSize: "26px", fontWeight: "600" }}>Profile Avatar</Typography>
          <Box sx={{ padding: "20px", }}>
            <Grid container sx={{ width: "100%", backgroundColor: "#C8B6E2", borderRadius: "10px" }}>

              {ProfileAvatarStore.map((image) => {
                return (
                  <Grid item xl={3} lg={3} sx={{ padding: "7px" }}>
                    <Box sx={{
                      backgroundColor: image.id == profileAvatarIndex ? "#EDEDED" : "white", borderRadius: "10px", padding: "10px", cursor: "pointer"
                      , border: image.id == profileAvatarIndex ? "4px solid #432C7A" : ""
                      , "&:hover": {
                        border: image.id == profileAvatarIndex ? "4px solid #432C7A" : "4px solid #BA94D1",
                        padding: image.id == profileAvatarIndex ? "10px" : "6px"
                      }
                    }} onClick={() => {
                      SubmitAvatarProfile(image.id);
                      setIsEditingAvatar(false)
                    }}>
                      <img src={image.imageDirectory} />
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
};

export default Quiz3;