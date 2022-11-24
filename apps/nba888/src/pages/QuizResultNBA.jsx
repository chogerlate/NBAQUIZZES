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
import {Bar,Radar} from "react-chartjs-2"
import "chart.js/auto"
import { ProfileAvatarStore } from "../components/AvatarStore";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    nbaPlayerImage:{
        width:"30%",
        height:"80%",
        position:"absolute",
        left:"0",
        right:"0",
        marginLeft:"auto",
        marginRight:"auto",
        top:"60px",
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


const QuizResultNBA = () => {
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
    }, []);
    const classes = useStyles();
    const chartData = {
        labels:["Points","Rebounds","Assists","FG%","FG3%","FT%"],
        datasets:[
        {
            label: "NBA Player Stats",
            backgroundColor: "rgba(00,255,00,0.1)",
            borderColor:"rgba(00,255,00,0.5)",
            borderWidth:2,
            data:[4,3,4,2,4,3]
        }
        ]
    };
    const options = {
        responsive: true,
    maintainAspectRatio: false,
        scale:{
            ticks: {beginAtZero : true},
        },
    };
    return (
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                className={classes.container}
                sx={{
                    width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" },
                    padding: "20px",
                    borderRadius: "20px",
                    height: "70vh",
                    position: "relative",
                    boxShadow: "white 0px 4px 8px",
                }}
            >
                <Grid item lg={12} sx={{width:{xl:"100%",lg:"80%",md:"70%"},height:{xl:"80%",lg:"80%"},position:"relative"}}>
                    <Box sx={{width:"100%",height:"100%"}}>
                        <Radar data={chartData} options={options}/>
                    </Box>
                        <img src="https://i.ibb.co/7V6JMZg/1-Stephen-Curry.png" className={classes.nbaPlayerImage}/>
                    
                    
                </Grid>
                
                <Grid item lg={12} sx={{textAlign:"center"}}>
                    <Typography sx={{fontSize:"20px"}}>You're</Typography>
                    <Typography sx={{fontSize:"30px",fontWeight:"600"}}>Stephen Curry</Typography>
                </Grid>
                </Grid>
            {/*/Edit Profile Avatar Card*/}
        </Box>
    );
};

export default QuizResultNBA;
