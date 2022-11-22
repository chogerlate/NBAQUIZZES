import { useContext, useEffect, useState } from "react";
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
import BrainImage from "../assets/brain.png"
import FastImage from "../assets/fast-time.png"
import ThinkImage from "../assets/thinking.png"
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
  },
  ['@media (max-width:1535px)']: {
    width: "70px"
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

const Quiz = () => {
  const [quiz, setQuiz] = useState([
  ])
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizAmount, setQuizAmount] = useState(10);
  const { playerName, setPlayerName, profileAvatarIndex, setProfileAvatarIndex } = useContext(UserContext)
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
  const [isCanStart, setIscanStart] = useState(false);
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
            <Typography sx={{ fontSize: "16px", textAlign: "left", color: "#0008C1", marginTop: "20px" }}>จำนวนข้อ</Typography>
            <Box sx={{ display: "flex", marginTop: "5px" }}>
              <InputBase sx={{
                width: "50%", border: "2px solid #FFD372"
                , backgroundColor: "rgba(255, 211, 114,0.25)", padding: "10px 20px", fontSize: "20px"
                , borderRadius: "20px 0 0 20px", color: "#808080"
              }} value={quizAmount} placeholder={`${quizAmount} ข้อ`} />
              <SubmitNameButton sx={{
                borderRadius: "0", fontSize: "20px"
                , backgroundColor: quizAmount > 5 ? "" : "#E5E4E2", border: quizAmount > 5 ? "" : "1px solid #E5E4E2", "&:hover": {
                  border: quizAmount > 5 ? "" : "1px solid #E5E4E2",
                  backgroundColor: quizAmount > 5 ? "" : "#E5E4E2"
                }
              }}
                onClick={() => {
                  if (quizAmount > 5) {
                    setQuizAmount(amount => amount - 1)
                  }
                }}>-</SubmitNameButton>
              <SubmitNameButton sx={{
                fontSize: "20px", borderLeft: "1px solid white", backgroundColor: quizAmount < 15 ? "" : "#E5E4E2"
                , border: quizAmount < 15 ? "" : "1px solid #E5E4E2", "&:hover": {
                  border: quizAmount < 15 ? "" : "1px solid #E5E4E2",
                  backgroundColor: quizAmount < 15 ? "" : "#E5E4E2"
                }
              }} onClick={() => {
                if (quizAmount < 15) {
                  setQuizAmount(amount => amount + 1)
                }
              }}>+</SubmitNameButton>
            </Box>
            <Box sx={{ marginTop: "30px" }}>
              <CustomButton variant="outlined" sx={{ padding: "5px 50px",fontSize:"24px"}} onClick={OnStart}>เริ่มเล่น</CustomButton>
              
            </Box>

          </Grid> : ""}
        {quiz.length < 1 && isCanStart == false ?
          <Grid item xl={6} lg={6} md={6} sx={{ padding: "10px 10px 10px 20px", height: "60vh",position:"relative" }}>
            <Typography sx={{ fontSize: "20px", textAlign: "center", color: "#0008C1",fontWeight:"600"}}>เกี่ยวกับเกม</Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "left", color: "#0008C1", marginTop: "20px" }}>ระดับความยาก</Typography>
            <Box sx={{width: "75%", borderRadius: "20px",marginTop:"5px",padding:"12px 20px",display:"flex",cursor:"pointer",transition:"0.25s"
            ,border:"2px solid #FFD372",backgroundColor:"rgba(255, 211, 114,0.25)",position:"relative"
            ,"&:hover":{
              backgroundColor:"rgba(255, 211, 114,0.35)"
            }}} onClick={()=>{setIsSelectQuizLevel(value=>!value)}}>
              <Typography sx={{fontSize:"20px",color:"#808080"}}>
                {quizLevel=="BigFan"? 
                ("Big Fan Quiz")  
                :
                quizLevel==""?
                "Select Quiz Level"
                :
                quizLevel=="Random"?
                "Random Level Quiz"
                :
                quizLevel!=""? 
                quizLevel+" Quiz":
                ""
                }
                </Typography>
              {isSelectQuizLevel?<ArrowDropUpIcon sx={{marginLeft:"auto",marginTop:"2px",color:"#808080"}}/>
              :<ArrowDropDownIcon sx={{marginLeft:"auto",marginTop:"2px",color:"#808080"}}/>}
              {isSelectQuizLevel?<Box sx={{width:"100%",height:{xl:"25vh",lg:"24vh"},backgroundColor:"white"
              ,left:"0",position:"absolute",top:"60px",borderRadius:"10px",boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px"}}>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 0 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",borderRadius:"10px 10px 0 0",transition:"0.5s"}} onClick={()=>{setQuizLevel("Easy")}}>Easy Quiz</Box>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 10px 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",transition:"0.5s"}} onClick={()=>{setQuizLevel("General")}}>General Quiz</Box>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 0 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",transition:"0.5s"}} onClick={()=>{setQuizLevel("Hard")}}>Hard Quiz</Box>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 0 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",transition:"0.5s"}} onClick={()=>{setQuizLevel("BigFan")}}>Big Fan Quiz</Box>
                <Box sx={{width:"100%",height:"20%",padding:"10px 20px 0 20px","&:hover":{backgroundColor:"rgba(255, 211, 114,0.35)"}
                ,backgroundColor:"white",borderRadius:"0 0 10px 10px",transition:"0.5s"}} onClick={()=>{setQuizLevel("Random")}}>Random Level Quiz</Box>
                
              </Box>:""}
              </Box>
              <Typography sx={{ fontSize: "14px", textAlign: "left", color: "#0008C1", marginTop: "10px" }}>
                Easy Quiz: คำถามง่าย ๆ เน้นความไวในการตอบคำถาม
              </Typography>
              <Typography sx={{ fontSize: "14px", textAlign: "left", color: "#0008C1", marginTop: "10px" }}>
                General Quiz: คำถามที่ใช้ความรู้ทั่วไปเกี่ยวกับ NBA 
              </Typography>
              <Typography sx={{ fontSize: "14px", textAlign: "left", color: "#0008C1", marginTop: "10px" }}>
                Hard Quiz: คำถามยากต้องใช้เวลาในการคิดและวิเคราะห์
              </Typography>
              <Typography sx={{ fontSize: "14px", textAlign: "left", color: "#0008C1", marginTop: "10px" }}>
                Big Fan Quiz: คำถามที่แฟนพันธุ์แท้เท่านั้นถึงจะตอบได้
              </Typography>
              <Typography sx={{ fontSize: "20px", textAlign: "center", color: "#0008C1",fontWeight:"600",marginTop:"20px"}}>
                วิธีการเล่น
              </Typography>
              <Grid container sx={{padding:"10px 20px 20px 20px"}}>
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
          </Grid> : ""}


        {quiz.length > 0 && isCanStart == true ?
          <Grid item xl={12} lg={12} md={12} sx={{ width: "100%" }}>
            {quiz.length > 0 && isCanStart == true ? <Typography sx={{
              fontSize: "24px", textAlign: "center", position: "absolute", top: "10px",
              left: "20px"
            }}>
              {quizIndex + 1}/{quiz.length}
            </Typography> : ""}
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
                  <Grid item xl={3} sx={{ padding: "7px" }}>
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

export default Quiz;
