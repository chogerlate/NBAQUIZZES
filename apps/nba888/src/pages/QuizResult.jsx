import { useContext, useEffect, useState } from "react";
import {
    Button,
    styled,
    Typography,
    Box,
    Menu,
    Grid,
    TextField,
    InputBase,
    Dialog,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { ProfileAvatarStore } from "../components/AvatarStore";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../App";
import axios from "axios";
import HomeIcon from '@mui/icons-material/Home';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Container } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const useStyles = makeStyles({
    container: {
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        alignSelft: "center",
        backgroundColor: "white",
    },
    profileImage: {
        width: "150px",
        marginLeft: "auto",
        marginRight: "auto"
    },
    imageQuiz:{
        borderRadius:"5px",
        marginTop:"10px"
    }
});
const CustomButtonContained = styled(Button)(({ theme }) => ({
    color: "#36454F",
    fontSize: "20px",
    border: "2px solid #FFD372",
    borderRadius: "10px",
    padding: "10px 20px",
    boxShadow: "none",
    backgroundColor: "rgba(255, 211, 114,0.1)",
    "&:hover": {
        backgroundColor: "white",
        border: "2px solid #FFD372",
        color: "#36454F",
        boxShadow: "none",
        backgroundColor: "rgba(255, 211, 114,0.3)"
    },
}));


