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
        width:"65%",
        height:"80%",
        position:"absolute",
        left:"0",
        right:"0",
        marginLeft:"auto",
        marginRight:"auto",
        top:"60px",
        opacity:"80%"
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
        playerResult,setPlayerResult,
        playerResultStat, setPlayerResultStat
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
        //labels:["Points","Rebounds","Assists","FG%","FG3%","FT%"] 1 2 3 4 5 6
        labels:["","","","","",""],
        datasets:[
        {
            label: "",
            backgroundColor: "rgba(254, 205, 112,0.25)",
            borderColor:"rgba(254, 205, 112,0.5)",
            borderWidth:3,  
            data:[playerResultStat.points*3.57,playerResultStat.rebounds*7.14,playerResultStat.assists*10
            ,playerResultStat.fg*1.52,playerResultStat.fg3*2.33,playerResultStat.ft*1.1]
        }
        ]
    };
    const options = {
        responsive: true,
    maintainAspectRatio: false,
        scale:{
                ticks: 
                {
                    beginAtZero : true,
                    font:{
                        size:0,
                    },
                },
                pointLabels:{
                    font:{
                        size:100,
                    }
                },
            
        },
    }
    return (
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                className={classes.container}
                sx={{
                    width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" },
                    padding: "20px 50px 50px 50px",
                    borderRadius: "20px",
                    height: "80vh",
                    position: "relative",
                    boxShadow: "white 0px 4px 8px",
                    textAlign:"center",
                }}
            >
                <Grid item lg={6} sx={{width:{xl:"100%",lg:"80%",md:"70%"},height:{xl:"90%",lg:"90%"},position:"relative",marginLeft:"auto"
                ,marginRight:"auto"}}>
                    <Box sx={{width:"100%",height:"90%",position:"relative"}}>
                    {/*labels:["Points","Rebounds","Assists","FG%","FG3%","FT%"] 1 2 3 4 5 6 */}
                        <Typography sx={{fontSize:"16px",position:"absolute",left:"45%",top:"25px",color:"#692A9B",fontWeight:"600"}}>
                            Points
                        </Typography>
                        <Typography sx={{fontSize:"16px",position:"absolute",top:"25%",right:"-10px",zIndex:"5",color:"#692A9B",fontWeight:"600"}}>
                            Rebounds
                        </Typography>
                        <Typography sx={{fontSize:"16px",position:"absolute",top:"75%",right:"0",zIndex:"5",color:"#692A9B",fontWeight:"600"}}>
                            Assists
                        </Typography>
                        <Typography sx={{fontSize:"16px",position:"absolute",left:"47%",bottom:"0",zIndex:"5",color:"#692A9B",fontWeight:"600"}}>
                            FG%
                        </Typography>
                        <Typography sx={{fontSize:"16px",position:"absolute",left:"20px",top:"75%",zIndex:"5",color:"#692A9B",fontWeight:"600"}}>
                            FG3%
                        </Typography>
                        <Typography sx={{fontSize:"16px",position:"absolute",left:"30px",top:"25%",zIndex:"5",color:"#692A9B",fontWeight:"600"}}>
                            FT%
                        </Typography>
                        <Radar data={chartData} options={options}/>
                    </Box>
                        <img src={playerResultStat.image_url} className={classes.nbaPlayerImage}/>
                </Grid>
                <Grid item lg={12} sx={{textAlign:"center"}}>
                    <Typography sx={{fontSize:"20px"}}>คุณ {playerName} คือ</Typography>
                    <Typography sx={{fontSize:"36px",fontWeight:"600"}}>{playerResult}</Typography>
                </Grid>
                </Grid>
            {/*/Edit Profile Avatar Card*/}
        </Box>
    );
};

export default QuizResultNBA;
