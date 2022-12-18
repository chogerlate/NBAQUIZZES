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
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
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
      width: "90px"
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
  nbaPlayerImage:{
    width:"80%",
    height:"100%",
    marginLeft:"auto",
    marginRight:"auto"
  }
})
const SubmitPredictButton = styled(Button)(({ theme }) => ({
  fontSize:"20px",
  color:"#7642DA",
  borderRadius:"10px",
  backgroundColor:"white",
  border:"2px solid #FFD372",
  padding:"7px 15px",
  "&:hover":{

  }
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#023E8A",
  fontSize: "16px",
  borderRadius: "20px",
  border: "2px solid #FFD372",
  transition: "0.25s",
  "&:hover": {
    backgroundColor: "#EEF1FF",display: "flex",
              flexDirection: "row",
              flexGrow: 1,
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

const Quiz2 = () => {
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
  isPlayingHomeMusic, setIsPlayingHomeMusic,
  nbaPlayerStat_Physical, setNbaPlayerStat_Physical,
  nbaPlayerStat_SoftSkill, setNbaPlayerStat_SoftSkill,
  predictQuestion, setPredictQuestion,
  userFillPredict, setUserFillPredict

} = useContext(UserContext)
const HomeMusic = new ReactHowler(
  {
    src: AudioStore[0].path,
    html5: true,
  } 
);

  ///const [userAnswer,setUserAnswer] = useState([]);
  function OnStart() {
    if(position!=""){
      setTimeout(function(){
        getQuestionForm();
      },500);
    }
    else{
      window.alert("โปรดเลือกตำแหน่ง");    
    }
  }
  async function getQuestionForm() {
    //setCountdownQuiz(10);
    await FetchQuestionForm();
  }
  function FetchQuestionForm() {
    axios.get("http://localhost:3008/predict_question").then(response =>{
      console.log(response.data);
      setPredictQuestion(response.data);
    })
    axios.get("http://localhost:3008/player_physical_stat", { params: {position} }).then(response =>{
      console.log(response.data);
      setNbaPlayerStat_Physical(response.data);
    })
    axios.get("http://localhost:3008/player_softskill_stat", { params: {position} }).then(response =>{
      console.log(response.data);
      setNbaPlayerStat_SoftSkill(response.data);
    })
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
        navigate("/Quiz1_Result");
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
  const [position, setPosition] = useState("");
  function SubmitPredict(){
    console.log(userFillPredict);
  }
  return (
    <Box sx={{ width: "100%" }}>

      <Grid container className={classes.container} sx={{
        width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" }, padding: "20px", borderRadius: "20px"
        , height: nbaPlayerStat_SoftSkill.length<0 ? "100%" : "70vh", position: "relative"
        , boxShadow: "white 0px 4px 8px",overflow:"scroll"
      }}>
        {nbaPlayerStat_SoftSkill.length<=0 ?
          <Grid item xl={12} lg={12} md={12} sx={{}}>
            <Typography sx={{ fontSize: "30px", textAlign: "center" }}>คุณสไตล์การเล่นบาสเกตบอลเหมือนใครกันนะ 🏀</Typography>
          </Grid> : ""}
        {nbaPlayerStat_SoftSkill.length<=0 ?
          <Grid item xl={6} lg={6} md={6} sx={{ borderRight: "2px solid #DCDCDC", padding: "10px", height: "60vh" }}>
            <Typography sx={{ fontSize: "20px", textAlign: "center", color: "#0008C1" ,fontWeight:"600"}}>เล่นเลย!</Typography>

            <Box sx={{ position: "relative" }}>
              <ModeEditIcon sx={{
                position: "absolute", top: "5px", left: "55%", backgroundColor: "#FFD372", borderRadius: "20px"
                , padding: "5px", fontSize: {
                  xl: "40px", lg: "30px", zIndex: "3", "&:hover": {
                    backgroundColor: "#FFCD38"
                  }
                }, border: "4px solid white", cursor: "pointer"
              }}
                onClick={() => { setIsEditingAvatar(value => !value) }} />
              <img src={ProfileAvatarStore[profileAvatarIndex].imageDirectory} className={classes.playerProfileImage} alt="" />
            </Box>
            <Typography sx={{ fontSize: "16px", textAlign: "left", color: "#0008C1", marginTop: "10px" }}>ชื่อเล่น</Typography>
            <Box sx={{ display: "flex", marginTop: "5px" }}>
              <InputBase sx={{
                width: "75%", border: "2px solid #FFD372"
                , backgroundColor: "rgba(255, 211, 114,0.25)", padding: "10px 20px", fontSize: "20px"
                , borderRadius: "20px 0 0 20px", color: "#808080"
              }} onChange={HandlePlayerName} value={playerNameChanging} placeholder={playerName.length > 0 ? `${playerName}` : "ระบุชื่อเล่น"} />
              <SubmitNameButton onClick={SubmitPlayerName}>บันทึก</SubmitNameButton>
            </Box>
            <Typography sx={{ fontSize: "16px", textAlign: "left", color: "#0008C1", marginTop: "20px" }}>ตำแหน่งของคุณ</Typography>
            <Box sx={{width: "75%", borderRadius: "20px",marginTop:"5px",padding:"12px 20px",display:"flex",cursor:"pointer",transition:"0.25s"
            ,border:"2px solid #FFD372",backgroundColor:"rgba(255, 211, 114,0.25)",position:"relative"
            ,"&:hover":{
              backgroundColor:"rgba(255, 211, 114,0.35)"
            }}} onClick={()=>{setIsSelectQuizLevel(value=>!value)}}>
              <Typography sx={{fontSize:"20px",color:"#808080"}}>
                {
                  position==""?"Select Position":
                  position
                }
                </Typography>
              {isSelectQuizLevel?<ArrowDropUpIcon sx={{marginLeft:"auto",marginTop:"2px",color:"#808080"}}/>
              :<ArrowDropDownIcon sx={{marginLeft:"auto",marginTop:"2px",color:"#808080"}}/>}
              {isSelectQuizLevel?<Box sx={{width:"100%",height:{xl:"25vh",lg:"24vh"},backgroundColor:"white"
              ,left:"0",position:"absolute",top:"60px",borderRadius:"10px",boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px",zIndex:"5"}}>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 0 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",borderRadius:"10px 10px 0 0",transition:"0.5s"}} onClick={()=>{setPosition("Point Guard")}}>Point Guard</Box>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 10px 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",transition:"0.5s"}} onClick={()=>{setPosition("Shooting Guard")}}>Shooting Guard</Box>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 0 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",transition:"0.5s"}} onClick={()=>{setPosition("Small Forward")}}>Small Forward</Box>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 0 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",transition:"0.5s"}} onClick={()=>{setPosition("Power Forward")}}>Power Forward</Box>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 0 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",borderRadius:"0 0 10px 10px",transition:"0.5s"}} onClick={()=>{setPosition("Center")}}>Center</Box>
                
              </Box>:""}
              </Box>
            <Box sx={{ marginTop: "30px" }}>
              <CustomButton variant="outlined" sx={{ padding: "5px 50px",fontSize:"24px"}} onClick={OnStart}>เริ่มเล่น</CustomButton>
            </Box>

          </Grid> : ""}
        {nbaPlayerStat_SoftSkill.length<=0 ?
          <Grid item xl={6} lg={6} md={6} sx={{ padding: "10px 10px 10px 20px", height: "60vh",position:"relative" }}>
            <Typography sx={{ fontSize: "20px", textAlign: "center", color: "#0008C1",fontWeight:"600"}}>เกี่ยวกับเกม</Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "left", color: "#0008C1", marginTop: "20px" }}>วิธีการเล่น</Typography>
              <Grid container sx={{padding:"10px 20px 20px 20px"}}>
                <Grid item lg={4} sx={{padding:"10px",display:"flex",flexDirection:"column",textAlign:"center"}}>
                  <img src={"https://cdn-icons-png.flaticon.com/512/2112/2112088.png"} className={classes.imageGuidePlay}/>
                  <Typography sx={{ fontSize: "14px", textAlign: "center", color: "#0008C1", marginTop: "10px" }}>
                    กรอกสไตล์การเล่น
                  </Typography>
                </Grid>
                <Grid item lg={4} sx={{padding:"10px",display:"flex",flexDirection:"column",textAlign:"center"}}>
                  <img src={"https://cdn-icons-png.flaticon.com/512/3406/3406886.png"} className={classes.imageGuidePlay}/>
                  <Typography sx={{ fontSize: "14px", textAlign: "center", color: "#0008C1", marginTop: "10px" }}>
                    ตามความเป็นจริง
                  </Typography>
                </Grid>
                <Grid item lg={4} sx={{padding:"10px",display:"flex",flexDirection:"column",textAlign:"center"}}>
                  <img src={"https://cdn-icons-png.flaticon.com/512/3177/3177098.png"} className={classes.imageGuidePlay}/>
                  <Typography sx={{ fontSize: "14px", textAlign: "center", color: "#0008C1", marginTop: "10px" }}>
                    รอลุ้นผลลัพธ์
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <img src="/images/nba player.png" className={classes.nbaPlayerImage}/>
                </Grid>
                </Grid>
          </Grid> : 
          ""}
        {nbaPlayerStat_SoftSkill.length>0?
          <Grid item lg={12} sx={{}}>
            <Typography sx={{textAlign:"center",fontSize:"24px"}}>วิเคราะห์สไตล์การเล่นของคุณ</Typography>
            {predictQuestion.map((element,index)=>{
              return(
                <Box sx={{width:"100%",display:"flex",flexDirection:"column",backgroundColor:"white",padding:"10px 5px"
                ,borderRadius:"5px",border:"1px solid #692A9B",marginTop:"10px"}}>
                  <Box sx={{textAlign:"center"}}>
                    <Typography sx={{fontSize:"20px",fontWeight:"600",color:"#692A9B"}}>{element.question_string}</Typography>
                  </Box>
                  <Grid container sx={{width:"75%",marginLeft:"auto",marginRight:"auto",marginTop:"5px"}}>
                      <Grid item lg={3} sx={{textAlign:"center",display:"flex",flexDirection:"column"}}>
                      {element.choices_1}
                      {userFillPredict[index] == 1 ?
                      <CheckBoxIcon sx={{marginTop:"5px",textAlign:"center",marginLeft:"auto",marginRight:"auto",cursor:"pointer"
                      ,color:"#7642DA",cursor:"pointer"}}
                        onClick={()=>{
                          var newList=[];
                          for(var i=0;i<15;i++){
                            if(i==index){
                              newList[i] = 1;
                            }
                            else{
                              newList[i] = userFillPredict[i];
                            }
                          }
                          setUserFillPredict(newList);
                        }}
                      />:<CheckBoxOutlineBlankIcon sx={{marginTop:"5px",textAlign:"center",marginLeft:"auto",marginRight:"auto"
                      ,color:"#7642DA",cursor:"pointer"}}
                      onClick={()=>{
                          var newList=[];
                          for(var i=0;i<15;i++){
                            if(i==index){
                              newList[i] = 1;
                            }
                            else{
                              newList[i] = userFillPredict[i];
                            }
                          }
                          setUserFillPredict(newList);
                      }}
                    />}
                      </Grid>
                      <Grid item lg={3} sx={{textAlign:"center",display:"flex",flexDirection:"column"}}>
                      {element.choices_2}
                      {userFillPredict[index] == 2 ?
                      <CheckBoxIcon sx={{marginTop:"5px",textAlign:"center",marginLeft:"auto",marginRight:"auto",color:"#7642DA",cursor:"pointer"}}
                      onClick={()=>{
                        var newList=[];
                          for(var i=0;i<15;i++){
                            if(i==index){
                              newList[i] = 2;
                            }
                            else{
                              newList[i] = userFillPredict[i];
                            }
                          }
                          setUserFillPredict(newList);
                      }}
                      />:<CheckBoxOutlineBlankIcon sx={{marginTop:"5px",textAlign:"center",marginLeft:"auto",marginRight:"auto"
                      ,color:"#7642DA",cursor:"pointer"}}
                      onClick={()=>{
                        var newList=[];
                          for(var i=0;i<15;i++){
                            if(i==index){
                              newList[i] = 2;
                            }
                            else{
                              newList[i] = userFillPredict[i];
                            }
                          }
                          setUserFillPredict(newList);
                      }}
                    />}
                      </Grid>
                      <Grid item lg={3} sx={{textAlign:"center",display:"flex",flexDirection:"column"}}>
                      {element.choices_3}
                      {userFillPredict[index] == 3 ?<CheckBoxIcon sx={{marginTop:"5px",textAlign:"center",marginLeft:"auto"
                      ,marginRight:"auto",color:"#7642DA",cursor:"pointer"}}
                      onClick={()=>{
                        var newList=[];
                          for(var i=0;i<15;i++){
                            if(i==index){
                              newList[i] = 3;
                            }
                            else{
                              newList[i] = userFillPredict[i];
                            }
                          }
                          setUserFillPredict(newList);
                        
                      }}
                      />:<CheckBoxOutlineBlankIcon sx={{marginTop:"5px",textAlign:"center",marginLeft:"auto",marginRight:"auto"
                      ,color:"#7642DA",cursor:"pointer"}}
                      onClick={()=>{
                        var newList=[];
                          for(var i=0;i<15;i++){
                            if(i==index){
                              newList[i] = 3;
                            }
                            else{
                              newList[i] = userFillPredict[i];
                            }
                          }
                          setUserFillPredict(newList);
                      }}
                    />}
                      </Grid>
                      <Grid item lg={3} sx={{textAlign:"center",display:"flex",flexDirection:"column"}}>
                      {element.choices_4}
                      {userFillPredict[index] == 4 ?<CheckBoxIcon sx={{marginTop:"5px",textAlign:"center",marginLeft:"auto"
                      ,marginRight:"auto",color:"#7642DA",cursor:"pointer"}}
                      onClick={()=>{
                        var newList=[];
                          for(var i=0;i<15;i++){
                            if(i==index){
                              newList[i] = 4;
                            }
                            else{
                              newList[i] = userFillPredict[i];
                            }
                          }
                          setUserFillPredict(newList);
                      }}
                      />:<CheckBoxOutlineBlankIcon sx={{marginTop:"5px",textAlign:"center",marginLeft:"auto",marginRight:"auto"
                      ,color:"#7642DA",cursor:"pointer"}}
                      onClick={()=>{
                        var newList=[];
                          for(var i=0;i<15;i++){
                            if(i==index){
                              newList[i] = 4;
                            }
                            else{
                              newList[i] = userFillPredict[i];
                            }
                          }
                          setUserFillPredict(newList);
                      }}
                    />}
                      </Grid>
                  </Grid>
                </Box>
              )
            })}
            <SubmitPredictButton sx={{marginTop:"10px",textAlign:"center",marginLeft:"auto",marginRight:"auto",
          display:"flex"}} onClick={()=>{
            SubmitPredict();
          }}>ยืนยันข้อมูล</SubmitPredictButton>
          </Grid>
          
        :""}
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

export default Quiz2;
