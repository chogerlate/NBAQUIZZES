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

const QuizResult = () => {
    const { playerName, setPlayerName, profileAvatarIndex, setProfileAvatarIndex ,score,setScore} = useContext(UserContext)
  useEffect(() => {
    if (!localStorage["playerName"]) {
      window.localStorage.setItem("playerName", "");
    }
    if (!localStorage["playerAvatar"]) {
      window.localStorage.setItem("playerAvatar", 0);
    }
    else {
      setPlayerName(window.localStorage.getItem("playerName"));
      setProfileAvatarIndex(window.localStorage.getItem("playerAvatar"));
    }
  }, [])
  const classes = useStyles();
  
  return (
    <Box sx={{ width: "100%" }}>

      <Grid container className={classes.container} sx={{
        width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" }, padding: "20px", borderRadius: "20px"
        , height: "70vh", position: "relative"
        , boxShadow: "white 0px 4px 8px",
      }}>
        <Grid item lg={12} sx={{padding:"20px"}}>
            <Typography sx={{fontSize:"30px",fontWeight:"600",textAlign:"center"}}>คุณ {playerName} ได้รับคะแนน</Typography>
            <Typography sx={{fontSize:"80px",fontWeight:"600",textAlign:"center",marginTop:"5px",color:"#6F38C5"}}>{score}</Typography>
        </Grid>
      </Grid>
      {/*/Edit Profile Avatar Card*/}
    </Box>
  )
};

export default QuizResult;