const QuizResult = () => {
    let navigate = useNavigate();
    const {
        playerName,
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
        answerOrder, setAnswerOrder,
        toggleSolution, setToggleSolution
    } = useContext(UserContext);
    useEffect(() => {
        if (!localStorage["playerName"]) {
            window.localStorage.setItem("playerName", "");
        }
        if (!localStorage["playerAvatar"]) {
            window.localStorage.setItem("playerAvatar", 0);
        } else {
            setPlayerName(window.localStorage.getItem("playerName"));
            setProfileAvatarIndex(window.localStorage.getItem("playerAvatar"));
        }
        console.log("TEST 1:" + answerOrder);
        console.log("TEST 2:" + userAnswer);
    }, [userAnswer]);
    const classes = useStyles();
    const [isSeeSolution, setIsSeeSolution] = useState(false);
    const [demoSeeSolution1,setDemoSeeSolution1]  = useState(false);
    return (
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                className={classes.container}
                sx={{
                    width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" },
                    padding: "20px",
                    borderRadius: "20px",
                    height: "100%",
                    position: "relative",
                    boxShadow: "white 0px 4px 8px",
                }}
            >
                <Box sx={{position:"absolute",left:"20px",top:"20px"}}>
                    <EmojiEventsIcon sx={{fontSize:"50px",backgroundColor:"#7743DB"
                    ,padding:"10px",borderRadius:"30px",color:"#FFE15D",cursor:"pointer",}} />
                    
                </Box>
                <Grid item lg={12} sx={{ padding: "0 20px" }}>
                    <img src={ProfileAvatarStore[profileAvatarIndex].imageDirectory} className={classes.profileImage} />
                    <Typography
                        sx={{ fontSize: "30px", fontWeight: "600", textAlign: "center", marginTop: "10px" }}
                    >
                        คุณ {playerName} ได้รับคะแนน
                    </Typography>
                    <Box sx={{ position: "relative" ,width:"80%",marginTop:"10px",height:"40px",marginLeft:"auto",marginRight:"auto"}}>
                        <Box sx={{
                            backgroundColor: "#65C18C", width: score != 0 ? `${(score / totalScore) * 100}%` : "0%", height: "40px", position: "absolute"
                            , left: "0", borderRadius: "5px", zIndex: "4", textAlign: "right"
                        }} id="score">
                            {score != 0 ? <Typography sx={{
                                marginTop: "8px"
                                , marginRight: "10px", color: "white", fontWeight: "600", top: "0"
                            }}>{((score / totalScore) * 100).toFixed(2)}%</Typography> : ""}
                        </Box>
                        <Box sx={{
                            backgroundColor: "#C7F2A4", width: "100%", height: "40px", position: "absolute"
                            , left: "0", borderRadius: "5px", zIndex: "3", top: "0"
                        }} id="RangeScore">
                        </Box>
                        <Typography sx={{zIndex:"5",color:"black",fontSize:"16px",cursor:"pointer"
                        ,fontWeight:"600",position:"absolute",top:"40px"}} onClick={()=>{setIsSeeSolution(true)}}>
                            ดูเฉลย
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: "80px",
                            fontWeight: "600",
                            textAlign: "center",
                            color: "#6F38C5",
                        }}
                    >
                        {score}
                    </Typography>
                    <Typography
                        sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}
                    >
                        จาก {totalScore} ข้อ
                    </Typography>
                    <Typography
                        sx={{ fontSize: "30px", fontWeight: "600", textAlign: "center", marginTop: "10px" }}
                    >
                       ในระดับความยาก {}
                    </Typography>
                    
                </Grid>


                <Grid item lg={12} sx={{ textAlign: "center" ,marginTop:"20px"}}>
                    <Box
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <CustomButtonContained
                            style={{ padding: "1rem" }}
                            variant="contained"
                            onClick={() => {
                                setTotalScore(0);
                                setScore(0);
                                navigate("/Quiz1");
                                setQuiz([]);
                                setUserAnswer([]);
                                setAnswerOrder([]);
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <RestartAltIcon sx={{fontSize: "40px", color: "#00005C" }} />
                            </Box>
                        </CustomButtonContained>
                        <CustomButtonContained
                            style={{ padding: "1rem", marginLeft: "20px" }}
                            variant="contained"
                            onClick={() => {
                                setTotalScore(0);
                                setScore(0);
                                navigate("/");
                                setQuiz([]);
                                setUserAnswer([]);
                                setAnswerOrder([]);
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <HomeIcon sx={{fontSize: "40px", color: "#600005C" }} />
                            </Box>
                        </CustomButtonContained>
                    </Box>
                </Grid>
            </Grid>
            {/*/Edit Profile Avatar Card*/}
            <Dialog
        open={isSeeSolution}
        keepMounted
        onClose={() => {setIsSeeSolution(prev=>!prev)}}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ width: "60vh", height: "100%", position: "relative" }}>
        
          <Typography sx={{ textAlign: "center", marginTop: "20px", fontSize: "30px", fontWeight: "600" }}>เฉลย</Typography>
          <Box sx={{ padding: "10px", }}>
            <Grid container sx={{ width: "100%", borderRadius: "5px"}}>
                {quiz.map((element,index)=>{
                    return(
                        <Grid container sx={{width:"100%"}}>
                            <Grid lg={12} sx={{padding:"20px",backgroundColor: userAnswer[index]==1?"#D9F8C4":"#F8C4B4",justifyContent:"space-between"
                        ,borderRadius:toggleSolution[index] ? "5px 5px 0 0" : "5px",display:"flex",cursor:"pointer",marginTop:"10px"
                        ,transition:"0.5s"}} onClick={()=>{
                            var newToggleList=[];
                            if(toggleSolution[index]){
                                for(var i=0;i<toggleSolution.length;i++){
                                    newToggleList[i]=false;
                                }
                            }
                            else{
                                for(var i=0;i<toggleSolution.length;i++){
                                    if(i==index){
                                        newToggleList[i] = true;
                                    }
                                    else{
                                        newToggleList[i] = false;
                                    }
                                }
                            }
                            setToggleSolution(newToggleList);
                            //console.log("HELLO")
                        }}>
                            <Box sx={{display:"flex"}}>
                                <Typography>ข้อ {index+1} คุณตอบ: {answerOrder[index]}</Typography>         
                            </Box>
                            {toggleSolution[index] ? <ArrowDropUpIcon sx={{position:"absolute",right:"30px",fontSize:"30px",color: userAnswer[index]==1?"#5F8D4E":"#CE7777"}}/>
                            :<ArrowDropDownIcon sx={{position:"absolute",right:"30px",fontSize:"30px",color: userAnswer[index]==1?"#5F8D4E":"#CE7777"}}/>}
                        </Grid>
                        {toggleSolution[index] ?<Grid lg={12} sx={{backgroundColor:"#F8F8F8",padding:"10px 20px",transition:"0.5s"
                        ,borderRadius:"0 0 5px 5px",border:(`2px solid ${userAnswer[index]==1?"#D9F8C4":"#F8C4B4"}`)}}>เฉลยคือ {element.choice_answer}
                        <img src={element.image_url} className={classes.imageQuiz}/></Grid>:""}
                        </Grid>
                    )
                    }
                )}
            </Grid>
          </Box>
        </Box>
      </Dialog>
        </Box>
    );
};

export default QuizResult;
